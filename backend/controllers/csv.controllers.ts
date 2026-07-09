import { Request, Response } from "express";
import fs from "fs";
import path from "path";

import { ApiError } from "../utilis/apierror.ts";
import { ApiResponse } from "../utilis/apiresponse.ts";
import { asyncHandler } from "../utilis/asynchandler.ts";

const uploadCSV = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new ApiError(400, "CSV file not found");
  }

  const uploadDir = path.join(process.cwd(), "database", "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const destination = path.join(uploadDir, req.file.filename);

  fs.renameSync(req.file.path, destination);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        originalName: req.file.originalname,
        storedName: req.file.filename,
        path: destination,
      },
      "CSV uploaded successfully"
    )
  );
});
const csvtoCMRConversion = asyncHandler(
  async (req: Request, res: Response) => {
    const { fileName } = req.body;

    if (!fileName) {
      throw new ApiError(400, "File name is required");
    }

    const filePath = path.join(
      process.cwd(),
      "database",
      "uploads",
      fileName
    );

    const records = await parseCSV(filePath);

    if (records.length === 0) {
      throw new ApiError(400, "CSV contains no records");
    }

    const BATCH_SIZE = 50;

    const batches: Record<string, any>[][] = [];

    for (let i = 0; i < records.length; i += BATCH_SIZE) {
      batches.push(records.slice(i, i + BATCH_SIZE));
    }

    const allCRMRecords: Record<string, any>[] = [];

    const MAX_RETRIES = 5;

    for (let batchNumber = 0; batchNumber < batches.length; batchNumber++) {

      const batch = batches[batchNumber];

      console.log(
        `Processing Batch ${batchNumber + 1}/${batches.length}`
      );

      const prompt = `
${CRM_SYSTEM_PROMPT}

Records:

${JSON.stringify(batch, null, 2)}

Return ONLY valid JSON.
`;

      let waitTime = 5000;

      let success = false;

      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {

        try {

          const response = await callGemini(prompt); // <-- your Gemini function

          let text = response.trim();

          if (text.startsWith("```json")) {
            text = text.replace(/```json/g, "").replace(/```/g, "").trim();
          } else if (text.startsWith("```")) {
            text = text.replace(/```/g, "").trim();
          }

          let batchResult = JSON.parse(text);

          if (!Array.isArray(batchResult)) {
            batchResult = [batchResult];
          }

          if (batchResult.length !== batch.length) {
            console.warn(
              `Batch ${batchNumber + 1}: input=${batch.length}, output=${batchResult.length}`
            );
          }

          allCRMRecords.push(...batchResult);

          success = true;

          // Gemini free tier rate limit
          await new Promise((resolve) => setTimeout(resolve, 12000));

          break;

        } catch (error: any) {

          console.error(
            `Batch ${batchNumber + 1}, Attempt ${attempt} failed`
          );

          const message = error.message ?? "";

          if (
            message.includes("429") ||
            message.toLowerCase().includes("too_many_requests")
          ) {

            console.log(`Waiting ${waitTime / 1000} seconds...`);

            await new Promise((resolve) => setTimeout(resolve, waitTime));

            waitTime *= 2;

          } else {

            if (attempt === MAX_RETRIES) {

              throw new ApiError(
                500,
                `Batch ${batchNumber + 1} failed after ${MAX_RETRIES} attempts`
              );

            }

            await new Promise((resolve) => setTimeout(resolve, waitTime));

            waitTime *= 2;

          }
        }
      }

      if (!success) {
        throw new ApiError(
          500,
          `Failed to process batch ${batchNumber + 1}`
        );
      }
    }

    // Save only CRM JSON
    const outputDir = path.join(process.cwd(), "database", "crm");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFile = path.join(outputDir, "crm.json");

    fs.writeFileSync(
      outputFile,
      JSON.stringify(allCRMRecords, null, 2),
      "utf8"
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          totalInputRecords: records.length,
          totalCRMRecords: allCRMRecords.length,
          outputFile,
        },
        "CRM extraction completed successfully"
      )
    );
  }
);

export { uploadCSV };

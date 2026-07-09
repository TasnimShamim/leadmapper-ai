import { Request, Response } from "express";
import fs from "fs";
import path from "path";

import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

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

export { uploadCSV };

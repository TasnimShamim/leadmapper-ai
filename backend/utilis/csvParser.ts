import fs from "fs";
import csv from "csv-parser";
import { Parser } from "json2csv";

export const parseCSV = async (
  filePath: string
): Promise<Record<string, any>[]> => {
  return new Promise((resolve, reject) => {
    const records: Record<string, any>[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        records.push(row);
      })
      .on("end", () => {
        console.log("CSV Parsed Successfully");
        console.log(`Rows: ${records.length}`);

        if (records.length > 0) {
          console.log(`Columns: ${Object.keys(records[0]).length}`);
        }

        resolve(records);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};


export const jsonToCSV = async (
  records: Record<string, any>[],
  outputPath: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      if (records.length === 0) {
        throw new Error("No records found to convert.");
      }

      const parser = new Parser();

      const csv = parser.parse(records);

      fs.writeFile(outputPath, csv, "utf8", (error) => {
        if (error) {
          return reject(error);
        }

        console.log("JSON converted to CSV successfully.");
        console.log(`Rows: ${records.length}`);
        console.log(`Columns: ${Object.keys(records[0]).length}`);
        console.log(`Saved at: ${outputPath}`);

        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};

import fs from "fs";
import csv from "csv-parser";

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

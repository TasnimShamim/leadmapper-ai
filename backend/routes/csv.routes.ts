import { Router } from "express";
import {
  uploadCSV,
  csvtoCMRConversion,
  getUploadedCSVFiles,
  previewUploadedCSV,
  getCRMFiles,
  previewCRMCSV,
} from "../controllers/csv.controllers";
import { upload } from "../middleware/multer.middleware.ts";

const csvRouter = Router();

csvRouter.post(
  "/upload",
  upload.single("csv"),
  uploadCSV
);
csvRouter.post(
  "/parse",
  csvtoCMRConversion
  );
csvRouter.get("/uploads", getUploadedCSVFiles);

csvRouter.get("/uploads/:fileName", previewUploadedCSV);

csvRouter.get("/crm", getCRMFiles);

csvRouter.get("/crm/:fileName", previewCRMCSV);
  

export default csvRouter;

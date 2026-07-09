import { Router } from "express";
import { uploadCSV,csvtoCMRConversion } from "../controllers/csv.controllers.ts";
import { upload } from "../middleware/multer.middleware.ts";

const csvRouter = Router();

csvRouter.post(
  "/upload",
  upload.single("csv"),
  uploadCSV
);
csvRouter.post(
  "/parse",
  upload.single("csv"),
  csvtoCMRConversion
  );
  

export default csvRouter;

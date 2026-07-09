import { Router } from "express";
import { uploadCSV } from "../controllers/csv.controller";
import { upload } from "../middleware/multer.middleware";

const csvRouter = Router();

csvRouter.post(
  "/upload",
  upload.single("csv"),
  uploadCSV
);

export default csvRouter;

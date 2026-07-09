import { Router } from "express";
import { uploadCSV } from "../controllers/csv.controllers.ts";
import { upload } from "../middleware/multer.middleware.ts";

const csvRouter = Router();

csvRouter.post(
  "/upload",
  upload.single("csv"),
  uploadCSV
);

export default csvRouter;

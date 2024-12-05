import { Router, Request, Response } from "express";
import upload from "../config/multer.config";
import FileController from "../controller/file.controller";

const fileRouter = Router();

fileRouter.post("/upload", upload.array("files", 5), FileController.upload);

// fileRouter.post("/ingest", FileController.ingest);



export default fileRouter;

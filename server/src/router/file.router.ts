import { Router, Request, Response } from "express";
import upload from "../config/multer.config";
import FileController from "../controller/file.controller";
import VectorDb from "../service/vectordb";

const fileRouter = Router();
const vectorStore = new VectorDb("llm-chat-collection-1");

fileRouter.post("/upload", upload.array("files", 5), FileController.upload);

fileRouter.post("/ingest", FileController.ingest);

fileRouter.get("/data", async (req: Request, res: Response) => {
	await vectorStore.getAll();
	res.sendStatus(200);
});

fileRouter.delete("/data", async (req: Request, res: Response) => {
	await vectorStore.deleteAll();
	res.sendStatus(200);
});

export default fileRouter;

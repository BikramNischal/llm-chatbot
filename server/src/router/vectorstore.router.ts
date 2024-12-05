import { Router, Request, Response } from "express";
import VectorClient from "../service/vectorClient";


const vectorStoreRouter = Router();
const collection = "llm-chat-collection-1";

vectorStoreRouter.get("/data", async (req: Request, res: Response) => {
	await VectorClient.getAll(collection);
	res.sendStatus(200);
});

vectorStoreRouter.delete("/data", async (req: Request, res: Response) => {
	await VectorClient.deleteAll();
	res.sendStatus(200);
});



export default vectorStoreRouter;
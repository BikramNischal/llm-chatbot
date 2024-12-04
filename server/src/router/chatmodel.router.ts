import { Router, Request, Response } from "express";
import ChatModelController from "../controller/chatmodel.controller";

const chatRouter = Router();

chatRouter.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Welcome To AI Chat"
    })
})

// handle user prompt
chatRouter.post("/message", ChatModelController.handlePostMessage);

chatRouter.post("/prompt", ChatModelController.llmPrompt);


export default chatRouter;

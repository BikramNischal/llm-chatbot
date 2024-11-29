import { Router, Request, Response } from "express";
import ChatModelController from "../controller/chatmodel.controller";

const ChatRouter = Router();

ChatRouter.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Welcome To AI Chat"
    })
})

// handle user prompt
ChatRouter.post("/message", ChatModelController.handlePostMessage);


export default ChatRouter;

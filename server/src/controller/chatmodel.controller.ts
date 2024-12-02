import ChatModel from "../service/chatModel";
import { Request, Response } from "express";

export default class ChatModelController {
	private static _chatmodel = new ChatModel();

	public static async handlePostMessage(req: Request, res: Response) {
		const message = req.body.message;
        try{
            const aiMessage = await ChatModelController._chatmodel.prompt(message)
            console.log(aiMessage);
            res.status(200).json({
                success: false,
                message:"LLM invoke success",
                aiMessage
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({
                success: false,
                message: (err as Error).message
            })
        }
	}
}

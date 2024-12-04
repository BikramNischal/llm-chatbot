import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { Request, Response } from "express";

import ChatModel from "../service/chatModel";
import VectorDb from "../service/vectordb";

export default class ChatModelController {
	private static _chatmodel = new ChatModel();

	public static async handlePostMessage(req: Request, res: Response) {
		const message = req.body.message;
		try {
			const aiMessage = await ChatModelController._chatmodel.prompt(
				message
			);
			console.log(aiMessage);
			res.status(200).json({
				success: true,
				message: "LLM invoke success",
				aiMessage,
			});
		} catch (err) {
			console.error(err);
			res.status(500).json({
				success: false,
				message: (err as Error).message,
			});
		}
	}

	public static async llmPrompt(req: Request, res: Response) {
		const message = req.body.message;
		const vectorStore = new VectorDb("llm-chat-collection-1");
		const retriever = vectorStore.provideRetriever();

		const qnaChain = await createStuffDocumentsChain({
			llm: ChatModelController._chatmodel.llm,
			prompt: ChatModelController._chatmodel.systemPropmt,
		});

		const ragChain = await createRetrievalChain({
			retriever: retriever,
			combineDocsChain: qnaChain,
		});

		const result = await ragChain.invoke({
			input: message,
		});
		res.status(200).json({
			message: "Prompt Success",
			result: result.answer,
		});
	}
}

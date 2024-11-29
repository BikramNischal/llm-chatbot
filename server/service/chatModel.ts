import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export default class ChatModel {
	private llm: ChatGoogleGenerativeAI;
	constructor() {
		this.llm = new ChatGoogleGenerativeAI({
			model: "gemini-pro",
            temperature: parseInt(process.env.TEMPERATURE!),
            maxOutputTokens: 50,
            apiKey: process.env.GOOGLE_API_KEY
		});
	}

	public async prompt(message: string) {
		const aiMessage = await this.llm.invoke([
			{ role: "user", content: message },
		]);
		return aiMessage;
	}
}

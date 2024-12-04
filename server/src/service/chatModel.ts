import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export default class ChatModel {
	public llm: ChatGoogleGenerativeAI;

	public systemTemplate = [
		`You are an assistant for question-answering tasks. `,
		`Use the following pieces of retrieved context to answer `,
		`the question. If you don't know the answer, say that you `,
		`don't know. Use three sentences maximum and keep the `,
		`answer concise.`,
		`\n\n`,
		`{context}`,
	].join("");

	public systemPropmt = ChatPromptTemplate.fromMessages([
		["system", this.systemTemplate],
		["human", "{input}"],
	]);

	constructor() {
		this.llm = new ChatGoogleGenerativeAI({
			model: "gemini-pro",
			temperature: parseInt(process.env.TEMPERATURE!),
			maxOutputTokens: 50,
			apiKey: process.env.GOOGLE_API_KEY,
			callbacks: [
				{
					handleLLMEnd(output) {
						const data = { ...output.generations[0][0] } as any;
						console.log(data.message.usage_metadata);
					},
				},
			],
		});
	}

	public async prompt(message: string) {
		const aiMessage = await this.llm.invoke([
			{ role: "user", content: message },
		]);
		return aiMessage;
	}
}

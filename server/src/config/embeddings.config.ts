import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

import { TaskType } from "@google/generative-ai";

const embeddings = new GoogleGenerativeAIEmbeddings({
	model: "text-embedding-004", // 768 dimensions
	taskType: TaskType.RETRIEVAL_DOCUMENT,
	apiKey: process.env.GOOGLE_API_KEY!
});

export default embeddings;

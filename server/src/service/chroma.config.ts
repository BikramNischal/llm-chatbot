import {Chroma} from "@langchain/community/vectorstores/chroma"
import {GoogleGenerativeAIEmbeddings} from "@langchain/google-genai"

import { TaskType } from "@google/generative-ai";

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004", // 768 dimensions
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  title: "Document title",
});

const vectorStore = new Chroma(embeddings, {
    collectionName: "",
    url : "http://localhost:8080"
})
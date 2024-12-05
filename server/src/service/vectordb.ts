import { Chroma } from "@langchain/community/vectorstores/chroma";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import type { Document } from "@langchain/core/documents";
import embeddings from "../config/embeddings.config";
import VectorClient from "./vectorClient";

export default class VectorDb {
	private _db: Chroma;
	public collectionName: string;

	constructor(collectionName: string) {
		this._db = new Chroma(embeddings, {
			collectionName,
			url: "http://localhost:8000",
		});
		this.collectionName = collectionName;
	}

	public async add(docs: Document<Record<string, any>>[]) {
		try {
			const textSplitter = new RecursiveCharacterTextSplitter({
				chunkSize: 1000,
				chunkOverlap: 200,
			});
			const chunks = await textSplitter.splitDocuments(docs);
			await this._db.addDocuments(chunks);
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	// Returns a tetriever for the vector database
	public provideRetriever(sources: string[]) {
		return this._db.asRetriever({
			filter:{
				source: {$in:sources} 
			}
		});
	}
}

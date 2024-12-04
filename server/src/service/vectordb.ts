import { ChromaClient, GetCollectionParams, IncludeEnum } from "chromadb";
import { Chroma } from "@langchain/community/vectorstores/chroma";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import type { Document } from "@langchain/core/documents";
import embeddings from "../config/embeddings.config";

export default class VectorDb {
	private _db: Chroma;
	private collectionName: string;
	private static _client = new ChromaClient();

	constructor(collectionName: string) {
		this._db = new Chroma(embeddings, {
			collectionName,
			url: "http://localhost:8000",
		});
		this.collectionName = collectionName;
	}

	// check if a collection with the give name exists
	public async checkCollectionExists(collectionName: string) {
		const collections = await VectorDb._client.listCollections();
		return collections.some(
			(collection) => collection.name === collectionName
		);
	}

	public async add(docs: Document<Record<string, any>>[]) {
		const textSplitter = new RecursiveCharacterTextSplitter({
			chunkSize: 1000,
			chunkOverlap: 200,
		});
		const chunks = await textSplitter.splitDocuments(docs);

		await this._db.addDocuments(chunks);
	}

	// Get all data from vector database
	public async getAll() {
		try {
			const collections = (
				await VectorDb._client.listCollections()
			).filter((collection) => collection.name === this.collectionName);

			if (collections.length) {
				const collection = await VectorDb._client.getCollection(
					collections[0]
				);

				const data = await collection.get({
					include: [
						"documents" as IncludeEnum,
						"embeddings" as IncludeEnum,
						"metadatas" as IncludeEnum,
					],
				});
				console.log("Chroma Data: ");
				console.log(data);
			} else {
				console.error(
					`No Collcetion found with Name: ${this.collectionName}`
				);
			}
		} catch (err) {
			console.error("Error reteriving data from ChromaDb", err);
		}
	}

	// Delete all data from all collections
	public async deleteAll() {
		try {
			const collections = await VectorDb._client.listCollections();
			for (const collectionParam of collections) {
				VectorDb._client.deleteCollection(collectionParam);
				console.log("Chroma Data Cleared");
			}
		} catch (err) {
			console.error(err);
		}
	}

	// Returns a tetriever for the vector database
	public provideRetriever() {
		return this._db.asRetriever({
			// filter:{
			// 	source: "./assets/nepal.pdf"
			// }
		});
	}
}

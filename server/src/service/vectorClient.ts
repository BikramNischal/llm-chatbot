import { ChromaClient, IncludeEnum } from "chromadb";

export default class VectorClient {
	public static _client = new ChromaClient();

	// check if collection exists
	public static async checkCollectionExists(collectionName: string) {
		const collections = await VectorClient._client.listCollections();
		return collections.some(
			(collection) => collection.name === collectionName
		);
	}

	// get collection params if collection exists else null
	public static async getCollection(collectionName: string) {
		const collections = (
			await VectorClient._client.listCollections()
		).filter((collection) => collection.name === collectionName);

		if (collections.length) {
			const collection = await VectorClient._client.getCollection(
				collections[0]
			);
			return collection;
		}
		return null;
	}

	// get all data in {collectionName}
	public static async getAll(collectionName: string) {
		const collection = await VectorClient.getCollection(collectionName);
		if (collection) {
			const data = await collection.get({
				include: [
					"documents" as IncludeEnum,
					"embeddings" as IncludeEnum,
					"metadatas" as IncludeEnum,
				],
			});
			return data;
		} else {
			console.log(`Collection ${collectionName} Not Found!`);
			return null;
		}
	}

	public static async getUniqueSources(collectionName: string) {
		const collection = await VectorClient.getCollection(collectionName);
		if (collection) {
			const data = await collection.get({
				include: ["metadatas" as IncludeEnum],
			});
			
			const sources = data.metadatas.map((metadata) => {
				return metadata!.source;
			})

			const uniqueSource = new Set(sources);
			return [...uniqueSource];
		}
	}

	// Delete all collection
	public static async deleteAll() {
		try {
			const collections = await VectorClient._client.listCollections();
			for (const collectionParam of collections) {
				VectorClient._client.deleteCollection(collectionParam);
				console.log("Chroma Data Cleared");
				return true;
			}
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	// Delete collection
	public static async delete(collectionName: string) {
		const collection = await VectorClient.getCollection(collectionName);
		if (collection) {
			VectorClient._client.deleteCollection(collection);
			return true;
		} else {
			return false;
		}
	}
}

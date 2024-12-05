import "pdf-parse";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

import { FileDb } from "../model/file.model";
import { File } from "../entity/file.entity";
import VectorDb from "./vectordb";

export default class FileOperation {
	public static async uploadFiles(files: Express.Multer.File[], collection: string) {
		// File objects to store on database
		const uplaodFiles: File[] = [];

		// list of uploaded file paths
		const filePaths: string[] = []

		files.forEach((file) => {
			const newFile = new File();
			newFile.originalName = file.originalname;
			newFile.name = file.filename;
			newFile.path = "./assets/" + file.filename;
			newFile.date = new Date().toISOString().substring(0, 10);

			uplaodFiles.push(newFile);
			filePaths.push(newFile.path);
		});
		
		const fileUpload = await FileDb.storeFiles(uplaodFiles);
		const fileEmbeddings = FileOperation.embeddFiles(filePaths,collection)

		return (fileUpload && fileEmbeddings);

	}

	public static async parsePdf(filepath: string) {
		try {
			const loader = new PDFLoader(filepath);
			const docs = await loader.load();
			return docs;
		} catch (err) {
			console.error(
				`Failed to parse file ${filepath} With Error : ${
					(err as Error).message
				}`
			);
			return null;
		}
}

	public static async embeddFiles(
		filePaths: string[],
		collectionName: string
	) {
		const vectorStore = new VectorDb(collectionName);
		for (const filepath of filePaths) {
			const docs = await FileOperation.parsePdf(filepath);
			if (docs) {
				await vectorStore.add(docs);
			} else {
				return false;
			}
		}
		return true;
	}
}

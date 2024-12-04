import "pdf-parse";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

import { FileDb } from "../model/file.model";
import { File } from "../entity/file.entity";
import VectorDb from "./vectordb";

export default class FileOperation {
	
	public static async uploadFiles(files: Express.Multer.File[]) {
		const uplaodFiles: File[] = [];
		files.forEach((file) => {
			const newFile = new File();
			newFile.originalName = file.originalname;
			newFile.name = file.filename;
			newFile.path = "./assets/" + file.filename;
			newFile.date = new Date().toISOString().substring(0, 10);

			uplaodFiles.push(newFile);
		});
		return FileDb.storeFiles(uplaodFiles);
	}

	public static async parsePdf(fileName: string) {
		const file: File | null = await FileDb.getFileByName(fileName);
		if (file) {
			try {
				const loader = new PDFLoader(file.path);
				const docs = await loader.load();
				return docs;
			} catch (err) {
				console.error(
					`Failed to parse file ${fileName} With Error : ${
						(err as Error).message
					}`
				);
				return null;
			}
		} else {
			console.error(
				`Failed to parse file ${fileName} : No such file found.`
			);
			return null;
		}
	}

	public static async ingestFile(fileName: string, collectionName: string) {
		const vectorStore = new VectorDb(collectionName);
		const docs = await FileOperation.parsePdf(fileName);
		if (docs) {
			await vectorStore.add(docs);
			return true;
		} else {
			return false;
		}

	}
}

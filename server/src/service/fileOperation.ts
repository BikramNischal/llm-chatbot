import { Express } from "express";
import { fileRepo } from "../model/file.model";
import { File } from "../entity/file.entity";
import path from "path";

export default class FileOperation {
	public static async uploadFiles(files: Express.Multer.File[]) {
		const uplaodFiles: File[] = [];
		try {
			files.forEach((file) => {
				const splitPath = file.destination.split("\\");
				const sourcePath = splitPath
					.slice(0, splitPath.indexOf("server"))
					.join("\\");

				const newFile = new File();
				newFile.originalName = file.originalname;
				newFile.name = file.filename;
				newFile.path = path
					.relative(sourcePath, file.path)
					.split("\\")
					.join("/");
				newFile.date = new Date().toISOString().substring(0, 10);

				uplaodFiles.push(newFile);
			});
			fileRepo.save(uplaodFiles);
            return true;
		} catch (err) {
            console.error(err)
            return false;
        }
	}
}

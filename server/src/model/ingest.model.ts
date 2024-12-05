import { Ingest } from "../entity/ingest.entity";
import { AppDataSource } from "../service/db";
import { FileDb } from "./file.model";
import { File } from "../entity/file.entity";

export default class IngestDb {
	private static _ingest = AppDataSource.getRepository(Ingest);

	public static async createIngest(files: string[], chatName:string) {
		const paths: string[] = [];
		const dbFiles: File[] = [];

		for (const file of files) {
			const dbFile = await FileDb.getFileByName(file);
			if (dbFile) {
				paths.push(dbFile.path);
				dbFiles.push(dbFile);
			} else {
				console.log(`${file} Not Found!`);
				break;
			}
		}

		if (files.length === dbFiles.length) {
			const ingest: Ingest = new Ingest();
			ingest.files = dbFiles;
			ingest.chat = chatName;

			try {
				await IngestDb._ingest.save(ingest);
                return ingest;
			} catch (err) {
				console.error(
					`Failed to create ingest!\n Error: ${
						(err as Error).message
					}`
				);
				return null;
			}
		}
	}

	public static async updateChatName(ingestId: string, chatName: string) {
		try {
			const ingest = IngestDb._ingest.update(ingestId, {
				chat: chatName,
			});
			return ingest;
		} catch (err) {
			console.error(
				`Failed to update ingest ${ingestId}\n Error: ${
					(err as Error).message
				}`
			);
			return null;
		}
	}
}

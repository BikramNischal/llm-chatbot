import FileOperation from "../service/fileOperation";
import { Request, Response } from "express";
import IBaseResponse from "../model/response";

export default class FileController {
	public static async upload(req: Request, res: Response) {
		const status = await FileOperation.uploadFiles(
			req.files as Express.Multer.File[]
		);
		
		if (status) {
			res.status(200).json({
				success: status,
				message: `File upload success`,
			});
		} else {
			res.status(500).json({
				success: status,
				message: `File upload failed`,
			});
		}
	}

	public static async ingest(req: Request, res: Response) {
		const { files } = req.body;
		let response: IBaseResponse = {
			status: true,
			message: "File parsed successfuly",
		};


		for (const file of files) {
			const parse = await FileOperation.ingestFile(file, "llm-chat-collection-1");
			if (!parse) {
				response.status = false;
				break;
			}
		}

		if (response.status) {
			res.status(200).json(response);
		} else {
			res.status(500).json({
				...response,
				message: "File parsed failed!",
			});
		}
	}

}

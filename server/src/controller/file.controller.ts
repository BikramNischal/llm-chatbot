import FileOperation from "../service/fileOperation";
import { Request, Response } from "express";

export default class FileController {
	public static async upload(req: Request, res: Response) {
		const { collection } = req.body;

		const status = await FileOperation.uploadFiles(
			req.files as Express.Multer.File[],
			collection
		);

		if (status) {
			res.status(200).json({
				success: status,
				message: `File upload and embedding success`,
			});
		} else {
			res.status(500).json({
				success: status,
				message: `Failed to upload or embed file!`,
			});
		}
	}
}

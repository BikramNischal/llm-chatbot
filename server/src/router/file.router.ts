import { Request, Response, Router } from "express";
import upload from "../config/multer.config";
import FileOperation from "../service/fileOperation";


const fileRouter = Router()

fileRouter.post("/upload", upload.array("files", 5),  async (req: Request, res: Response) => {  
    const status = FileOperation.uploadFiles(req.files as Express.Multer.File[]) 

    res.status(200).json({
        success: true,
        message: `File upload success`
    })
})

export default fileRouter;


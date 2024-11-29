import express, { Application, Request, Response } from "express";
import "dotenv/config";
import bodyParser from "body-parser";

import ChatRouter from "./router/chatmodel.router";

const port = parseInt(process.env.EXPRESS_PORT!);
const app: Application = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
	res.status(200).json({
        success: true,
        message: "Hello World"
    });
});

app.use("/chat", ChatRouter);

app.listen(port, () => {
	console.log(`Express server running at ${port}`);
});

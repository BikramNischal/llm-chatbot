import express, { Application, Request, Response } from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import path from "path";

import { dbConnect } from "./service/db";

import chatRouter from "./router/chatmodel.router";
import fileRouter from "./router/file.router";
import vectorStoreRouter from "./router/vectorstore.router";


const port = parseInt(process.env.EXPRESS_PORT!);


const app: Application = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/static",express.static(path.join(__dirname,"../assets")))

// Database connection 
dbConnect()

app.get("/", (req: Request, res: Response) => {
	res.status(200).json({
        success: true,
        message: "Hello World"
    });
});

app.use("/chat", chatRouter);
app.use("/file", fileRouter);
app.use("/vector", vectorStoreRouter);

app.listen(port, () => {
	console.log(`Express server running at ${port}`);
});

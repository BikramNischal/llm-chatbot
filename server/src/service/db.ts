import "reflect-metadata";
import { DataSource } from "typeorm";

import { File } from "../entity/file.entity";
import { Ingest } from "../entity/ingest.entity";
import { Chat } from "../entity/chat.entity";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.PG_HOST,
	port: parseInt(process.env.PG_PORT!),
	username: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.DATABASE,
	entities: [File, Chat, Ingest],
	synchronize: true,
	logging: false,
});

export async function dbConnect() {
	AppDataSource.initialize()
		.then(() => {
			console.log("Connected to database");
		})
		.catch((error) => console.error(error));
}

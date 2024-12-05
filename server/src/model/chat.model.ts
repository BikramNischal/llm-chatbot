import { AppDataSource } from "../service/db";
import { Chat } from "../entity/chat.entity";
import { Ingest } from "../entity/ingest.entity";

export default class ChatDb {
	private static _chat = AppDataSource.getRepository(Chat);

	public static async createChat(chatName: string, ingest: Ingest) {
		const chat = new Chat();
		chat.name = chatName;
		chat.ingest = ingest;
		chat.token = 0;

		try {
			ChatDb._chat.save(chat);
			return chat;
		} catch (err) {
			console.error(
				`Chat creation failed! Error : ${(err as Error).message}`
			);
			return null;
		}
	}

	public static async updateIngest(chat: Chat, ingest: Ingest) {
		try {
            chat.ingest = ingest;
			const updatedChat = await ChatDb._chat.save(chat);
		    console.log(`Chat ${chat.name} updated!`,chat);
            return updatedChat;
		} catch (err) {
			console.error(
				`Failed to update ${chat.name}! \n Error: ${
					(err as Error).message
				}`
			);
            return null;
		}
	}

    public static async getIngestFiles(chatName: string){
        const chat = await ChatDb._chat.findOne({
            where:{name: chatName},
            relations: ["ingest", "ingest.files"]
        });
        
        const files = chat?.ingest?.files;
        const paths = files?.map(file => file.path);
        return paths;
    }
}

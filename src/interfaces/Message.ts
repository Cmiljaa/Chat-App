import type { Timestamp } from "firebase/firestore";

export interface Message{
	id: string,
	senderId: string,
	text : string,
	chatId: string,
	createdAt: Timestamp
};
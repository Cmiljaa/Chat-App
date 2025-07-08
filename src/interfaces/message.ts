import type { Timestamp } from "firebase/firestore";

export interface Message{
	senderId: string,
	text : string,
	chatId: string,
	createdAt: Timestamp
};
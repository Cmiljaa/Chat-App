import type { Timestamp } from "firebase/firestore"

export interface Chat{
	id: string,
	members: {
		[userId: string]: {
			nickname: string,
			id: string,
			isTyping: boolean
		}
	}
	createdAt: Timestamp
};
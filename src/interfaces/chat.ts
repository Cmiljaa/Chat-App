import type { Timestamp } from "firebase/firestore"
import type { Message } from "./message"
import type { MemberInfo } from "./memberInfo"

export interface Chat{
	id: string,
	members: {
		[userId: string]: MemberInfo
	}
	createdAt: Timestamp,
	lastMessage: Message | null
};
import type { Timestamp } from "firebase/firestore"
import type { Message } from "./Message"
import type { MemberInfo } from "./MemberInfo"

export interface Chat{
	id: string,
	members: {
		[userId: string]: MemberInfo
	}
	createdAt: Timestamp,
	lastMessage: Message | null
};
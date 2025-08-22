import type { Timestamp } from "firebase/firestore";

export interface User{
	nickname: string,
	email: string,
	id: string,
	createdAt: Timestamp
};
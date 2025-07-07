import type { Chat } from "../../interfaces/chat";
import { collection, doc, getDocs, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

export const findChatBetweenUsers = async (userId1: string, userId2: string): Promise<string | null> => {
	const db = getFirestore();
	const chatsRef = collection(db, 'chats');

	try {
		const snapshot = await getDocs(chatsRef);

		for (const docSnap of snapshot.docs) {
			const chat = docSnap.data() as Chat;

			const members = chat.members || {};
			const memberIds = Object.keys(members);

			if (memberIds.includes(userId1) && memberIds.includes(userId2)) {
				return docSnap.id;
			}
		}

		return null;
	} catch (error) {
		console.error("Error finding chat:", error);
		return null;
	}
}

export const createChat = async (userId1: string, userNickname1: string, userId2: string, userNickname2: string): Promise<Chat> => {

	const db = getFirestore();
	const newChatRef = doc(collection(db, 'chats'));
	const newChatId = newChatRef.id;
	const newChatData = {
		created_at: serverTimestamp() as any,
		id: newChatId,
		members: {
			[userId1]: {
				id: userId1,
				nickname: userNickname1
			},
			[userId2]: {
				id: userId2,
				nickname: userNickname2
			},
		}
	};
	await setDoc(newChatRef, newChatData);
	
	return newChatData;
};

export const getUserChats = async (userId: string): Promise<Chat[]> => {
	const db = getFirestore();
	const chatsRef = collection(db, 'chats');

	try {
		const snapshot = await getDocs(chatsRef);

		if (snapshot.empty) return [];

		const userChats: Chat[] = [];

		snapshot.forEach(docSnap => {
			const data = docSnap.data();

			if (data.members && data.members[userId]) {
				userChats.push({
					id: docSnap.id,
					members: data.members,
					created_at: data.created_at
				});
			}
		});

		return userChats;
	} catch (error) {
		console.error("Error fetching chats:", error);
		return [];
	}
};
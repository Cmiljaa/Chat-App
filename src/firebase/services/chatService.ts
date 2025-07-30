import type { Ref } from "vue";
import type { Chat } from "../../interfaces/chat";
import { collection, doc, getDocs, getFirestore, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

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
		createdAt: serverTimestamp() as any,
		id: newChatId,
		members: {
			[userId1]: {
				id: userId1,
				nickname: userNickname1,
				isTyping: false
			},
			[userId2]: {
				id: userId2,
				nickname: userNickname2,
				isTyping: false
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
					createdAt: data.createdAt
				});
			}
		});

		return userChats;
	} catch (error) {
		console.error("Error while fetching the chats :", error);
		return [];
	}
};

export const getChatById = async (chatId: string, chat: Ref<Chat | null>): Promise<void> => {
	const db = getFirestore();
	const chatRef = doc(db, 'chats', chatId);

	try {
		onSnapshot(chatRef, (snapshot) => {
			if (!snapshot.exists()) {
				chat.value = null;
			} else {
				chat.value = snapshot.data() as Chat;
			}
			
		});
		chat.value = null;
	} catch (error) {
		console.error(error);
		chat.value = null;
	}
};

export const setUserTyping = async (chatId: string, userId: string, typing: boolean): Promise<void> => {
	const db = getFirestore();
	const chatRef = doc(db, 'chats', chatId);
	try {
		await updateDoc(chatRef, {
			[`members.${userId}.isTyping`]: typing
		});
	} catch (error) {
		console.error("Error while updating the chats :", error);
	}
};
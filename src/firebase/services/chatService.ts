import type { Ref } from "vue";
import type { Chat } from "../../interfaces/Chat";
import { collection, doc, getDocs, getFirestore, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import type { Message } from "../../interfaces/Message";

let unsubscribeFromChat: (() => void) | null = null;
let unsubscribeFromUserChats: (() => void) | null = null;

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
		},
		lastMessage: null
	};
	await setDoc(newChatRef, newChatData);
	
	return newChatData;
};

export const getUserChats = async (userId: string, userChats: Ref<Chat[]>): Promise<void> => {
  	const db = getFirestore();
  	const chatsRef = collection(db, 'chats');

  	try {
    	if (unsubscribeFromUserChats) {
    	  	unsubscribeFromUserChats();
    	}

		unsubscribeFromUserChats = onSnapshot(chatsRef, (snapshot) => {

			const chats: Chat[] = [];

			snapshot.forEach((docSnap) => {
			const data = docSnap.data();
				
				if (data.members && data.members[userId]) {
					chats.push({
						id: docSnap.id,
						members: data.members,
						createdAt: data.createdAt,
						lastMessage: data.lastMessage,
					});
				}
			});
			userChats.value = chats;
		});
		
 	} catch (error) {
    	console.error('Error while fetching the chats:', error);
   	 	userChats.value = [];
  	}	
};

export const getChatById = async (chatId: string, chat: Ref<Chat | null>): Promise<void> => {
	const db = getFirestore();
	const chatRef = doc(db, 'chats', chatId);

	try {
		if (unsubscribeFromChat) {
			unsubscribeFromChat();
		}

		unsubscribeFromChat =  onSnapshot(chatRef, (snapshot) => {
			chat.value = snapshot.data() as Chat;
		});
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
		console.error("Error while updating the chat :", error);
	}
};

export const setLastMessage = async (chatId: string, lastMessage: Message | null): Promise<void> => {
	const db = getFirestore();
	const chatRef = doc(db, 'chats', chatId);
	try {
		await updateDoc(chatRef, {
			lastMessage: lastMessage
		});
	} catch (error) {
		console.error("Error while updating the chat :", error);
	}
};

export const unsubscribeChat = () => {
	if (unsubscribeFromChat) {
		unsubscribeFromChat();
		unsubscribeFromChat = null;
	}
};

export const unsubscribeUserChats = (): void => {
  if (unsubscribeFromUserChats) {
    unsubscribeFromUserChats();
    unsubscribeFromUserChats = null;
  }
};
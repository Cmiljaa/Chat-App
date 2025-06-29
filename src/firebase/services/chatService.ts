import { getDatabase, ref, get, push, set } from "firebase/database";
import type { Chat } from "../../interfaces/chat";

export const findChatBetweenUsers = async (userId1: string, userId2: string): Promise<string | null> => {
  const db = getDatabase();
  const chatsRef = ref(db, 'chats');
  const snapshot = await get(chatsRef);

  if (snapshot.exists()) {
    const chats = snapshot.val();
    for (const chatId in chats) {
      const chat: Chat = chats[chatId];
      const members: { [id: string]: { id:string, nickname: string } } = chat.members || {};
      const memberIds = Object.keys(members);

      const chatBetweenUsers: boolean = memberIds.includes(userId1) && memberIds.includes(userId2);

      if (chatBetweenUsers) {
        return chatId;
      }
    }
  }

  return null;
}

export const createChat = async (userId1: string, userNickname1: string, userId2: string, userNickname2: string): Promise<string> => {

	const db = getDatabase();
	const chatsRef = ref(db, 'chats');
	const newChatRef = push(chatsRef);
	const newChatId: string = newChatRef.key!;
	const newChatData = {
		createdAt: Date.now(),
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
	await set(newChatRef, newChatData);

	return newChatId;
};

export const getUserChats = async (userId: string) => {
	const db = getDatabase();
	const chatsRef = ref(db, 'chats');
	const snapshot = await get(chatsRef);

	if (!snapshot.exists()) return [];

	const chats = snapshot.val();
	const userChats: { [chatId: string]: Chat } = {};

	for (const chatId in chats) {
		const chat: Chat = chats[chatId];
		const members = chat.members || {};

		if (members[userId]) {
			userChats[chatId] = chat;
		}
	}

	return Object.values(userChats);
};
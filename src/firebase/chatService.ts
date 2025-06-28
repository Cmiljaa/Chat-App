
export const createChat = async (userId1: string, userId2: string) => {

	const db = getDatabase();
	const chatsRef = ref(db, 'chats');
	const newChatRef = push(chatsRef);
	const newChatId = newChatRef.key!;

	const newChatData = {
		createdAt: Date.now(),
		members: {
			[userId1]: true,
			[userId2]: true,
		}
	};

	await set(newChatRef, newChatData);

	return newChatId;
};
import { type Router } from "vue-router";
import { createChat, findChatBetweenUsers } from "../firebase/services/chatService";
import type { Chat } from "../interfaces/chat";

export default function useChatActions(){

	const loadOrCreateChat = async (userId1: string, userNickname1: string, userId2: string, userNickname2: string, router: Router): Promise<Chat | string> => {
		let result: string | null = await findChatBetweenUsers(userId1, userId2);

		if (!result) {
			const newChat: Chat = await createChat(userId1, userNickname1, userId2, userNickname2);
			openChat(newChat.id, router);

			return newChat;
		}
		else {
			openChat(result, router);
			return result;
		}
	}

	const openChat = (chatId: string, router: Router): void => {
		router.push({ name: 'Chat', params: { chatId: chatId } });
	};

	const getOtherMemberNickname = (members: Record<string, { id: string, nickname: string }>, excludeId: string): string => {
		const other = Object.values(members).find(member => member.id !== excludeId);
		return other ? other.nickname : 'Unknown';
	}

	return {
		openChat,
		getOtherMemberNickname,
		loadOrCreateChat
	};
};
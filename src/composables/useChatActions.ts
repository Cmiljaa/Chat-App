import { type Router } from "vue-router";
import { createChat, findChatBetweenUsers } from "../firebase/services/chatService";
import type { Chat } from "../interfaces/chat";
import useChatList from "./useChatList";
const { openChat } = useChatList();

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

	};


	return {
		loadOrCreateChat
	};
};
import type { Router } from "vue-router";

export default function useChatList(){

	const openChat = (chatId: string, router: Router, nickname: string): void => {
		router.push({ name: 'Chat', params: { chatId: chatId }, query: { nickname: nickname } });
	}; 

	return {
		openChat
	}
}
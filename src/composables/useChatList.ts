import type { Router } from "vue-router";

export default function useChatList(){

	const openChat = (chatId: string, router: Router): void => {
		router.push({ name: 'Chat', params: { chatId: chatId } });
	};

	const getOtherMemberNickname = (members: Record<string, { id: string, nickname: string }>, excludeId: string): string => {
		const other = Object.values(members).find(member => member.id !== excludeId);
		return other ? other.nickname : 'Unknown';
	}

	return {
		openChat,
		getOtherMemberNickname
	}
}
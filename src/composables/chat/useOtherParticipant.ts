import { ref, watchEffect } from "vue";
import { getChatById } from "../../firebase/services/chatService";

export default function useOtherParticipant(){

	const getOtherMemberNickname = (members: Record<string, { id: string, nickname: string }>, excludeId: string): string => {
		const other = Object.values(members).find(member => member.id !== excludeId);
		return other ? other.nickname : 'Unknown';
	}

	return {
		getOtherMemberNickname
	}

};
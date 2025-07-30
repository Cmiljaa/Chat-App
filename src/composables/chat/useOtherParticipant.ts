export default function useOtherParticipant(){

	const isOtherMemberTyping = (members: Record<string, { id: string, nickname: string, isTyping: boolean }> | null, excludeId: string) => {
		if(!members) return false;
		const otherParticipant = Object.values(members).find(member => member.id !== excludeId);
		return otherParticipant?.isTyping;
	}

	const getOtherMemberNickname = (members: Record<string, { id: string, nickname: string, isTyping: string }>, excludeId: string): string => {
		const other = Object.values(members).find(member => member.id !== excludeId);
		return other ? other.nickname : 'Unknown';
	}

	return {
		isOtherMemberTyping,
		getOtherMemberNickname
	}

};
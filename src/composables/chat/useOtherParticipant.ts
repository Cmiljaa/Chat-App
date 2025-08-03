export default function useOtherParticipant(){

	const isOtherMemberTyping = (members: Record<string, MemberInfo> | null, excludeId: string) => {
		if(!members) return false;
		const otherParticipant = Object.values(members).find(member => member.id !== excludeId);
		return otherParticipant?.isTyping;
	}

	const getOtherMemberNickname = (members: Record<string, { id: string, nickname: string, isTyping: string }>, excludeId: string): string => {
		const other = Object.values(members).find(member => member.id !== excludeId);
		return other ? other.nickname : 'Unknown';
	}
	const getOtherMemberNickname = (members: Record<string, MemberInfo> | null | undefined,excludeId: string): string => {

	return {
		isOtherMemberTyping,
		getOtherMemberNickname
	}

};
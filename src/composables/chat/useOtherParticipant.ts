import type { MemberInfo } from "../../interfaces/MemberInfo";

export default function useOtherParticipant(){

	const isOtherMemberTyping = (members: Record<string, MemberInfo> | null, excludeId: string): boolean | undefined => {
		if(!members) return false;
		const otherParticipant = Object.values(members).find(member => member.id !== excludeId);
		return otherParticipant?.isTyping;
	}

	const getOtherMemberNickname = (members: Record<string, MemberInfo> | null | undefined, excludeId: string): string => {
		if (!members || typeof excludeId !== 'string') return 'Unknown';

		const otherMember = Object.values(members).find(member => member.id && member.id !== excludeId);

		return otherMember?.nickname || 'Unknown';
	};

	return {
		isOtherMemberTyping,
		getOtherMemberNickname
	}

};
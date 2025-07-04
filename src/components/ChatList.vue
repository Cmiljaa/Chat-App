<template>
	<div>
		<p v-if="chats.length" v-for="chat in chats" :key="chat.id" @click="loadChat(otherUser.id, otherUser.nickname)"
			class="text-white text-lg px-6 py-3 hover:bg-white/10 transition-colors duration-150 cursor-pointer truncate">
			{{ getOtherMemberNickname(chat.members, userId) }}
		</p>
		<p v-else class="text-white text-lg px-6 py-3 transition-colors duration-150 truncate">
			No chats found
		</p>
	</div>
</template>

<script setup lang="ts">
import type { Chat } from '../interfaces/chat';

defineProps<{
	chats: Chat[],
	userId: string
}>();


const getOtherMemberNickname = (members: Record<string, { id: string, nickname: string }>, excludeId: string): string => {
	const other = Object.values(members).find(member => member.id !== excludeId);
	return other ? other.nickname : 'Unknown';
}



</script>
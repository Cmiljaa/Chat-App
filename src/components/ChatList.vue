<template>
	<div>
		<p v-if="chats.length" v-for="chat in chats" :key="chat.id" @click="openChat(chat.id)"
			class="text-white text-lg px-6 py-3 hover:bg-white/10 transition-colors duration-150 cursor-pointer truncate">
			{{ getOtherMemberNickname(chat.members, userId) }}
		</p>
		<p v-else class="text-white text-lg px-6 py-3 transition-colors duration-150 truncate">
			No chats found
		</p>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Chat } from '../interfaces/chat';

defineProps<{
	chats: Chat[],
	userId: string
}>();
const router = useRouter();

const getOtherMemberNickname = (members: Record<string, { id: string, nickname: string }>, excludeId: string): string => {
	const other = Object.values(members).find(member => member.id !== excludeId);
	return other ? other.nickname : 'Unknown';
}

const openChat = (chatId: string) => {
	router.push({ name: 'Chat', params: { chatId: chatId } });
};

</script>
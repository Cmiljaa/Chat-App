<template>
	<div>
		<div v-if="chats.length" v-for="chat in chats" :key="chat.id"
			@click="handleOpenChat(chat.id, getOtherMemberNickname(chat.members, userId))"
			class="flex flex-col gap-1 px-6 py-4 cursor-pointer transition-colors duration-150 hover:bg-white/10 rounded-xl text-white truncate">
			<p class="text-base font-semibold text-white truncate">
				{{ getOtherMemberNickname(chat.members, userId) }}
			</p>
			<p class="text-sm text-gray-400 truncate">
				{{ chat.lastMessage?.text || 'No messages yet' }}
			</p>
		</div>

		<p v-else class="text-white text-lg px-6 py-3 transition-colors duration-150 truncate">
			No chats found
		</p>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Chat } from '../../interfaces/chat';
import useChatList from '../../composables/chat/useChatList';
import useOtherParticipant from '../../composables/chat/useOtherParticipant';

defineProps<{
	chats: Chat[],
	userId: string
}>();

const router = useRouter();

const { openChat } = useChatList();
const { getOtherMemberNickname } = useOtherParticipant();

const handleOpenChat = (chatId: string, nickname: string): void => {
	openChat(chatId, router, nickname);
}

</script>
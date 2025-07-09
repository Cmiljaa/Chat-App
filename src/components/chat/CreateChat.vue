<template>
	<Modal :isOpen="isModalOpen" @update:isOpen="emit('update:isModalOpen', $event)">
		<div class="flex items-center gap-2 w-full max-w-sm">
			<input type="text" placeholder="Search..." v-model="nickname"
				class="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1" />

			<ion-icon name="search-outline" @click="getSearch()"
				class="text-white text-2xl cursor-pointer transition duration-200"></ion-icon>
		</div>
		<div class="flex-1 mt-2 overflow-y-auto custom-scroll space-y-1">
			<div v-for="otherUser in searchedUsers" :key="otherUser.id"
				@click="handleChatAccess(user.id, user.nickname, otherUser.id, otherUser.nickname)"
				class="text-white px-6 rounded-lg py-3 hover:bg-[#000] transition-colors duration-150 cursor-pointer truncate">
				{{ otherUser.nickname }}
			</div>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { ref, type ComputedRef, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUsersByNickname } from '../../firebase/services/userService';
import useChatActions from '../../composables/useChatActions';
import type { User } from '../../interfaces/user';
import type { Chat } from '../../interfaces/chat';
import Modal from '../ui/Modal.vue';
import useCurrentUser from '../../composables/useCurrentUser';

defineProps<{
	isModalOpen: boolean
}>();

const nickname: Ref<string> = ref('');
let searchedUsers: Ref<User[]> = ref([]);
const router = useRouter();
const { user }: { user: ComputedRef<User> } = useCurrentUser();

const { openChat, loadOrCreateChat } = useChatActions();

const emit = defineEmits<{
	(e: 'update:isModalOpen', value: boolean): void,
	(e: 'chatCreated', value: Chat | string): void
}>();

const getSearch = async (): Promise<void> => {
	searchedUsers.value = await getUsersByNickname(nickname.value, user.value.nickname);
}

const handleChatAccess = async (userId1: string, userNickname1: string, userId2: string, userNickname2: string): Promise<void> => {
	const result: Chat | string = await loadOrCreateChat(userId1, userNickname1, userId2, userNickname2, router);

	if (typeof result === 'string') {
		handleOpenChat(result);
		emit('chatCreated', result);
	} else {
		emit('chatCreated', result);
	}

	nickname.value = '';
	searchedUsers.value = [];
}

const handleOpenChat = (chatId: string): void => {
	openChat(chatId, router);
}

</script>
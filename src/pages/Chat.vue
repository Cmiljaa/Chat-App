<template>
	<div class="flex flex-col flex-1 h-[calc(100vh-60px)]">
		<div class="flex flex-col h-full" v-if="!isLoading">
			<div class="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
				<div v-for="chatMessage in chatMessages" :key="chatMessage.id" class="flex"
					:class="chatMessage.senderId === user.id ? 'justify-end' : 'justify-start'">
					<div :class="chatMessage.senderId === user.id
						? 'bg-blue-500 text-white rounded-bl-lg rounded-tr-lg rounded-tl-lg shadow-md'
						: 'bg-gray-200 text-gray-900 rounded-br-lg rounded-tl-lg rounded-tr-lg shadow-sm'" class="p-2 w-fit max-w-xs">
						{{ chatMessage.text }}
					</div>
				</div>
			</div>

			<div class="p-3 border-t bg-white">
				<div class="flex items-center gap-2">
					<input type="text" placeholder="Send message" v-model="message"
						class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
					<button @click="handleSendingMessage(message)" :disabled="isDisabled"
						class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
						Send
					</button>
				</div>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, type ComputedRef, type Ref } from 'vue';
import { sendMessage } from '../firebase/services/messageService';
import useCurrentUser from '../composables/useCurrentUser';
import type { User } from '../interfaces/user';

const props = defineProps<{
	chatId: string,
}>();

const message: Ref<string> = ref('');
const isDisabled: Ref<boolean> = ref(true);

const { user }: { user: ComputedRef<User> } = useCurrentUser();
const chatMessages: Ref<Message[]> = ref([]);

const handleSendingMessage = async (messageText: string) => {
	await sendMessage(user.value.id, messageText, props.chatId);
}

watch(message, () => {
	isDisabled.value = message.value.trim() === '';
});

watch(() => route.params.chatId, async (newChatId, oldChatId) => {
	if (newChatId !== oldChatId) {
		await fetchChatMessages();
	}
});

</script>
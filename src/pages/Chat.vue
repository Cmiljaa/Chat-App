<template>
	<div class="flex flex-col  flex-1 h-[calc(100vh-60px)] bg-purple-700">
		<div class="flex flex-col h-full">
			<div class="flex-1 overflow-y-auto p-4 space-y-2">
				<div class="bg-gray-200 p-2 rounded-md w-fit">Message 1</div>
				<div class="bg-blue-500 text-white p-2 rounded-md w-fit self-end">Message 2</div>
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

const handleSendingMessage = async (messageText: string) => {
	await sendMessage(user.value.id, messageText, props.chatId);
}

watch(message, () => {
	if (message.value === '') {
		isDisabled.value = true;
	}
	else {
		isDisabled.value = false;
	}
});

</script>
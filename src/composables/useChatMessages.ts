import { computed, onMounted, onUnmounted, ref, watch, type ComputedRef, type Ref } from "vue";
import type { User } from "../interfaces/user";
import type { Message } from "../interfaces/message";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { getChatMessages, sendMessage } from "../firebase/services/messageService";

export default function useChatMessages(user: ComputedRef<User>, route: RouteLocationNormalizedLoaded ){

	const message: Ref<string> = ref('');
	const isDisabled: Ref<boolean> = ref(true);
	const chatId: Ref<string> = computed(() => route.params.chatId as string);
	const chatMessages: Ref<Message[]> = ref([]);
	let isLoading: Ref<boolean> = ref<boolean>(true);

	const handleSendingMessage = async () => {
		isDisabled.value = false;

		await sendMessage(user.value.id, message.value, chatId.value);
		message.value = '';
		isDisabled.value = true;
	}

	const fetchChatMessages = async () => {
		chatMessages.value = [];
		isLoading.value = true;
		await getChatMessages(chatId.value, chatMessages);
		isLoading.value = false;
	};

	watch(message, () => {
		isDisabled.value = message.value.trim() === '';
	});

	watch(() => route.params.chatId, async (newChatId, oldChatId) => {
		if (newChatId !== oldChatId) {
			await fetchChatMessages();
		}
	});

	const onKeyDown = async (event: KeyboardEvent): Promise<void> => {
		if (event.key === 'Enter' && message.value.trim() != '') {
			await handleSendingMessage();
		}
	};

	onMounted(async (): Promise<void> => {
		await fetchChatMessages();

		window.addEventListener('keydown', onKeyDown);
	});

	onUnmounted((): void => {
			window.removeEventListener('keydown', onKeyDown);
	});

	return {
		isLoading,
		chatMessages,
		message,
		handleSendingMessage,
		isDisabled
	}
}
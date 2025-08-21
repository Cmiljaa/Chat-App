import { computed, onMounted, onUnmounted, ref, watch, type Ref } from "vue";
import type { Message } from "../../interfaces/Message";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { getChatMessages, unsubscribeChatMessages } from "../../firebase/services/messageService";
import { getChatById, unsubscribeChat } from "../../firebase/services/chatService";
import { type Chat } from "../../interfaces/Chat";
import useChatTextArea from "./useChatTextArea";

const { resizeTextArea } = useChatTextArea();

export default function useChatMessages(route: RouteLocationNormalizedLoaded, loadMore: Ref<boolean> = ref(false)){

	const chatId = computed(() => route.params.chatId as string);
	const chatMessages: Ref<Message[]> = ref([]);
	const isLoading = ref(true);
	const isScrollEnabled = ref(true);
	const chat = ref<Chat | null>(null);

	const fetchChatMessages = async (): Promise<void> => {
		isScrollEnabled.value = true;
		loadMore.value = true;
		isLoading.value = true;
		chatMessages.value = [];
		await getChatMessages(chatId.value, chatMessages);
		await getChatById(chatId.value, chat);
		setTimeout(() => isLoading.value = false, 100);
	};

	watch(() => route.params.chatId, async (newChatId, oldChatId): Promise<void> => {
		if (newChatId !== oldChatId) {
			await fetchChatMessages();
		}
	});

	onMounted(async (): Promise<void> => {
		await fetchChatMessages();
		await getChatById(chatId.value, chat);
		setTimeout(() => {
			isScrollEnabled.value = false;
		}, 1000);
		resizeTextArea();
	});

	onUnmounted((): void => {
		unsubscribeChat();
		unsubscribeChatMessages();
	});

	return {
		isLoading,
		chatMessages,
		isScrollEnabled,
		chat,
		chatId,
	}
}
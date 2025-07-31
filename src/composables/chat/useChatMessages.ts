import { computed, onMounted, ref, watch, type Ref } from "vue";
import type { Message } from "../../interfaces/message";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { getChatMessages } from "../../firebase/services/messageService";
import { getChatById } from "../../firebase/services/chatService";
import { type Chat } from "../../interfaces/chat";
import useChatTextArea from "./useChatTextArea";

const { resizeTextArea } = useChatTextArea();

export default function useChatMessages(route: RouteLocationNormalizedLoaded){

	const chatId = computed(() => route.params.chatId as string);
	const chatMessages: Ref<Message[]> = ref([]);
	const isLoading = ref(true);
	const isScrollEnabled = ref(true);
	const chat = ref<Chat | null>(null);

	const fetchChatMessages = async (): Promise<void> => {
		isLoading.value = true;
		chatMessages.value = [];
		await getChatMessages(chatId.value, chatMessages);
		setTimeout(() => isLoading.value = false, 100);
	};

	watch(() => route.params.chatId, async (newChatId, oldChatId): Promise<void> => {
		if (newChatId !== oldChatId) {
			await fetchChatMessages();
		}
	});

	watch(chatMessages, (): void => {
		isScrollEnabled.value = true;
	},{ deep: true });

	onMounted(async (): Promise<void> => {
		await fetchChatMessages();
		await getChatById(chatId.value, chat);
		setTimeout(() => {
			isScrollEnabled.value = false;
		}, 1000);
		resizeTextArea();
	});

	return {
		isLoading,
		chatMessages,
		isScrollEnabled,
		chat,
		chatId,
	}
}
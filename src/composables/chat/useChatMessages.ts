import { computed, onMounted, ref, watch, type ComputedRef, type Ref } from "vue";
import type { User } from "../../interfaces/user";
import type { Message } from "../../interfaces/message";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { getChatMessages, sendMessage } from "../../firebase/services/messageService";
import showToast from "../../ToastNotifications";
import { getChatById, setUserTyping } from "../../firebase/services/chatService";
import { type Chat } from "../../interfaces/chat";

export default function useChatMessages(user: ComputedRef<User>, route: RouteLocationNormalizedLoaded){

	const message = ref('');
	const chatId = computed(() => route.params.chatId as string);
	const otherUserNickname = computed(() => route.query.nickname as string);
	const chatMessages: Ref<Message[]> = ref([]);
	const chatContainer = ref<HTMLElement | null>(null);
	const textarea: Ref<HTMLTextAreaElement | null> = ref(null);
	const isLoading = ref(true);
	const isDisabled = ref(true);
	const isScrollEnabled = ref(true);
	const chat = ref<Chat | null>(null);

	const handleSendMessage = async (): Promise<void> => {
		const messageText = message.value.trim();
		message.value = '';
		isScrollEnabled.value = true;

		if(messageText === ''){
			showToast('error', "Your message can't be empty.");
			return;
		}
		
		try {
			await sendMessage(user.value.id, messageText, chatId.value);
		} catch(error){
			console.log(error);
		} finally {
			isDisabled.value = true;
			setTimeout(() => {
				isScrollEnabled.value = false;
			}, 1000);
		}
	}

	const fetchChatMessages = async (): Promise<void> => {
		isLoading.value = true;
		chatMessages.value = [];
		await getChatMessages(chatId.value, chatMessages);
		setTimeout(() => isLoading.value = false, 100);
	};

	const resizeTextArea = (): void => {
		if (!textarea.value) return

		textarea.value.style.height = 'auto'

		const maxHeight = 24 * 2 + 17.5
		const scrollHeight = textarea.value.scrollHeight
		const newHeight = Math.min(scrollHeight, maxHeight)

		textarea.value.style.height = Math.max(newHeight, 24 + 17.5) + 'px'

		textarea.value.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden'
	}

	watch(message, async () => {
		if(message.value.trim() === ''){
			isDisabled.value = true;
		}
		else{
			isDisabled.value = false;
		}
		await setUserTyping(chatId.value, user.value.id, !isDisabled.value);
	});

	watch(() => route.params.chatId, async (newChatId, oldChatId): Promise<void> => {
		if (newChatId !== oldChatId) {
			await fetchChatMessages();
		}
	});

	watch(chatMessages, () => {
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
		message,
		handleSendMessage,
		otherUserNickname,
		isDisabled,
		chatContainer,
		resizeTextArea,
		isScrollEnabled,
		chat
	}
}
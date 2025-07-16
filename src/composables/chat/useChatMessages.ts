import { computed, nextTick, onMounted, onUnmounted, ref, watch, type ComputedRef, type Ref } from "vue";
import type { User } from "../../interfaces/user";
import type { Message } from "../../interfaces/message";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { getChatMessages, sendMessage } from "../../firebase/services/messageService";
import showToast from "../../ToastNotifications";

export default function useChatMessages(user: ComputedRef<User>, route: RouteLocationNormalizedLoaded){

	const message: Ref<string> = ref('');
	const isDisabled: Ref<boolean> = ref(true);
	const chatId: Ref<string> = computed(() => route.params.chatId as string);
	const otherUserNickname: Ref<string> = computed(() => route.query.nickname as string);
	const chatMessages: Ref<Message[]> = ref([]);
	const isLoading: Ref<boolean> = ref<boolean>(true);
	const chatContainer = ref<HTMLElement | null>(null);
	let observer: MutationObserver;

	const handleSendingMessage = async () => {
		const messageText = message.value.trim();

		if(messageText === ''){
			showToast('error', "Your message can't be empty.");
			return;
		}

		isDisabled.value = true;
		
		try {
			await sendMessage(user.value.id, messageText, chatId.value);
			message.value = '';
		} catch(error){
			console.log(error);
		} finally {
			isDisabled.value = false;
		}
	}

	const fetchChatMessages = async () => {
		chatMessages.value = [];
		await getChatMessages(chatId.value, chatMessages);
		setTimeout(() => isLoading.value = false, 100);
	};

	const scrollToBottom = () => {
		if (chatContainer.value) {
			chatContainer.value.scrollTop = chatContainer.value.scrollHeight
		}
	}

	watch(message, () => {
		isDisabled.value = message.value.trim() === '';
	});

	watch(() => route.params.chatId, async (newChatId, oldChatId) => {
		if (newChatId !== oldChatId) {
			await fetchChatMessages();
		}
	});

	watch(isLoading, async (val) => {
		if (!val) {
			await nextTick();
			if (chatContainer.value) {
				observer = new MutationObserver(() => scrollToBottom());
				observer.observe(chatContainer.value, { childList: true, subtree: true });
			}
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
		if (observer)
			observer.disconnect();
	});

	return {
		isLoading,
		chatMessages,
		message,
		handleSendingMessage,
		otherUserNickname,
		isDisabled,
		chatContainer,
		scrollToBottom
	}
}
import { computed, onMounted, ref, watch, type ComputedRef, type Ref } from "vue";
import type { User } from "../../interfaces/user";
import type { Message } from "../../interfaces/message";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { getChatMessages, sendMessage } from "../../firebase/services/messageService";
import showToast from "../../ToastNotifications";

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

	const handleSendMessage = async (): Promise<void> => {
		const messageText = message.value.trim();
		message.value = '';
		isScrollEnabled.value = true;

		if(messageText === ''){
			showToast('error', "Your message can't be empty.");
			return;
		}

		isDisabled.value = true;
		
		try {
			await sendMessage(user.value.id, messageText, chatId.value);
		} catch(error){
			console.log(error);
		} finally {
			isDisabled.value = false;
			setTimeout(() => {
				isScrollEnabled.value = false;
			}, 1000);
		}
	}

	const fetchChatMessages = async (): Promise<void> => {
		isLoading.value = true;
		isScrollEnabled.value = true;
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

	watch(message, (): void => {
		isDisabled.value = message.value.trim() === '';
	});

	watch(() => route.params.chatId, async (newChatId, oldChatId): Promise<void> => {
		if (newChatId !== oldChatId) {
			await fetchChatMessages();
		}
	});

	onMounted(async (): Promise<void> => {
		await fetchChatMessages();
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
		isScrollEnabled
	}
}
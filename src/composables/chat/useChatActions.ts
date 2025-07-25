import { type Router } from "vue-router";
import { createChat, findChatBetweenUsers, getUserChats } from "../../firebase/services/chatService";
import type { Chat } from "../../interfaces/chat";
import { onMounted, onUnmounted, ref, watch, type ComputedRef, type Ref } from 'vue';
import type { User } from "../../interfaces/user";
import useChatList from "./useChatList";

const { openChat } = useChatList();

export default function useChatActions(user: ComputedRef<User>){

	let isLoading = ref<boolean>(true);
	let chats: Ref<Chat[]> = ref([]);
	const isModalOpen = ref(false);

	const handleChatCreation = (chat: Chat | string): void => {
		if (typeof chat === 'object') {
			chats.value.push(chat);
		}

		isModalOpen.value = false;
	}

	const loadOrCreateChat = async (userId1: string, userNickname1: string, userId2: string, userNickname2: string, router: Router): Promise<Chat | string> => {
		let result: string | null = await findChatBetweenUsers(userId1, userId2);

		if (!result) {
			const newChat: Chat = await createChat(userId1, userNickname1, userId2, userNickname2);
			openChat(newChat.id, router, userNickname2);

			return newChat;
		}
		else {
			openChat(result, router, userNickname2);
			return result;
		}
	}

	watch(user, async (user): Promise<void> => {
		if (user.id) {
			chats.value = await getUserChats(user.id);
			isLoading.value = false;
		}
	}, { immediate: true });

	const onKeyDown = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			isModalOpen.value = false;
		}
	};

	onMounted((): void => {
		window.addEventListener('keydown', onKeyDown);
	});

	onUnmounted((): void => {
		window.removeEventListener('keydown', onKeyDown);
	});

	return {
		handleChatCreation,
		isModalOpen,
		isLoading,
		chats,
		loadOrCreateChat
	};
};
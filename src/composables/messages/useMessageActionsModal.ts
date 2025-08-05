import { ref, type Ref } from "vue";
import type { Message } from "../../interfaces/message";
import { deleteMessage } from "../../firebase/services/messageService";
import { setLastMessage } from "../../firebase/services/chatService";

export default function useMessageActionsModal(isScrollEnabled: Ref<boolean>, chatMessages: Ref<Message[]>, chatId: Ref<string>){
	const isModalVisible = ref(false);
	const selectedMessage = ref<Message | null>(null);

	const openModal = (message: Message): void => {
		isScrollEnabled.value = false;
		selectedMessage.value = message;
		isModalVisible.value = true;
	}

	const closeModal = (): void => {
		isModalVisible.value = false;
		selectedMessage.value = null;
		setTimeout(() => {
			isScrollEnabled.value = true;
		}, 1000);
	}

	const copyMessage = (): void => {
		if (selectedMessage.value) {
			navigator.clipboard.writeText(selectedMessage.value.text);
			closeModal();
		}
	}

	const handleDeleteMessage  = async (): Promise<void> => {
		const messages = chatMessages.value;
		const selected  = selectedMessage.value;
		
  		const lastMessage = chatMessages.value.length > 0 ? messages[messages.length - 1] : null;
  		const secondLastMessage = chatMessages.value.length > 1 ? messages[messages.length - 2] : null;

		if (selected ){
			await deleteMessage(selected );
			if(selected == lastMessage){
				await setLastMessage(chatId.value, secondLastMessage);
			}
			
			closeModal();
		}
	}

	return {
		isModalVisible,
		selectedMessage,
		openModal,
		closeModal,
		copyMessage,
		handleDeleteMessage
	}
};
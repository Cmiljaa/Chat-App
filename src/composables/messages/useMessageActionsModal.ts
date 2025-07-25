import { ref } from "vue";
import type { Message } from "../../interfaces/message";
import { deleteMessage } from "../../firebase/services/messageService";

export default function useMessageActionsModal(isScrollEnabled: boolean){
	const isModalVisible = ref(false);
	const selectedMessage = ref<Message | null>(null);

	const openModal = (message: Message): void => {
		isScrollEnabled = false;
		selectedMessage.value = message;
		isModalVisible.value = true;
	}

	const closeModal = (): void => {
		isModalVisible.value = false;
		selectedMessage.value = null;
		setTimeout(() => {
			isScrollEnabled = true;
		}, 1000);
	}

	const copyMessage = (): void => {
		if (selectedMessage.value) {
			navigator.clipboard.writeText(selectedMessage.value.text);
			closeModal();
		}
	}

	const handleDeleteMessage  = async (): Promise<void> => {
		if (selectedMessage.value) {
			await deleteMessage(selectedMessage.value);
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
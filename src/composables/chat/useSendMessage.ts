import { ref, type Ref } from "vue";
import showToast from "../../ToastNotifications";
import { getMessage, sendMessage } from "../../firebase/services/messageService";
import { setLastMessage } from "../../firebase/services/chatService";

export default function useSendMessage(userId: string, isScrollEnabled: Ref<boolean>, chatId: Ref<string>){

	const message = ref('');
	const isDisabled = ref(true);

	const handleSendMessage = async (): Promise<void> => {
		const messageText = message.value.trim();
		message.value = '';
		isScrollEnabled.value = true;

		if(messageText === ''){
			showToast('error', "Your message can't be empty.");
			return;
		}
		
		try {
			const newMessageId = await sendMessage(userId, messageText, chatId.value);
			if(!newMessageId) return;

			const newMessage = await getMessage(newMessageId);
			if(!newMessage) return;

			await setLastMessage(chatId.value, newMessage);
			
		} catch(error){
			console.log(error);
		} finally {
			isDisabled.value = true;
			setTimeout(() => {
				isScrollEnabled.value = false;
			}, 1000);
		}
	}

	return {
		handleSendMessage,
		isDisabled,
		message
	}
};
import { ref, type Ref } from "vue";
import showToast from "../../ToastNotifications";
import { sendMessage } from "../../firebase/services/messageService";

export default function useSendMessage(userId: string, isScrollEnabled: Ref<boolean>, chatId: string){

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
			await sendMessage(userId, messageText, chatId);
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
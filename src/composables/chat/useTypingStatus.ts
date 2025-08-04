import { watch, type Ref } from "vue";
import { setUserTyping } from "../../firebase/services/chatService";

export default function useTypingStatus(message: Ref<string>, chatId: Ref<string>, userId: string, isDisabled: Ref<boolean>){
	watch(message, async () => {
		isDisabled.value = message.value.trim() === '';
		await setUserTyping(chatId.value, userId, !isDisabled.value);
	});
};
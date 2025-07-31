import { ref, type Ref } from "vue";

export default function useChatTextArea(){
	
	const textarea: Ref<HTMLTextAreaElement | null> = ref(null);

	const resizeTextArea = (): void => {
		if (!textarea.value) return

		textarea.value.style.height = 'auto'

		const maxHeight = 24 * 2 + 17.5
		const scrollHeight = textarea.value.scrollHeight
		const newHeight = Math.min(scrollHeight, maxHeight)

		textarea.value.style.height = Math.max(newHeight, 24 + 17.5) + 'px'

		textarea.value.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden'
	}

	return {
		textarea,
		resizeTextArea
	};
}
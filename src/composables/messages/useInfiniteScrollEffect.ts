import { nextTick, watch, type Ref } from "vue";
import { useInfiniteScroll } from '@vueuse/core';
import { getChatMessages } from "../../firebase/services/messageService";
import type { Message } from "../../interfaces/Message";

export default function useInfiniteScrollEffect(chatId: Ref<string>, chatMessages: Ref<Message[]>, listEl: Ref<HTMLDivElement | null>, loadMore: Ref<boolean>, isScrollEnabled: Ref<boolean>){

	watch(listEl, (el) => {
		if (el && loadMore.value && listEl.value) {

			useInfiniteScroll(
				el,
				async () => {
					isScrollEnabled.value = false;
					if (el.scrollHeight <= el.clientHeight || !listEl.value) return;

					const prevHeight = listEl.value.scrollHeight;

					const result = await getChatMessages(chatId.value, chatMessages, true);

					await nextTick();

					const newHeight = listEl.value.scrollHeight;

					listEl.value.scrollTop += (newHeight - prevHeight);


					if (!result || result === 0) {
						loadMore.value = false;
						return;
					}
				},
				{
					distance: 0,
					direction: 'top',
				}
			);
		}
	});
}
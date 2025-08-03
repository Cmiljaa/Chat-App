<template>
	<div class="flex flex-col flex-1 h-[calc(100vh-60px)]">
		<div class="flex flex-col h-full" v-if="!isLoading">
			<div
				class="bg-[#0d0d0d] px-6 py-7 h-12 flex items-center border-l border-gray-700 sticky top-0 z-10 w-full shadow-sm">
				<span v-if="chat" class="text-xl font-semibold text-white">
					{{ getOtherMemberNickname(chat.members, user.id) }}
				</span>
			</div>
			<div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col"
				v-chat-scroll="{ enabled: isScrollEnabled }">
				<div v-for="chatMessage in chatMessages" :key="chatMessage.id" class="flex group"
					:class="chatMessage.senderId === user.id ? 'justify-end' : 'justify-start'">
					<template v-if="chatMessage.senderId === user.id">
						<div class="relative flex items-center">
							<span @click="openModal(chatMessage)"
								class="p-2 text-base cursor-pointer opacity-0 group-hover:opacity-100 relative">⋯</span>
							<div
								class="p-2 max-w-2xl break-words bg-blue-500 rounded-bl-lg rounded-tr-lg rounded-tl-lg text-white">
								{{ chatMessage.text }}
							</div>
						</div>
					</template>

					<template v-else>
						<div class="relative flex items-center">
							<span
								class="p-2 max-w-2xl break-words bg-gray-200 text-gray-900 rounded-br-lg rounded-tr-lg rounded-tl-lg shadow-sm">
								{{ chatMessage.text }}
							</span>
							<span @click="openModal(chatMessage)"
								class="p-2 text-base cursor-pointer opacity-0 group-hover:opacity-100 relative">⋯</span>
						</div>
					</template>

				</div>

			</div>
			<div class="pl-4" v-if="isOtherMemberTyping(chat?.members ?? null, user.id)">
				Typing...
			</div>
			<div class="p-3 bg-white">
				<div class="flex items-center gap-2">
					<textarea v-model="message" placeholder="Send message" rows="1" ref="textarea"
						@input="resizeTextArea" @keydown.enter.exact.prevent="handleSendMessage"
						class="w-full resize-none px-4 py-3 border border-gray-300 rounded-tl-lg rounded-bl-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
			Send Message
		</textarea>
					<button @click="handleSendMessage" :disabled="isDisabled"
						:class="['px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg transition cursor-pointer', { 'bg-gray-400 ': isDisabled }]">
						Send
					</button>
				</div>
			</div>
			<MessageActionsModal :visible="isModalVisible" :message="selectedMessage" @copy-message="copyMessage"
				@delete-message="handleDeleteMessage" @close-modal="closeModal" />
		</div>

		<Spinner v-else wrapperClass="flex flex-1 justify-center items-center" />
	</div>
</template>

<script setup lang="ts">
import { type ComputedRef } from 'vue';
import useCurrentUser from '../composables/auth/useCurrentUser';
import type { User } from '../interfaces/user';
import { useRoute } from 'vue-router';
import Spinner from '../components/ui/Spinner.vue';
import useChatMessages from '../composables/chat/useChatMessages';
import MessageActionsModal from '../components/MessageActionsModal.vue';
import useMessageActionsModal from '../composables/messages/useMessageActionsModal';
import useOtherParticipant from '../composables/chat/useOtherParticipant';
import useSendMessage from '../composables/chat/useSendMessage';
import useChatTextArea from '../composables/chat/useChatTextArea';
import useTypingStatus from '../composables/chat/useTypingStatus';

const route = useRoute();
const { user }: { user: ComputedRef<User> } = useCurrentUser();

const { chat, isLoading, chatMessages, isScrollEnabled, chatId } = useChatMessages(route);
const { message, handleSendMessage, isDisabled } = useSendMessage(user.value.id, isScrollEnabled, chatId);
const { isModalVisible, selectedMessage, openModal, closeModal, copyMessage, handleDeleteMessage } = useMessageActionsModal(isScrollEnabled.value);
const { isOtherMemberTyping, getOtherMemberNickname } = useOtherParticipant();
useTypingStatus(message, chatId, user.value.id, isDisabled);
const { resizeTextArea } = useChatTextArea();

</script>
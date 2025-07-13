<template>
	<div class="flex flex-col flex-1 h-[calc(100vh-60px)]">
		<div class="flex flex-col h-full" v-if="!isLoading">
			<div
				class="bg-[#0d0d0d] px-6 py-7 h-12 flex items-center border-l border-gray-700 sticky top-0 z-10 w-full shadow-sm">
				<span class="text-xl font-semibold text-white">{{ otherUserNickname ?? 'Unknown' }}</span>
			</div>
			<div class="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
				<div v-for="chatMessage in chatMessages" :key="chatMessage.id" class="flex"
					:class="chatMessage.senderId === user.id ? 'justify-end' : 'justify-start'">
					<div :class="chatMessage.senderId === user.id
						? 'bg-blue-500 text-white rounded-bl-lg rounded-tr-lg rounded-tl-lg shadow-md'
						: 'bg-gray-200 text-gray-900 rounded-br-lg rounded-tl-lg rounded-tr-lg shadow-sm'" class="p-2 w-fit max-w-xs">
						{{ chatMessage.text }}
					</div>
				</div>
			</div>

			<div class="p-3 bg-white">
				<div class="flex items-center gap-2">
					<input type="text" placeholder="Send message" v-model="message"
						class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
					<button @click="handleSendingMessage" :disabled="isDisabled"
						:class="['px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer', { 'bg-gray-400 ': isDisabled }]">
						Send
					</button>
				</div>
			</div>
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

const route = useRoute();
const { user }: { user: ComputedRef<User> } = useCurrentUser();

const { isLoading, chatMessages, message, handleSendingMessage, isDisabled, otherUserNickname } = useChatMessages(user, route);

</script>
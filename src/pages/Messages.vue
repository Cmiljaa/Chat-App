<template>
	<div class="flex">
		<div class="w-1/4 bg-[#0d0d0d] p-4 flex flex-col h-[calc(100vh-60px)] border-r border-[#1f1f1f]">

			<template v-if="!isLoading">
				<div class="flex justify-between items-center px-6 mb-2">
					<p class="text-white text-2xl font-semibold text-center truncate">
						{{ user.nickname || "User" }}
					</p>
					<div class="text-white text-4xl">
						<ion-icon name="create-outline" class="cursor-pointer" @click="isModalOpen = true"></ion-icon>
					</div>
				</div>
				<ChatList :chats="chats" :userId="user.id ?? '0'" />
			</template>

			<template v-else>
				<Spinner wrapperClass="flex flex-1 justify-center items-center" />
			</template>
		</div>


		<RouterView v-slot="{ Component }">
			<template v-if="Component">
				<div class="w-3/4 flex flex-col h-[calc(100vh-60px)]">
					<component :is="Component" class="flex-1" />
				</div>
			</template>
			<template v-else>
				<div class="w-3/4 bg-white p-4 flex flex-col justify-center items-center h-[calc(100vh-60px)]">
					<ion-icon name="chatbubble-outline" class="text-7xl text-blue-500 mb-4"></ion-icon>
					<p class="text-xl text-black">Your messages</p>
				</div>
			</template>
		</RouterView>

		<CreateChat :user="user" v-model:isModalOpen="isModalOpen" @chatCreated="handleChatCreation" />
	</div>

</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, type ComputedRef, type Ref } from 'vue';
import { getUserChats } from '../firebase/services/chatService';
import { type User } from '../interfaces/user';
import { type Chat } from '../interfaces/chat';
import Spinner from '../components/ui/Spinner.vue';
import CreateChat from '../components/chat/CreateChat.vue';
import ChatList from '../components/chat/ChatList.vue';
import useCurrentUser from '../composables/useCurrentUser';

const { user }: { user: ComputedRef<User> } = useCurrentUser();
let isLoading = ref<boolean>(true);
let chats: Ref<Chat[]> = ref([]);
const isModalOpen: Ref<boolean> = ref(false);

const handleChatCreation = (chat: Chat | string): void => {
	if (typeof chat === 'object') {
		chats.value.push(chat);
	}

	isModalOpen.value = false;
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

</script>
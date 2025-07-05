<template>
	<div class="flex flex-1">
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


		<div class="w-3/4 bg-white p-4 flex flex-col justify-center items-center">
			<RouterView v-slot="{ Component }">
				<template v-if="Component">
					<component :is="Component" />
				</template>
				<template v-else>
					<ion-icon name="chatbubble-outline" class="text-7xl text-blue-500 mb-4"></ion-icon>
					<p class="text-xl text-black">Your messages</p>
				</template>
			</RouterView>
		</div>

		<Modal v-model:isOpen="isModalOpen">
			<div class="flex items-center gap-2 w-full max-w-sm">
				<input type="text" placeholder="Search..." v-model="nickname"
					class="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1" />

				<ion-icon name="search-outline" @click="getSearch()"
					class="text-white text-2xl cursor-pointer transition duration-200"></ion-icon>
			</div>
			<div class="flex-1 mt-2 overflow-y-auto custom-scroll space-y-1">
				<div v-for="otherUser in otherUsers" :key="otherUser.id"
					@click="loadChat(otherUser.id, otherUser.nickname)"
					class="text-white px-6 rounded-lg py-3 hover:bg-[#000] transition-colors duration-150 cursor-pointer truncate">
					{{ otherUser.nickname }}
				</div>
			</div>
		</Modal>
	</div>

</template>

<script setup lang="ts">
import { useUserStore } from '../store/UserStore';
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';
import { getUsersByNickname } from '../firebase/services/userService';
import { createChat, findChatBetweenUsers, getUserChats } from '../firebase/services/chatService';
import { useRouter } from 'vue-router';
import Spinner from '../components/UI/Spinner.vue';
import Modal from '../components/UI/Modal.vue'; import ChatList from '../components/ChatList.vue';
import { type User } from '../interfaces/user';
import { type Chat } from '../interfaces/chat';

const router = useRouter();
const userStore = useUserStore();

const user: ComputedRef<User> = computed(() => userStore.currentUser);
let isLoading = ref<boolean>(true);
let otherUsers: Ref<User[] | null> = ref([]);
let chats: Ref<Chat[]> = ref([]);
const isModalOpen: Ref<boolean> = ref(false);
const nickname: Ref<string> = ref('');

const getSearch = async () => {
	otherUsers.value = await getUsersByNickname(nickname.value);
}

const loadChat = async (userId2: string, userNickname2: string) => {
	let result = await findChatBetweenUsers(user.value?.id ?? '0', userId2);
	console.log(result);
	if (!result) {
		const chatId = await createChat(user.value?.id ?? '0', user.value?.nickname ?? 'User', userId2, userNickname2);
		openChat(chatId);
	}
	else {
		openChat(result);
	}
	isModalOpen.value = false;
	nickname.value = '';
	otherUsers.value = [];
}

watch(user, async (user): Promise<void> => {
	if (user.id) {
		chats.value = await getUserChats(user.id);
		isLoading.value = false;
	}
}, { immediate: true });

const openChat = (chatId: string) => {
	router.push({ name: 'Chat', params: { chatId: chatId } });
};

</script>
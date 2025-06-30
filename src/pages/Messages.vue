<template>
	<div class="flex flex-1">
		<div class="w-1/4 bg-[#0d0d0d] p-4 flex flex-col h-[calc(100vh-60px)] border-r border-[#1f1f1f]">

			<template v-if="!isLoading">
				<div class="flex justify-between items-center px-6 mb-2">
					<p class="text-white text-2xl font-semibold text-center truncate">
						{{ user?.nickname || "User" }}
					</p>
					<div class="text-white text-4xl">
						<ion-icon name="create-outline" class="hover:cursor-pointer"
							@click="isModalOpen = true"></ion-icon>
					</div>
				</div>
				<p v-for="chat in chats" :key="chat.id"
					class="text-white text-lg px-6 py-3 hover:bg-white/10 transition-colors duration-150 cursor-pointer truncate">
					{{ getOtherMemberNickname(chat.members, user?.id || '') }}
				</p>
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
				<div v-for="otherUser in otherUsers" :key="otherUser.id" @click="chat(otherUser.id, otherUser.nickname)"
					class="text-white px-6 rounded-lg py-3 hover:bg-[#000] transition-colors duration-150 cursor-pointer truncate">
					{{ otherUser.nickname }}
				</div>
			</div>

		</Modal>
		<button></button>
	</div>


</template>

<script setup lang="ts">
import { useUserStore } from '../store/UserStore';
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';
import { getUsers, getUsersByNickname } from '../firebase/services/userService';
import { type User } from '../interfaces/user';
import Spinner from '../components/UI/Spinner.vue';
import Modal from '../components/UI/Modal.vue';
import { createChat, findChatBetweenUsers, getUserChats } from '../firebase/services/chatService';
import type { Chat } from '../interfaces/chat';

const userStore = useUserStore();
const user: ComputedRef<User | null> = computed(() => userStore.user);
let isLoading = ref<boolean>(true);
let otherUsers: Ref<User[] | null> = ref(null);
let chats: Ref<Chat[] | []> = ref([]);
const isModalOpen = ref(false);
const nickname = ref('');


const getSearch = async () => {
	otherUsers.value = await getUsersByNickname(nickname.value);
}

const chat = async (userId2: string, userNickname2: string) => {
	let result = await findChatBetweenUsers(user.value?.id ?? '0', userId2);
	console.log(result);
	if (!result) {
		console.log('test 2');
		const chatId = await createChat(user.value?.id ?? '0', user.value?.nickname ?? 'User', userId2, userNickname2);
		await console.log(chatId);
	}
}

watch(user, async (user): Promise<void> => {
	if (user?.id) {
		otherUsers.value = await getUsers(user.id);
		chats.value = await getUserChats(user.id);
		await console.log(chats.value);
		isLoading.value = false;
	}
}, { immediate: true });

const getOtherMemberNickname = (members: Record<string, { id: string, nickname: string }>, excludeId: string) => {
	const other = Object.values(members).find(member => member.id !== excludeId);
	return other ? other.nickname : 'Unknown';
}

</script>
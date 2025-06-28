<template>
	<div class="flex flex-1">
		<div class="w-1/4 bg-[#0d0d0d] p-4 flex flex-col h-[calc(100vh-60px)] border-r border-[#1f1f1f]">

			<template v-if="!isLoading">
				<div class="flex justify-between items-center px-6">
					<p class="text-white text-2xl font-semibold text-center truncate">
						{{ user?.nickname || "User" }}
					</p>
					<div class="text-white text-4xl">
						<ion-icon name="create-outline" class="hover:cursor-pointer"
							@click="isModalOpen = true"></ion-icon>
					</div>
				</div>
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
				<div v-for="otherUser in otherUsers" :key="otherUser.id" @click="chat(otherUser.id)"
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
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import { getUsersByNickname } from '../firebase/userService';
import { type User } from '../interfaces/user';
import Spinner from '../components/UI/Spinner.vue';
import Modal from '../components/UI/Modal.vue';
import { createChat, findChatBetweenUsers } from '../firebase/chatService';

const userStore = useUserStore();
const user: ComputedRef<User | null> = computed(() => userStore.user);
let isLoading = ref<boolean>(false);
let otherUsers: Ref<User[] | null> = ref(null);
const isModalOpen = ref(false);
const nickname = ref('');


const getSearch = async () => {
	otherUsers.value = await getUsersByNickname(nickname.value);
}

const chat = async (userIdB: string) => {
	let result = await findChatBetweenUsers(user.value?.id ?? '0', userIdB);
	if (!result) {
		const chatId = await createChat(user.value?.id ?? '0', userIdB);
		console.log(chatId);
	}
}

</script>
<template>
	<div class="flex">
		<div class="w-1/4 bg-[#0d0d0d] p-4 flex flex-col h-[calc(100vh-60px)]">

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

import Spinner from '../components/ui/Spinner.vue';
import CreateChat from '../components/chat/CreateChat.vue';
import ChatList from '../components/chat/ChatList.vue';
import useChatActions from '../composables/chat/useChatActions';
import type { ComputedRef } from 'vue';
import useCurrentUser from '../composables/auth/useCurrentUser';
import type { User } from '../interfaces/user';

const { user }: { user: ComputedRef<User> } = useCurrentUser();
const { handleChatCreation, isModalOpen, isLoading, chats } = useChatActions(user);

</script>
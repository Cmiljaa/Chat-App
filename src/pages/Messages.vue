<template>
	<div class="flex flex-1">
		<div class="w-1/4 bg-[#0d0d0d] p-4 flex flex-col h-[calc(100vh-60px)] border-r border-[#1f1f1f]">

			<template v-if="!isLoading">
				<div class="text-white text-lg font-semibold text-center mb-6 truncate">
					{{ user?.nickname || "User" }}
				</div>

				<button>New Message</button>

				<div class="flex-1 overflow-y-auto custom-scroll space-y-1">
					<div v-for="otherUser in otherUsers" :key="otherUser.id"
						class="text-white px-6 py-3 hover:bg-[#1f1f1f] transition-colors duration-150 cursor-pointer truncate">
						{{ otherUser.nickname }}
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
	</div>


</template>

<script setup lang="ts">
import { useUserStore } from '../store/UserStore';
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';
import { getUsers } from '../firebase/userService';
import { type User } from '../interfaces/user';
import Spinner from '../components/UI/Spinner.vue';

const userStore = useUserStore();
const user: ComputedRef<User | null> = computed(() => userStore.user);
let isLoading = ref<boolean>(true);
let otherUsers: Ref<User[] | null> = ref(null);

watch(user, async (loadedUser): Promise<void> => {
	if (loadedUser?.id) {
		otherUsers.value = await getUsers(loadedUser.id);
		isLoading.value = false;
	}
}, { immediate: true });

</script>
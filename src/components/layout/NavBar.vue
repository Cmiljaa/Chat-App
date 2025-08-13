<template>
	<nav class="bg-gray-100 shadow-sm p-4">
		<template v-if="!isLoading">
			<div class="flex justify-between items-center px-10">
				<RouterLink :to="{ name: 'Messages' }" class="text-xl font-medium">CHAT APP</RouterLink>

				<button class="md:hidden text-blue-600 text-2xl px-2 py-1 rounded transition-all duration-200"
					aria-label="Toggle navigation menu" @click="isOpen = !isOpen">
					☰
				</button>

				<ul class="hidden md:flex space-x-4">
					<template v-if="!isLoggedIn">
						<li class="text-xl px-2 font-medium">
							<RouterLink :to="{ name: 'SignIn' }" class="text-blue-600 hover:text-blue-800 font-lg">
								Sign In
							</RouterLink>
						</li>
						<li class="text-xl px-2 font-medium">
							<RouterLink :to="{ name: 'SignUp' }" class="text-blue-600 hover:text-blue-800 font-lg">
								Sign Up
							</RouterLink>
						</li>
					</template>
					<li class="text-xl px-2 font-medium" v-else>
						<SignOut customClass="text-blue-600 hover:text-blue-800 font-lg cursor-pointer"></SignOut>
					</li>
				</ul>
			</div>

			<ul v-show="isOpen"
				class="flex flex-col md:hidden mt-4 space-y-2 px-10 py-4 bg-gray-300 rounded-md transition-all duration-300">
				<template v-if="!isLoggedIn">
					<li>
						<RouterLink :to="{ name: 'SignIn' }" @click="closeMenu"
							class="block w-full text-center text-base font-medium uppercase text-blue-700 rounded py-2 transition-colors duration-200">
							Sign In
						</RouterLink>
					</li>
					<li>
						<RouterLink :to="{ name: 'SignUp' }" @click="closeMenu"
							class="block w-full text-center text-base font-medium uppercase text-blue-700 rounded py-2 transition-colors duration-200">
							Sign Up
						</RouterLink>
					</li>
				</template>
				<li class="text-xl px-2 font-medium" v-else>
					<SignOut @click="closeMenu"
						customClass="block w-full text-center text-base font-medium uppercase text-blue-700 rounded py-2 transition-colors duration-200">
					</SignOut>
				</li>
			</ul>
		</template>
		<template v-else>
			<Spinner wrapperClass="text-center -m-1.5" />
		</template>
	</nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignOut from '../auth/SignOut.vue';
import Spinner from '../UI/Spinner.vue';

let isOpen = ref(false);
const isLoggedIn = ref(false);
const isLoading = ref(true);
const auth = getAuth();

onMounted(async (): Promise<void> => {
	onAuthStateChanged(auth, async (user) => {
		isLoggedIn.value = !!user;
		isLoading.value = false;
	});
});

const closeMenu = (): void => { isOpen.value = false };

</script>
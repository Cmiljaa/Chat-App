<template>
	<nav class="bg-gray-100 shadow-sm p-4">
		<div class="flex justify-between items-center px-10">
			<p class="text-xl font-medium">CHAT APP</p>

			<button class="md:hidden text-blue-600 text-2xl px-2 py-1 rounded transition-all duration-200"
				@click="isOpen = !isOpen">
				☰
			</button>

			<ul class="hidden md:flex space-x-4">
				<li class="text-xl px-2 font-medium">
					<RouterLink :to="{ name: 'SignIn' }" class="text-blue-600 hover:text-blue-800 font-large">
						Sign In
					</RouterLink>
				</li>
				<li class="text-xl px-2 font-medium">
					<RouterLink :to="{ name: 'SignUp' }" class="text-blue-600 hover:text-blue-800 font-large">
						Sign Up
					</RouterLink>
				</li>
			</ul>
		</div>

		<ul v-show="isOpen"
			class="flex flex-col md:hidden mt-4 space-y-2 px-10 py-4 bg-gray-300 rounded-md transition-all duration-300">
			<li>
				<RouterLink :to="{ name: 'SignIn' }"
					class="block w-full text-center text-base font-medium uppercase text-blue-700 rounded py-2 transition-colors duration-200">
					Sign In
				</RouterLink>
			</li>
			<li>
				<RouterLink :to="{ name: 'SignUp' }"
					class="block w-full text-center text-base font-medium uppercase text-blue-700 rounded py-2 transition-colors duration-200">
					Sign Up
				</RouterLink>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let isOpen = ref(false);
</script>
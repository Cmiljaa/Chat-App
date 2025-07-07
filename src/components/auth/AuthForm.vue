<template>
	<form @submit.prevent="submitAuth" class="max-w-md mx-auto mt-10 p-6 bg-blue-50 rounded-lg shadow-md">
		<h1 class="text-3xl font-medium text-black mb-2 text-center">{{ title }}</h1>

		<div>
			<div class="space-y-4">
				<slot :v$="v$">

				</slot>
				<button type="submit" :disabled="loading"
					class="w-full py-2 bg-blue-600 text-white text-base font-semibold rounded-md hover:bg-blue-700 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed">
					Submit
				</button>
				<a @click="googleAuth(router)"
					class="flex items-center justify-center w-full py-2 px-4 bg-white text-black border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out">
					<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo"
						class="w-5 h-5 mr-3" />
					Continue with Google
				</a>
			</div>
		</div>
	</form>
	<div>
		<p v-if="authError" class="text-center mt-5 text-xl text-red-600">
			{{ authError }}
		</p>
	</div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { googleAuth } from '../../firebase/firebaseAuth';

const props = defineProps<{
	formData: Record<string, any>,
	rules: Record<string, any>,
	authFunction: (...args: any[]) => Promise<any>,
	handleErrors: (error: any) => string,
	title: string
}>();

const { rules, formData, authFunction, handleErrors } = props;

const loading = ref<boolean>(false);
const router = useRouter();
let authError = ref<string>('');

const v$ = useVuelidate(rules, formData);

const submitAuth = async (): Promise<void> => {
	v$.value.$touch();
	const result = await v$.value.$validate();

	if (!result) {
		return;
	}

	loading.value = true;

	try {
		await authFunction(...Object.values(formData));
		await router.push({ name: 'Messages' });

	} catch (error: any) {
		authError.value = handleErrors(error.code);

	} finally {
		loading.value = false;
	}
}

</script>
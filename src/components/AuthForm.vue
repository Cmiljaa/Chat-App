<template>
	<form action="" @submit.prevent="submitAuth" class="max-w-md mx-auto mt-20 p-6 bg-blue-50 rounded-lg shadow-md">
		<h1 class="text-3xl font-medium text-black mb-8 text-center">Sign In</h1>

		<div class="space-y-6">
			<div class="space-y-6">
				<slot :v$="v$">

				</slot>
				<button type="submit" :disabled="loading"
					class="w-full py-2 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 hover:cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed">
					Submit
				</button>
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

const props = defineProps<{
	formData: Record<string, any>,
	rules: Record<string, any>,
	authFunction: (...args: any[]) => Promise<any>,
	handleErrors: (error: any) => string
}>();

const { rules, formData, authFunction, handleErrors } = props;

const loading = ref<boolean>(false);
const router = useRouter();
let authError = ref<string>('');

const v$ = useVuelidate(rules, formData);

const submitAuth = async () => {
	v$.value.$touch();
	const result = await v$.value.$validate();

	if (!result) {
		return;
	}

	loading.value = true;

	try {
		const user = await authFunction(...Object.values(formData));
		await router.push('/messages');

	} catch (error: any) {
		authError.value = handleErrors(error.code);

	} finally {
		loading.value = false;
	}
}

</script>
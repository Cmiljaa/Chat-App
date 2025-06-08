<template>
	<form action="" @submit.prevent="registerUser" class="max-w-md mx-auto mt-10 p-6 bg-blue-50 rounded-lg shadow-md">
		<h1 class="text-3xl font-medium text-black mb-8 text-center">Sign Up</h1>

		<div class="space-y-6">
			<div class="space-y-6">
				<div class="relative mt-6">
					<label for="nickname" class="block mb-1 text-base text-black">
						Nickname
					</label>
					<input type="nickname" id="nickname" name="nickname" placeholder=" " required v-model="nickname"
						class="w-full px-4 py-2 text-black placeholder-transparent bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
				</div>

				<div class="relative mt-6">
					<label for="email" class="block mb-1 text-base text-black">
						Email
					</label>
					<input type="email" id="email" name="email" placeholder=" " required v-model="formData.email"
						class="w-full px-4 py-2 text-black placeholder-transparent bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
					<p class="text-red-500" v-for="error in v$.$errors" :key="error.$uid">
						{{ v$.email.$errors[0]?.$message }}
					</p>
				</div>

				<div class="relative mt-6">
					<label for="password" class="block mb-1 text-base text-black">
						Password
					</label>
					<input type="password" id="password" name="password" placeholder=" " required
						v-model="formData.password"
						class="w-full px-4 py-2 text-black placeholder-transparent bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
					<p class="text-red-500" v-for="error in v$.$errors" :key="error.$uid">
						{{ v$.password.$errors[0]?.$message }}
					</p>
				</div>
				<div class="relative mt-6">
					<label for="repeat_password" class="block mb-1 text-base text-black">
						Repeat Password
					</label>
					<input type="password" id="repeat_password" name="repeat_password" placeholder=" " required
						v-model="formData.repeatPassword"
						class="w-full px-4 py-2 text-black placeholder-transparent bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
					<p class="text-red-500" v-for="error in v$.$errors" :key="error.$uid">
						{{ v$.repeatPassword.$errors[0]?.$message }}
					</p>
				</div>

				<button type="submit" :disabled="loading"
					class="w-full py-2 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition">
					Submit
				</button>
			</div>
		</div>
	</form>
	<div>
		<p v-if="authError" class="text-center mt-5 text-xl text-red-600">
			{{ authError }} !
		</p>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { registerNewUser } from '../firebase/SignUp';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, sameAs, helpers } from '@vuelidate/validators';

const loading = ref<boolean>(false);
const router = useRouter();
let authError = ref<string | null>(null);

const formData = reactive({
	nickname: '',
	email: '',
	password: '',
	repeatPassword: ''
});

const rules = {
	nickname: { required, minLength: minLength(5) },
	email: { required, email },
	password: { required, minLength: minLength(6) },
	repeatPassword: { required, sameAsPassword: helpers.withMessage('Passwords do not match', sameAs(() => formData.password)) }
}

const v$ = useVuelidate(rules, formData);
const registerUser = async () => {
	try {
		await createUserWithEmailAndPassword(auth, email.value, password.value);

		await writeUserData(nickname.value, email.value);

		const user = await registerNewUser(formData.nickname, formData.email, formData.password);
		console.log(user);
		await router.push('/messages');

	} catch (error: any) {
		switch (error.code) {
			case 'auth/weak-password':
				authError.value = 'Password should be at least 6 characters long.';
				break;
			case 'auth/email-already-in-use':
				authError.value = 'This email is already registered. Please sign in or use another email.';
				break;
			case 'auth/invalid-email':
				authError.value = 'Please enter a valid email address.';
				break;
			default:
				authError.value = 'An unexpected error occurred. Please try again.';
		}
	}
}

</script>
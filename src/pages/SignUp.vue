<template>
	<AuthForm :formData="formData" :rules="rules" :authFunction="registerNewUser" :handleErrors="handleErrors"
		v-slot="{ v$ }" title="Sign Up">
		<BaseInput type="nickname" id="nickname" name="nickname" :error="v$.nickname.$errors[0]?.$message"
			v-model="formData.nickname" label="Nickname">
		</BaseInput>

		<BaseInput type="email" id="email" name="email" :error="v$.email.$errors[0]?.$message" v-model="formData.email"
			label="Email">
		</BaseInput>

		<BaseInput type="password" id="password" name="password" :error="v$.password.$errors[0]?.$message"
			v-model="formData.password" label="Password">
		</BaseInput>

		<BaseInput type="password" id="repeat_password" name="repeat_password"
			:error="v$.repeatPassword.$errors[0]?.$message" v-model="formData.repeatPassword" label="Repeat Password">
		</BaseInput>
	</AuthForm>
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
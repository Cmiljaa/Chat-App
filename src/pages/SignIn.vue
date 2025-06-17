<template>
	<div>
		<AuthForm :formData="formData" :rules="rules" :authFunction="signInUser" :handleErrors="handleErrors"
			v-slot="{ v$ }" title="Sign In">
			<BaseInput type="email" id="email" name="email" :error="v$.email.$errors[0]?.$message"
				v-model="formData.email" label="Email">
			</BaseInput>

			<BaseInput type="password" id="password" name="password" :error="v$.password.$errors[0]?.$message"
				v-model="formData.password" label="Password">
			</BaseInput>
		</AuthForm>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { signInUser } from '../firebase/SignIn';
import { required, minLength, email } from '@vuelidate/validators';
import BaseInput from '../components/BaseInput.vue';
import AuthForm from '../components/AuthForm.vue';

const formData = reactive({
	email: '',
	password: ''
});

const rules = {
	email: { required, email },
	password: { required, minLength: minLength(6) },
}

const handleErrors = (error: string): string => {
	switch (error) {
		case 'auth/invalid-credential':
		case 'auth/user-not-found':
		case 'auth/wrong-password':
			return 'Invalid email or password.';
		case 'auth/user-disabled':
			return 'This account has been disabled. Please contact support.';
		case 'auth/too-many-requests':
			return 'Too many failed attempts. Please wait and try again later.';
		default:
			return 'An unexpected error occurred. Please try again.';
	}
}
</script>
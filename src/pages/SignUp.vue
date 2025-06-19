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
import { computed, reactive } from 'vue';
import { registerNewUser } from '../firebase/firebaseAuth';
import { required, minLength, email, sameAs, helpers } from '@vuelidate/validators';
import AuthForm from '../components/AuthForm.vue';
import BaseInput from '../components/BaseInput.vue';

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
	repeatPassword: { required, sameAsPassword: helpers.withMessage('Passwords do not match', sameAs(computed(() => formData.password))) }
}

const handleErrors = (error: any): string => {
	switch (error.code) {
		case 'auth/weak-password':
			return 'Password should be at least 6 characters long.';
		case 'auth/invalid-email':
			return 'Please enter a valid email address.'
		default:
			return 'An unexpected error occurred. Please try again.';
	}
}

</script>
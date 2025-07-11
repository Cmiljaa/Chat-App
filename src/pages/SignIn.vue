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
import { signInUser } from '../firebase/firebaseAuth';
import BaseInput from '../components/ui/BaseInput.vue';
import AuthForm from '../components/auth/AuthForm.vue';
import useAuthForm from '../composables/auth/useAuthForm';

const { formData, rules, handleErrors } = useAuthForm('signin');
</script>
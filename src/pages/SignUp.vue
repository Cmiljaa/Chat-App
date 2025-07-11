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
import { registerNewUser } from '../firebase/firebaseAuth';
import AuthForm from '../components/auth/AuthForm.vue';
import BaseInput from '../components/ui/BaseInput.vue';
import useAuthForm from '../composables/useAuthForm';

const { formData, rules, handleErrors } = useAuthForm('signup');

</script>
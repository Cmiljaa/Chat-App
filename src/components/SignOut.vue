<template>
	<button :class="customClass" @click="handleSignOut">
		Sign Out
	</button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useUserStore } from "../store/UserStore";
import showToast from "../ToastNotifications";

const props = defineProps<{
	customClass: string
}>();

const { customClass } = props;
const userStore = useUserStore();
const router = useRouter();
const auth = getAuth();

const handleSignOut = async (): Promise<void> => {
	await signOut(auth);
	await router.push('/signIn');
	userStore.removeUser();
	showToast('success', 'Signed out successfully!');
};

</script>
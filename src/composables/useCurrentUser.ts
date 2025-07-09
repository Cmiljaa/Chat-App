import { computed, type ComputedRef } from "vue";
import { useUserStore } from "../store/UserStore";
import type { User } from "../interfaces/user";

export default function useCurrentUser(){
	const userStore = useUserStore();
	const user: ComputedRef<User> = computed(() => userStore.currentUser);

	return {
		user
	};
};
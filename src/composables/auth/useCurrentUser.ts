import { computed, type ComputedRef } from "vue";
import { useUserStore } from "../../store/UserStore";
import type { User } from "../../interfaces/User";

export default function useCurrentUser(): { user: ComputedRef<User> }{
	const userStore = useUserStore();
	const user: ComputedRef<User> = computed(() => userStore.currentUser);

	return {
		user
	};
};
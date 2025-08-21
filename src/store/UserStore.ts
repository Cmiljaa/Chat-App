import { defineStore } from "pinia";
import { type User } from "../interfaces/User";

export const useUserStore = defineStore('userStore', {
	state: () => ({
		user: null as null | User
	}),
	getters: {
		currentUser: (state): User => {
			if (!state.user)
				 throw new Error('User not loaded');
			return state.user;
		}
	},
	actions: {
		setUser(user: User | null): void
		{
			if(user)
				this.user = user;
			else
				return;
		},
		removeUser(): void
		{
			this.user = null;
		}
	}
});
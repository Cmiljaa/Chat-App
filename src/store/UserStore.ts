import type { User } from "firebase/auth";
import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
	state: () => ({
		user: null as null | User
	}),
	getters: {
		getUser(): User | null{
			return this.user;
		}
	},
	actions: ({
		setUser(user: User){
			this.user = user;
		},
		removeUser(){
			this.user = null;
		}
	})
});
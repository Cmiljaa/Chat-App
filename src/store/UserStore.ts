import type { UserCredential } from "firebase/auth";
import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
	state: () => ({
		user: null as null | UserCredential
	}),
	getters: {
		getUser(): UserCredential | null{
			return this.user;
		}
	},
	actions: ({
		setUser(user: UserCredential){
			this.user = user;
		},
		removeUser(){
			this.user = null;
		}
	})
});
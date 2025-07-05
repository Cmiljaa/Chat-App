import { defineStore } from "pinia";
import { type User } from "../interfaces/user";

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
		setUser(user: User | null){
			if(user)
				this.user = user;
			else
				return;
		},
		removeUser(){
			this.user = null;
		}
	}
});
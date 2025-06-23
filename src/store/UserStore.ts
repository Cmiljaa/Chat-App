import { defineStore } from "pinia";
import type User from "../interfaces/user";

export const useUserStore = defineStore('userStore', {
	state: () => ({
		user: null as null | User
	}),
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
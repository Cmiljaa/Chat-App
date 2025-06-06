import { createRouter, createWebHistory } from "vue-router";
import Messages from "./pages/Messages.vue";
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";
import Chat from "./pages/Chat.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/messages' },
		{ path: '/messages', name: 'Messages', component: Messages, children: [
			{ path: ':chatId', name: 'Chat', component: Chat }
		]},
		{ path: '/signUp', name: 'SignUp', component: SignUp },
		{ path: '/signIn', name: 'SignIn', component: SignIn }
	]
});

export default router;
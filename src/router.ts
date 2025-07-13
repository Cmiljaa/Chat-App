import { createRouter, createWebHistory } from "vue-router";
import Messages from "./pages/Messages.vue";
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";
import Chat from "./pages/Chat.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./store/UserStore";
import { getUser } from "./firebase/services/userService";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/messages' },
		{ path: '/messages', name: 'Messages', component: Messages, meta: { authOnly: true }, children: [
			{ path: ':chatId', name: 'Chat', component: Chat, meta: { nickname: '' } }
		]},
		{ path: '/signUp', name: 'SignUp', component: SignUp, meta: { guestOnly: true } },
		{ path: '/signIn', name: 'SignIn', component: SignIn, meta: { guestOnly: true } },
		{ path: '/:catchAll(.*)', redirect: { name: 'Messages' } }
	]
});

let userResolved = false;
let currentUser: any = null;

const waitForAuth = () => {
  const auth = getAuth();

  return new Promise((resolve) => {
    if (userResolved) return resolve(currentUser);

    onAuthStateChanged(auth, (user) => {
      currentUser = user;
      userResolved = true;
      resolve(user);
    });
  });
};



router.beforeEach(async (to, from, next) => {
	const firebaseUser: any = await waitForAuth();
	const userStore = useUserStore();

	if (firebaseUser && !userStore.user) {
		const userData = await getUser(firebaseUser.uid);
		if (userData) {
			userStore.setUser(userData);
		}
	}

	if (to.meta.authOnly && !firebaseUser) {
		return next({ name: 'SignIn' });
	}

	if (to.meta.guestOnly && firebaseUser) {
		return next({ name: 'Messages' });
	}

	return next();
});

export default router;
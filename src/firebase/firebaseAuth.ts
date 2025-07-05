import { type Router } from "vue-router";
import { signInWithPopup, getAdditionalUserInfo, createUserWithEmailAndPassword, GoogleAuthProvider, getAuth, signInWithEmailAndPassword, type UserCredential } from "firebase/auth";
import showToast from "../ToastNotifications";
import { addUserToDb } from "./services/userService";

const provider = new GoogleAuthProvider();

export const googleAuth = async (router: Router): Promise<void> => {
	try {
		const result = await signInWithPopup(getAuth(), provider);
		GoogleAuthProvider.credentialFromResult(result);
		
		if(getAdditionalUserInfo(result)?.isNewUser){
			showToast('success', 'Your account was successfully created.');
		} else{
			showToast('success', 'Signed In successfully!');
		}

		await addUserToDb(result.user.displayName || 'Anonymous', result.user.email || 'test@example.com', result.user.uid);

		await router.push({ name: 'Messages' });

	} catch (error) {
		console.log(error);
		showToast('error', 'Failed to sign in with Google');
	}
}

export const signInUser = async (email: string, password: string): Promise<UserCredential> => {
	const user = await signInWithEmailAndPassword(getAuth(), email, password);
	showToast('success', 'Signed in successfully!');
	return user;
};

export const registerNewUser = async (nickname: string, email: string, password: string): Promise<UserCredential> => {
	const user = await createUserWithEmailAndPassword(getAuth(), email, password);
		
	await addUserToDb(nickname, email, user.user.uid);

	showToast('success', 'Your account was successfully created.');

	return user;
}

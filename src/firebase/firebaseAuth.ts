import { type Router } from "vue-router";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { signInWithPopup, getAdditionalUserInfo, createUserWithEmailAndPassword, GoogleAuthProvider, getAuth, signInWithEmailAndPassword, type UserCredential } from "firebase/auth";
import showToast from "../ToastNotifications";

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
		
		await router.push({ name: 'Messages' });

	} catch (error) {
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
		
	const db = getDatabase();

	await set(dbRef(db, 'users/' + user.user.uid), {
		nickname,
		email,
	});

	showToast('success', 'Your account was successfully created.');

	return user;
}
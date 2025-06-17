import { type Router } from "vue-router";
import { signInWithPopup, getAdditionalUserInfo , GoogleAuthProvider, getAuth } from "firebase/auth";
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
		
		await router.push('/messages');

	} catch (error) {
		showToast('error', 'Failed to sign in with Google');
	}
}
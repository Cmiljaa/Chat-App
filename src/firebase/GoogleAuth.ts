import { type Router } from "vue-router";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";

const provider = new GoogleAuthProvider();

export const googleAuth = async (router: Router): Promise<void> => {
	try {
		const result = await signInWithPopup(getAuth(), provider)
		GoogleAuthProvider.credentialFromResult(result);
		await router.push('/messages');

	} catch (error) {
		console.log(error);
	}
}
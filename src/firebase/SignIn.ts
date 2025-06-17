import { getAuth, signInWithEmailAndPassword, type UserCredential } from "firebase/auth";
import showToast from "../ToastNotifications";

export const signInUser = async (email: string, password: string): Promise<UserCredential> => {
	const user = await signInWithEmailAndPassword(getAuth(), email, password);
	showToast('success', 'Signed in successfully!');
	return user;
};
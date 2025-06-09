import { getAuth, signInWithEmailAndPassword, type UserCredential } from "firebase/auth";

export const signInUser = async (email: string, password: string): Promise<UserCredential> => {
	const user = await signInWithEmailAndPassword(getAuth(), email, password);

	return user;
};
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, type UserCredential } from "firebase/auth";
import showToast from "../ToastNotifications";

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
import { getFirestore, serverTimestamp, doc, setDoc, query, getDoc, collection, getDocs, orderBy, startAt, endAt } from "firebase/firestore";
import showToast from "../../ToastNotifications";
import type { User } from "../../interfaces/user";

export const addUserToDb = async (nickname: string, email: string, id: string): Promise<void> => {
	const db = getFirestore();

	try {
		await setDoc(doc(db, 'users', id), {
			nickname,
			email,
			id,
			created_at: serverTimestamp()
		}, { merge: true });
	} catch (error) {
		console.error('Failed to add user to DB:', error);
		showToast('error', 'Unexpected error');
	}
}

export const getUser = async (userId: string): Promise<User | null> => {
	const db = getFirestore();
	const userRef = doc(db, 'users', userId);
	try {
		const snapshot = await getDoc(userRef);
		if(snapshot.exists()){
			return snapshot.data() as User;
		} else{
			console.log('No data available');
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}

export const getUsersByNickname = async (nickname: string): Promise<User[]> => {

const db = getFirestore();
const usersRef = collection(db, 'users');

const userQuery = query(
		usersRef,
		orderBy('nickname'),
		startAt(nickname),
		endAt(nickname + '\uf8ff')
	);

try {
	const snapshot = await getDocs(userQuery);
	if (!snapshot.empty) {
		const users = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		}));

		return users as User[];
    } else {
		console.log("No users found");
		return [];
    }
} catch (error) {
	console.error(error);
	return [];
}};
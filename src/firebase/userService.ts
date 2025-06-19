import { ref, get, getDatabase, child } from "firebase/database";

export const getUsers = async () => {
	const db = getDatabase();
	const usersRef = ref(db, 'users');
	try {
		const snapshot = await get(usersRef);
		if (snapshot.exists()) {
			const users = snapshot.val();
			console.log(users);
			return users;
		} else {
			console.log("No users found.");
			return null;
		}
	} catch (error) {
		console.log(error);
	}
};

export const getUser = async (userId: string) => {
	const db = getDatabase();
	const userRef = ref(db);
	try {
		const snapshot = await get(child(userRef, `users/${userId}`));
		if(snapshot.exists()){
			console.log(snapshot.val());
		}else{
			console.log('No data available');
		}
	} catch (error) {
		console.log(error);
	}
}
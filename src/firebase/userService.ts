import { ref, get, getDatabase, child } from "firebase/database";

export const getUsers = async (exceptUserId?: string) => {
	const db = getDatabase();
	const usersRef = ref(db, 'users');
	try {
		const snapshot = await get(usersRef);
		if (snapshot.exists()) {
			let users = snapshot.val();

			if(exceptUserId){
				users = Object.fromEntries(
				Object.entries(users).filter(([userId]) => userId !== exceptUserId));
			}

			return users;
		} else {
			console.log("No users found.");
			return null;
		}
	} catch (error) {
		console.log(error);
	}
};

export const getUser = async (userId: string): Promise<null> => {
	const db = getDatabase();
	const userRef = ref(db);
	try {
		const snapshot = await get(child(userRef, `users/${userId}`));
		if(snapshot.exists()){
			return snapshot.val();
		}else{
			console.log('No data available');
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}
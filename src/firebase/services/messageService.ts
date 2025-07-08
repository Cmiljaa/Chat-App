import { collection, doc, getDocs, getFirestore, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import showToast from "../../ToastNotifications";
import type { Message } from "../../interfaces/message";

export const sendMessage = async (senderId: string, messageText: string, chatId: string) => {
	const db = getFirestore();

	try {
		await setDoc(doc(db, 'messages'), {
			senderId,
			messageText,
			chatId,
			createdAt: serverTimestamp()
		}, { merge: true });
	} catch (error) {
		console.error('Failed to send the message:', error);
		showToast('error', 'The message is not delivered');
	}
}

export const getChatMessages = async (chatId: string) => {
const db = getFirestore();
const messagesRef = collection(db, 'messages');

const messagesQuery = query(messagesRef, where('chatId', '==', chatId), orderBy('createdAt', 'asc'));

try {
	const snapshot = await getDocs(messagesQuery);
	if (!snapshot.empty) {
		const messages = snapshot.docs.map(doc => {
        const data = doc.data() as Message;
			return { id: doc.id, ...data };
		});

		return messages as Message[];
	} else {
		console.log("No users found");
		return [];
	}
} catch (error) {
	console.error(error);
	return [];
}};
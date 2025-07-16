import { collection, doc, getFirestore, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import showToast from "../../ToastNotifications";
import type { Message } from "../../interfaces/message";
import type { Ref } from "vue";

export const sendMessage = async (senderId: string, messageText: string, chatId: string): Promise<void> => {
	const db = getFirestore();
	try {
		const newMessageRef = doc(collection(db, 'messages')); 
		await setDoc(newMessageRef, {
			id: newMessageRef.id,
			senderId,
			text: messageText,
			chatId,
			createdAt: serverTimestamp()
		}, { merge: true });
	} catch (error) {
		console.error('Failed to send the message:', error);
		showToast('error', 'The message is not delivered');
	}
}

export const getChatMessages = async (chatId: string, messages: Ref<Message[]>): Promise<void> => {

const db = getFirestore();
const messagesRef = collection(db, 'messages');

const messagesQuery = query(messagesRef, where('chatId', '==', chatId), orderBy('createdAt', 'asc'));

	try {

		onSnapshot(messagesQuery, (querySnapshot) => {
			querySnapshot.docChanges().forEach((change) => {
				const doc = change.doc
				const data = doc.data() as Message

				const message: Message = { ...data }

				switch (change.type) {
					case 'added':
							messages.value.splice(change.newIndex, 0, message)
						break;

					case 'modified':
							if (change.oldIndex !== change.newIndex) {
								messages.value.splice(change.oldIndex, 1);
								messages.value.splice(change.newIndex, 0, message);
							} else {
								messages.value.splice(change.newIndex, 1, message);
							}
						break;

					case 'removed':
							messages.value.splice(change.oldIndex, 1)
						break;
				
					default:
						break;
				}
			})
		});
	} catch (error) {
		console.error(error);
	}
};
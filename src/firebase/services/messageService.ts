import { collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import showToast from "../../ToastNotifications";
import type { Message } from "../../interfaces/message";
import type { Ref } from "vue";

let unsubscribeMessages: (() => void) | null = null;

export const sendMessage = async (senderId: string, messageText: string, chatId: string): Promise<string | null> => {
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

		return newMessageRef.id;
	} catch (error) {
		console.error('Failed to send the message:', error);
		showToast('error', 'The message is not delivered');
		return null;
	}
}

export const getChatMessages = async (chatId: string, messages: Ref<Message[]>): Promise<void> => {

	const db = getFirestore();
	const messagesRef = collection(db, 'messages');

	const messagesQuery = query(messagesRef, where('chatId', '==', chatId), orderBy('createdAt', 'asc'));

	try {

		if (unsubscribeMessages) {
			unsubscribeMessages();
		}

		unsubscribeMessages = onSnapshot(messagesQuery, (querySnapshot) => {
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

export const getMessage = async (messageId: string): Promise<Message | null> => {
	const db = getFirestore();
	const userRef = doc(db, 'messages', messageId);
	try {
		const snapshot = await getDoc(userRef);
		if(snapshot.exists()){
			return snapshot.data() as Message;
		} else{
			console.log('No data available');
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}

export const deleteMessage = async (message: Message): Promise<void> => {
	const db = getFirestore();

	try {
		await deleteDoc(doc(db, 'messages', message.id));
		showToast('success', 'Message successfully deleted');
	} catch (error) {
		console.error('Failed to delete the message:', error);
		showToast('error', 'The message is not deleted');
	}
}

export const unsubscribeChatMessages = () => {
  if (unsubscribeMessages) {
    unsubscribeMessages();
    unsubscribeMessages = null;
  }
};
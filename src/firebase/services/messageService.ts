import { collection, deleteDoc, doc, getDoc, getFirestore, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, startAfter, where } from "firebase/firestore";
import showToast from "../../ToastNotifications";
import type { Message } from "../../interfaces/Message";
import { ref, type Ref } from "vue";

let unsubscribeMessages: (() => void) | null = null;
let lastVisibleDoc: any = ref(null);

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

export const getChatMessages = async (chatId: string, messages: Ref<Message[]>, loadMore: boolean = false): Promise<number | null> => {

	const db = getFirestore();
	const messagesRef = collection(db, 'messages');

	const numberOfMessages: Ref<number | null> = ref(null);

	let messagesQuery;
	if (loadMore && lastVisibleDoc) {
		messagesQuery = query(
		messagesRef,
		where("chatId", "==", chatId),
		orderBy("createdAt", "desc"),
		startAfter(lastVisibleDoc),
		limit(30));
	} else {
		messagesQuery = query(
		messagesRef,
		where("chatId", "==", chatId),
		orderBy("createdAt", "desc"),
		limit(30));
	}

	try {

		if (unsubscribeMessages && !loadMore) {
			unsubscribeMessages();
		}

		const firstSnapshot = new Promise<number>((resolve, reject) => {
			unsubscribeMessages = onSnapshot(messagesQuery, (querySnapshot) => {
				if (!querySnapshot.empty) {
					lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
				}

				numberOfMessages.value = querySnapshot.docs.length;

				querySnapshot.docChanges().forEach((change) => {
					const doc = change.doc
					const data = doc.data() as Message

					const message: Message = { ...data }

					switch (change.type) {
						case 'added':
								if (loadMore) {
									messages.value = [...messages.value, message];
								} else {
									const newMessages = [...messages.value];
									newMessages.splice(change.newIndex, 0, message);
									messages.value = newMessages;
								}
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
				});
					resolve(querySnapshot.docs.length);
				}, (error) => {
					reject(error);
				});
		});
		return await firstSnapshot;
	} catch (error) {
		console.error(error);
		return null;
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
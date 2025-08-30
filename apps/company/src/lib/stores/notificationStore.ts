import { writable, derived } from 'svelte/store';
import { 
	collection, 
	query, 
	where, 
	orderBy, 
	onSnapshot,
	updateDoc,
	doc,
	Timestamp,
	type Unsubscribe
} from 'firebase/firestore';
import { db } from '$lib/firebase';

export interface Notification {
	id: string;
	storeId: string;
	type: 'new_application' | 'application_update' | 'system';
	title: string;
	message: string;
	applicantName?: string;
	applicantId?: string;
	jobId?: string;
	jobTitle?: string;
	applicationId?: string;
	createdAt: Timestamp;
	read: boolean;
}

function createNotificationStore() {
	const { subscribe, set, update } = writable<Notification[]>([]);
	let unsubscribe: Unsubscribe | null = null;

	return {
		subscribe,
		
		// 通知の監視を開始
		startListening: (storeId: string) => {
			if (unsubscribe) {
				unsubscribe();
			}

			const notificationsRef = collection(db, 'notifications');
			const q = query(
				notificationsRef,
				where('storeId', '==', storeId),
				orderBy('createdAt', 'desc')
			);

			unsubscribe = onSnapshot(q, (snapshot) => {
				const notifications: Notification[] = [];
				snapshot.forEach((doc) => {
					notifications.push({
						id: doc.id,
						...doc.data()
					} as Notification);
				});
				set(notifications);
			});
		},

		// 通知を既読にする
		markAsRead: async (notificationId: string) => {
			const notificationRef = doc(db, 'notifications', notificationId);
			await updateDoc(notificationRef, { read: true });
			
			update(notifications => 
				notifications.map(n => 
					n.id === notificationId ? { ...n, read: true } : n
				)
			);
		},

		// すべての通知を既読にする
		markAllAsRead: async () => {
			const currentNotifications = await new Promise<Notification[]>(resolve => {
				const unsubscribe = subscribe(notifications => {
					resolve(notifications);
				});
				unsubscribe();
			});

			const unreadNotifications = currentNotifications.filter(n => !n.read);
			
			await Promise.all(
				unreadNotifications.map(n => {
					const notificationRef = doc(db, 'notifications', n.id);
					return updateDoc(notificationRef, { read: true });
				})
			);

			update(notifications => 
				notifications.map(n => ({ ...n, read: true }))
			);
		},

		// 監視を停止
		stopListening: () => {
			if (unsubscribe) {
				unsubscribe();
				unsubscribe = null;
			}
		}
	};
}

export const notifications = createNotificationStore();

// 未読通知数を計算
export const unreadCount = derived(
	notifications,
	$notifications => $notifications.filter(n => !n.read).length
);

// 時間を相対的に表示（例: "5分前"）
export function getRelativeTime(timestamp: Timestamp): string {
	const now = Date.now();
	const time = timestamp.toMillis();
	const diff = now - time;
	
	const minutes = Math.floor(diff / 60000);
	const hours = Math.floor(diff / 3600000);
	const days = Math.floor(diff / 86400000);
	
	if (minutes < 1) return 'たった今';
	if (minutes < 60) return `${minutes}分前`;
	if (hours < 24) return `${hours}時間前`;
	if (days < 7) return `${days}日前`;
	
	return timestamp.toDate().toLocaleDateString('ja-JP');
}
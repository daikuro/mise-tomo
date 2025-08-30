import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '$lib/firebase';

export interface ApplicationData {
	jobId: string;
	jobTitle: string;
	storeId: string;
	storeName: string;
	applicantId: string;
	applicantName: string;
	applicantEmail: string;
	message?: string;
	applicationId?: string;
}

/**
 * 応募時に店舗へ通知を送信
 */
export async function sendApplicationNotification(data: ApplicationData) {
	try {
		// 通知ドキュメントを作成
		const notificationRef = collection(db, 'notifications');
		const notification = {
			storeId: data.storeId,
			type: 'new_application',
			title: '新しい応募があります',
			message: `${data.applicantName}さんが「${data.jobTitle}」に応募しました`,
			applicantName: data.applicantName,
			applicantId: data.applicantId,
			jobId: data.jobId,
			jobTitle: data.jobTitle,
			applicationId: `${data.jobId}_${data.applicantId}_${Date.now()}`,
			createdAt: Timestamp.now(),
			read: false
		};

		await addDoc(notificationRef, notification);
		console.log('通知を送信しました');
		return true;
	} catch (error) {
		console.error('通知の送信に失敗しました:', error);
		return false;
	}
}

/**
 * 応募データを保存
 */
export async function saveApplication(data: ApplicationData) {
	try {
		// 応募データを保存
		const applicationRef = collection(db, 'applications');
		const application = {
			...data,
			status: 'pending',
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now()
		};

		const docRef = await addDoc(applicationRef, application);
		
		// 通知を送信
		await sendApplicationNotification({
			...data,
			applicationId: docRef.id
		});

		return docRef.id;
	} catch (error) {
		console.error('応募の保存に失敗しました:', error);
		throw error;
	}
}
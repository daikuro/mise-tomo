import { 
	collection, 
	addDoc, 
	updateDoc, 
	doc, 
	Timestamp,
	serverTimestamp
} from 'firebase/firestore';
import { db } from '$lib/firebase';

export interface ApplicationData {
	id: string;
	applicantName: string;
	applicantEmail: string;
	applicantPhone?: string;
	jobTitle: string;
	jobId: string;
	storeId: string;
	desiredWage?: number;
	experience?: string;
	availability?: string;
	message?: string;
}

export interface StaffData {
	storeId: string;
	name: string;
	email: string;
	phone?: string;
	role: 'アルバイト' | '正社員' | '契約社員';
	status: 'active' | 'inactive';
	startDate: Timestamp;
	endDate?: Timestamp;
	hourlyWage?: number;
	monthlySalary?: number;
	applicationId: string; // 元の応募ID
	createdAt: Timestamp;
	updatedAt: Timestamp;
	isNew: boolean; // 新規採用フラグ
}

/**
 * 応募者を採用してスタッフとして登録
 */
export async function hireApplicant(application: ApplicationData): Promise<string> {
	try {
		// 1. スタッフコレクションに新規登録
		const staffData: Omit<StaffData, 'id'> = {
			storeId: application.storeId,
			name: application.applicantName,
			email: application.applicantEmail,
			phone: application.applicantPhone,
			role: 'アルバイト', // デフォルトはアルバイト
			status: 'active',
			startDate: Timestamp.now(),
			hourlyWage: application.desiredWage || 1100, // デフォルト時給
			applicationId: application.id,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
			isNew: true
		};

		const staffRef = await addDoc(collection(db, 'staff'), staffData);

		// 2. 応募ステータスを「採用済み」に更新
		const applicationRef = doc(db, 'applications', application.id);
		await updateDoc(applicationRef, {
			status: 'hired',
			hiredDate: Timestamp.now(),
			staffId: staffRef.id,
			updatedAt: serverTimestamp()
		});

		// 3. 採用通知を作成（求職者向け）
		await sendHireNotification(application, staffRef.id);

		// 4. 店舗側にも通知
		await sendStaffAddedNotification(application, staffRef.id);

		return staffRef.id;
	} catch (error) {
		console.error('採用処理に失敗しました:', error);
		throw error;
	}
}

/**
 * 求職者に採用通知を送信
 */
async function sendHireNotification(application: ApplicationData, staffId: string) {
	const notificationData = {
		userId: application.applicantEmail, // 実際はユーザーIDを使用
		type: 'hire_notification',
		title: '採用のお知らせ',
		message: `おめでとうございます！${application.jobTitle}の求人に採用されました。`,
		storeId: application.storeId,
		jobId: application.jobId,
		jobTitle: application.jobTitle,
		applicationId: application.id,
		staffId: staffId,
		createdAt: Timestamp.now(),
		read: false
	};

	await addDoc(collection(db, 'user_notifications'), notificationData);
}

/**
 * 店舗にスタッフ追加通知を送信
 */
async function sendStaffAddedNotification(application: ApplicationData, staffId: string) {
	const notificationData = {
		storeId: application.storeId,
		type: 'staff_added',
		title: 'スタッフが追加されました',
		message: `${application.applicantName}さんがスタッフとして登録されました`,
		staffName: application.applicantName,
		staffId: staffId,
		createdAt: Timestamp.now(),
		read: false
	};

	await addDoc(collection(db, 'notifications'), notificationData);
}

/**
 * 応募を不採用にする
 */
export async function rejectApplication(applicationId: string): Promise<void> {
	try {
		const applicationRef = doc(db, 'applications', applicationId);
		await updateDoc(applicationRef, {
			status: 'rejected',
			rejectedDate: Timestamp.now(),
			updatedAt: serverTimestamp()
		});

		// 不採用通知を送信（実装は省略）
		console.log('不採用処理完了:', applicationId);
	} catch (error) {
		console.error('不採用処理に失敗しました:', error);
		throw error;
	}
}

/**
 * 面接予定を設定
 */
export async function scheduleInterview(
	applicationId: string, 
	interviewDate: Date
): Promise<void> {
	try {
		const applicationRef = doc(db, 'applications', applicationId);
		await updateDoc(applicationRef, {
			status: 'interview_scheduled',
			interviewDate: Timestamp.fromDate(interviewDate),
			updatedAt: serverTimestamp()
		});

		// 面接予定通知を送信（実装は省略）
		console.log('面接予定を設定:', applicationId, interviewDate);
	} catch (error) {
		console.error('面接予定の設定に失敗しました:', error);
		throw error;
	}
}
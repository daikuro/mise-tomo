import { writable, derived } from 'svelte/store';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '$lib/firebase/config';
import type { User } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'jobseeker' | 'employer' | 'both';
  createdAt: Date;
  updatedAt: Date;
  // 求職者情報
  seekerProfile?: {
    skills: string[];
    experience: string;
    preferredLocations: string[];
    availability: string;
  };
  // 雇用主情報
  employerProfile?: {
    companyName: string;
    industry: string;
    location: string;
    description: string;
  };
}

export const userProfile = writable<UserProfile | null>(null);
export const profileLoading = writable(false);

// ユーザープロファイルの取得
export async function fetchUserProfile(user: User): Promise<UserProfile | null> {
  profileLoading.set(true);
  try {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const profile = docSnap.data() as UserProfile;
      userProfile.set(profile);
      return profile;
    } else {
      // 新規ユーザーの場合、初期プロファイルを作成
      const newProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || 'ユーザー',
        photoURL: user.photoURL || undefined,
        role: 'jobseeker',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await setDoc(docRef, newProfile);
      userProfile.set(newProfile);
      return newProfile;
    }
  } catch (error) {
    console.error('プロファイル取得エラー:', error);
    return null;
  } finally {
    profileLoading.set(false);
  }
}

// プロファイルの更新
export async function updateUserProfile(uid: string, updates: Partial<UserProfile>) {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date()
    });
    
    const currentProfile = await fetchUserProfile({ uid } as User);
    return currentProfile;
  } catch (error) {
    console.error('プロファイル更新エラー:', error);
    throw error;
  }
}
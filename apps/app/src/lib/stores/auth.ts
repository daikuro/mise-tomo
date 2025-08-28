import { writable, derived } from 'svelte/store';
import type { User } from 'firebase/auth';
import { auth } from '@misetomo/shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { browser } from '$app/environment';

// 認証状態のストア
export const user = writable<User | null>(null);
export const authInitialized = writable(false);

// 認証状態の監視
if (browser) {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.set(firebaseUser);
    authInitialized.set(true);
  });
}

// ユーザーがログイン済みかどうか
export const isLoggedIn = derived(user, ($user) => !!$user);
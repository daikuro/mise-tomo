import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyBQrX2poVhT4POZQ6FWRGhHX7Hnz8SLvwU",
	authDomain: "misetomo.firebaseapp.com",
	projectId: "misetomo",
	storageBucket: "misetomo.firebasestorage.app",
	messagingSenderId: "1033803981044",
	appId: "1:1033803981044:web:app"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
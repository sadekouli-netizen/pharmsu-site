'use client';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { appEnv } from './env';
const app = getApps().length ? getApps()[0] : initializeApp(appEnv.firebase as any);
export const clientAuth = getAuth(app);
export const clientDb = getFirestore(app);

import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { appEnv } from './env';
const app = getApps().length ? getApps()[0] : initializeApp({ credential: cert({ projectId: appEnv.serviceAccount.projectId, clientEmail: appEnv.serviceAccount.clientEmail, privateKey: appEnv.serviceAccount.privateKey }) });
export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);

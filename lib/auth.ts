import { cookies } from 'next/headers';
import { adminAuth, adminDb } from './firebase.admin';
import { appEnv } from './env';
export const getCurrentUser = async () => {
  const token = (await cookies()).get('pharmsu_session')?.value;
  if (!token) return null;
  const decoded = await adminAuth.verifySessionCookie(token, true).catch(()=>null);
  if (!decoded) return null;
  const doc = await adminDb.collection('users').doc(decoded.uid).get();
  const profile = doc.exists ? doc.data() : null;
  return { uid: decoded.uid, email: decoded.email, role: profile?.role ?? (appEnv.adminEmails.includes(decoded.email ?? '') ? 'admin' : 'member'), profile };
};
export const ensureRole = async (roles: Array<'admin'|'member'>) => { const user = await getCurrentUser(); return user && roles.includes(user.role) ? user : null; };

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { adminAuth, adminDb } from '@/lib/firebase.admin';
import { appEnv } from '@/lib/env';
const schema=z.object({token:z.string().min(1),companyName:z.string().min(2),contactName:z.string().min(2),phone:z.string().min(6)});
export async function POST(request:Request){const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:parsed.error.flatten()},{status:400});const decoded=await adminAuth.verifyIdToken(parsed.data.token);const sessionCookie=await adminAuth.createSessionCookie(parsed.data.token,{expiresIn:1000*60*60*24*5});await adminDb.collection('users').doc(decoded.uid).set({uid:decoded.uid,email:decoded.email,companyName:parsed.data.companyName,contactName:parsed.data.contactName,phone:parsed.data.phone,role:appEnv.adminEmails.includes(decoded.email??'')?'admin':'member',createdAt:new Date().toISOString()},{merge:true});const response=NextResponse.json({ok:true});response.cookies.set('pharmsu_session',sessionCookie,{httpOnly:true,secure:true,sameSite:'lax',path:'/'});return response;}

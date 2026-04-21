import { NextResponse } from 'next/server';
import { z } from 'zod';
import { adminDb } from '@/lib/firebase.admin';
import { sendNotificationEmail } from '@/lib/email';
const schema=z.object({contactName:z.string().min(2),companyName:z.string().min(2),email:z.string().email(),phone:z.string().min(6),monthlyVolume:z.string().min(1),notes:z.string().optional().default('')});
export async function POST(request:Request){const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:parsed.error.flatten()},{status:400});const payload={...parsed.data,createdAt:new Date().toISOString(),status:'pending'};await adminDb.collection('membership_applications').add(payload);await sendNotificationEmail('New membership application - Pharmsu',[`Contact: ${payload.contactName}`,`Company: ${payload.companyName}`,`Email: ${payload.email}`,`Phone: ${payload.phone}`,`Monthly volume: ${payload.monthlyVolume}`,`Notes: ${payload.notes}`]);return NextResponse.json({ok:true});}

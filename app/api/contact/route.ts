import { NextResponse } from 'next/server';
import { z } from 'zod';
import { adminDb } from '@/lib/firebase.admin';
import { sendNotificationEmail } from '@/lib/email';
const schema=z.object({name:z.string().min(2),company:z.string().min(2),email:z.string().email(),phone:z.string().min(6),message:z.string().min(5)});
export async function POST(request:Request){const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:parsed.error.flatten()},{status:400});const payload={...parsed.data,createdAt:new Date().toISOString()};await adminDb.collection('contact_submissions').add(payload);await sendNotificationEmail('New contact submission - Pharmsu',[`Name: ${payload.name}`,`Company: ${payload.company}`,`Email: ${payload.email}`,`Phone: ${payload.phone}`,`Message: ${payload.message}`]);return NextResponse.json({ok:true});}

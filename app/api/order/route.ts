import { NextResponse } from 'next/server';
import { z } from 'zod';
import { adminDb } from '@/lib/firebase.admin';
import { sendNotificationEmail } from '@/lib/email';
const rowSchema=z.object({id:z.string(),name:z.string(),quantity:z.number().min(1),lineTotal:z.number().min(0)}).passthrough();
const schema=z.object({buyerName:z.string().min(2),companyName:z.string().min(2),email:z.string().email(),phone:z.string().min(6),deliveryAddress:z.string().min(5),notes:z.any().optional(),items:z.array(rowSchema).min(1),total:z.number().min(0)});
export async function POST(request:Request){const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:parsed.error.flatten()},{status:400});const payload={...parsed.data,createdAt:new Date().toISOString(),status:'new'};await adminDb.collection('orders').add(payload);await sendNotificationEmail('New wholesale order - Pharmsu',[`Buyer: ${payload.buyerName}`,`Company: ${payload.companyName}`,`Email: ${payload.email}`,`Phone: ${payload.phone}`,`Address: ${payload.deliveryAddress}`,`Total: $${payload.total.toFixed(2)}`,'Items:',...payload.items.map(i=>`- ${i.name} x ${i.quantity} = $${i.lineTotal.toFixed(2)}`),`Notes: ${String(payload.notes??'')}`]);return NextResponse.json({ok:true});}

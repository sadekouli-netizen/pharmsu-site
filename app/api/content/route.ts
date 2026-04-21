import { NextResponse } from 'next/server';
import { z } from 'zod';
import { adminDb } from '@/lib/firebase.admin';
import { defaultHomeSections } from '@/data/default-sections';
import { ensureRole } from '@/lib/auth';
const sectionSchema=z.object({id:z.string(),title:z.string(),subtitle:z.string(),body:z.string(),imageUrl:z.string().optional(),ctaText:z.string().optional(),ctaHref:z.string().optional(),visible:z.boolean(),order:z.number().int()});
export async function GET(){const doc=await adminDb.collection('site_content').doc('home').get();if(!doc.exists)return NextResponse.json({sections:defaultHomeSections});return NextResponse.json({sections:doc.data()?.sections??defaultHomeSections});}
export async function PUT(request:Request){const user=await ensureRole(['admin']);if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});const parsed=z.object({sections:z.array(sectionSchema).min(1)}).safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:parsed.error.flatten()},{status:400});await adminDb.collection('site_content').doc('home').set({sections:parsed.data.sections,updatedAt:new Date().toISOString(),updatedBy:user.uid},{merge:true});return NextResponse.json({ok:true});}

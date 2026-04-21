import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
export default async function MemberPage(){const user=await getCurrentUser();if(!user)return <div className='card' style={{padding:'1rem'}}><h1>Member Area</h1><p>Not logged in.</p><Link className='btn' href='/login'>Go to login</Link></div>;return <div className='card' style={{padding:'1rem'}}><h1>Member Area</h1><p><strong>Email:</strong> {user.email}</p><p><strong>Role:</strong> {user.role}</p></div>;}

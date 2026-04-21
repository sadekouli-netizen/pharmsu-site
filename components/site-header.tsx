'use client';
import Link from 'next/link';
import { useCart } from './cart-context';
export const SiteHeader=()=>{const {count}=useCart(); return <header className='header'><div className='container header-inner'><Link href='/'><strong>Pharmsu</strong></Link><nav className='nav'><Link href='/products'>Products</Link><Link href='/membership'>Membership</Link><Link href='/contact'>Contact</Link><Link href='/member'>Member</Link><Link href='/admin'>Admin</Link><Link href='/cart'>Cart ({count})</Link></nav></div></header>;};

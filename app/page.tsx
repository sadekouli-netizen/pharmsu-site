import Link from 'next/link';
import { HomeSections } from '@/components/home-sections';
import { productCategories } from '@/data/products';
export default function Home(){return <><HomeSections/><section className='card section' style={{padding:'1rem'}}><h3>Featured categories</h3><div className='grid grid-3'>{productCategories.map(c=><div className='card' key={c} style={{padding:'1rem'}}><h4>{c}</h4><p className='small'>Wholesale-ready products.</p><Link className='btn secondary' href={`/products?category=${encodeURIComponent(c)}`}>View {c}</Link></div>)}</div></section></>;}

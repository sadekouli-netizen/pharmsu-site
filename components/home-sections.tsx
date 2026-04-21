'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { defaultHomeSections } from '@/data/default-sections';
import { HomeSection } from '@/types';
export const HomeSections=()=>{const [sections,setSections]=useState<HomeSection[]>(defaultHomeSections);useEffect(()=>{fetch('/api/content').then(r=>r.json()).then(d=>d.sections?.length&&setSections(d.sections)).catch(()=>undefined);},[]);return <>{sections.filter(s=>s.visible).sort((a,b)=>a.order-b.order).map(s=><section key={s.id} className={`section ${s.id==='hero'?'hero':'card'}`} style={{padding:'1.2rem'}}><p className='small'>{s.subtitle}</p><h2>{s.title}</h2><p>{s.body}</p>{s.ctaText&&s.ctaHref?<Link className='btn' href={s.ctaHref}>{s.ctaText}</Link>:null}</section>)}</>;};

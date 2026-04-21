'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CartItem } from '@/types';
const Ctx = createContext<any>(null);
export const CartProvider = ({children}:{children:React.ReactNode}) => {
 const [items,setItems]=useState<CartItem[]>([]);
 useEffect(()=>{const raw=localStorage.getItem('pharmsu_cart'); if(raw) setItems(JSON.parse(raw));},[]);
 useEffect(()=>{localStorage.setItem('pharmsu_cart',JSON.stringify(items));},[items]);
 const value = useMemo(()=>({items,count:items.reduce((a,b)=>a+b.quantity,0),addItem:(id:string,q:number)=>setItems(c=>{const e=c.find(x=>x.productId===id);return e?c.map(x=>x.productId===id?{...x,quantity:x.quantity+q}:x):[...c,{productId:id,quantity:q}] }),updateQty:(id:string,q:number)=>setItems(c=>c.map(x=>x.productId===id?{...x,quantity:Math.max(1,q)}:x)),removeItem:(id:string)=>setItems(c=>c.filter(x=>x.productId!==id)),clearCart:()=>setItems([])}),[items]);
 return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
export const useCart=()=>{const c=useContext(Ctx); if(!c) throw new Error('useCart within provider'); return c;};

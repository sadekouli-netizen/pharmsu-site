'use client';
import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { clientAuth } from '@/lib/firebase.client';
const Ctx=createContext<{user:User|null;loading:boolean}>({user:null,loading:true});
export const AuthProvider=({children}:{children:React.ReactNode})=>{const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);useEffect(()=>onAuthStateChanged(clientAuth,u=>{setUser(u);setLoading(false);}),[]);return <Ctx.Provider value={{user,loading}}>{children}</Ctx.Provider>;};
export const useAuth=()=>useContext(Ctx);

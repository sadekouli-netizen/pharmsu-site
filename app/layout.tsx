import './globals.css';
import { AuthProvider } from '@/components/auth-context';
import { CartProvider } from '@/components/cart-context';
import { SiteHeader } from '@/components/site-header';
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang='en'><body><AuthProvider><CartProvider><SiteHeader/><main><div className='container' style={{padding:'1.5rem 0'}}>{children}</div></main><footer className='footer'><div className='container small'>© {new Date().getFullYear()} Pharmsu</div></footer></CartProvider></AuthProvider></body></html>;}

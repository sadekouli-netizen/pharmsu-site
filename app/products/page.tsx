import { ProductsList } from '@/components/products-list';
export default async function ProductsPage({searchParams}:{searchParams:Promise<{category?:string}>}){const params=await searchParams;return <><h1>Products</h1><p className='small'>Browse wholesale pharmacy categories.</p><ProductsList initialCategory={params.category}/></>;}

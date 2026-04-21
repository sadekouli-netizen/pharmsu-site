import { Product } from '@/types';
export const products: Product[] = [
{id:'v1',name:'Amber Vial 13 Dram',category:'Vials',sku:'PH-V13',price:24,minQty:100,unit:'case',description:'Child-resistant cap included.'},
{id:'v2',name:'Amber Vial 30 Dram',category:'Vials',sku:'PH-V30',price:36,minQty:100,unit:'case',description:'High-clarity amber vial.'},
{id:'b1',name:'RX Bag White',category:'Rx Bags',sku:'PH-RXB',price:18,minQty:250,unit:'bundle',description:'Professional pharmacy bag.'},
{id:'bt1',name:'Liquid Bottle 8oz',category:'Bottles',sku:'PH-B8',price:42,minQty:50,unit:'case',description:'Leak-resistant bottle.'}
];
export const productCategories = Array.from(new Set(products.map(p=>p.category)));

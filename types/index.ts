export type Product = { id: string; name: string; category: string; sku: string; price: number; minQty: number; unit: string; description: string; };
export type CartItem = { productId: string; quantity: number };
export type Role = 'admin' | 'member';
export type HomeSection = { id: string; title: string; subtitle: string; body: string; imageUrl?: string; ctaText?: string; ctaHref?: string; visible: boolean; order: number; };

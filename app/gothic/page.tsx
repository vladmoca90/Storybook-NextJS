import type { Metadata } from 'next';
import GothicShop from './GothicShop';

export const metadata: Metadata = { title: 'NOCTURNE — For your darker side', description: 'Gothic clothing, Halloween costumes and accessories for the beautifully strange.' };
export default function GothicPage() { return <GothicShop />; }

import type { Metadata } from 'next';
import './styles.css';
import { Header, Footer } from './ui';
export const metadata: Metadata = { title: { default: 'Jane Wears — The Living Atelier', template: '%s | Jane Wears' }, description: 'Nigerian fashion design and bespoke tailoring. Designed to express. Tailored to belong.' };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><Header/>{children}<Footer/></body></html> }

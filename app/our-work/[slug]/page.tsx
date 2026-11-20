import { looks } from '../../data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
export function generateStaticParams(){return looks.map(l=>({slug:l.slug}))}
export default async function Detail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const l=looks.find(l=>l.slug===slug);if(!l)notFound();return <main id="main" className="detail section"><img src={'/images/'+l.image} alt={l.description}/><div><Link className="text-link" href="/our-work">Back to lookbook</Link><span className="eyebrow">{l.category}</span><h1>{l.title}</h1><p>{l.description}</p><p className="notice">Style inspiration · Photography by {l.credit}. This is not a Jane Wears garment. Fabric specifications and additional photographs are not supplied.</p><Link className="button dark" href={'/request?look='+encodeURIComponent(l.title)}>Request a Similar Design ↗</Link></div></main>}

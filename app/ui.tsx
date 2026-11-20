'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { looks, categories } from './data';
export function Header(){const [open,setOpen]=useState(false);const path=usePathname();useEffect(()=>setOpen(false),[path]);return <header className="header"><Link className="logo" href="/"><img src="/jane-wears-mark.svg?v=2" alt="" className="logo-mark" width={46} height={46}/>JANE WEARS<span>THE LIVING ATELIER</span></Link><button className="menu-toggle" aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}>{open?'Close':'Menu'}</button><nav id="navigation" className={open?'open':''} aria-label="Main navigation">{[['/','Home'],['/our-work','Our Work'],['/services','Services'],['/contact','Contact']].map(([href,label])=><Link key={href} href={href} aria-current={path===href?'page':undefined}>{label}</Link>)}</nav><Link className="nav-cta" href="/appointment">Book Appointment <span>↗</span></Link></header>}
export function Footer(){return <footer><div className="footer-top"><Link className="logo" href="/"><img src="/jane-wears-mark.svg?v=2" alt="" className="logo-mark" width={46} height={46}/>JANE WEARS<span>DESIGNED TO EXPRESS. TAILORED TO BELONG.</span></Link><p>A Nigerian fashion studio.<br/>An expression of you.</p><div><Link href="/our-work">Our Work</Link><Link href="/services">Services</Link></div><div><Link href="/request">Request an Outfit</Link><Link href="/appointment">Book a Consultation</Link><Link href="/contact">Contact</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Jane Wears</span><span>Hero: AI editorial concept. Lookbook: credited style inspiration.</span><Link href="/credits">Image credits</Link></div></footer>}
export function MotionRoot({children}:{children:React.ReactNode}){const ref=useRef<HTMLDivElement>(null);useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const ctx=gsap.context(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;gsap.from('.hero-wordmark',{y:50,opacity:0,duration:1.3,ease:'power3.out'});gsap.from('.hero-model',{opacity:0,y:24,duration:1.2,delay:.15});gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>gsap.from(el,{y:30,opacity:0,duration:.85,scrollTrigger:{trigger:el,start:'top 92%',once:true}}));},ref);return()=>ctx.revert()},[]);return <div ref={ref}>{children}</div>}
export function Hero(){const ref=useRef<HTMLElement>(null);return <section className="hero" ref={ref} onPointerMove={e=>{if(!matchMedia('(min-width: 1000px) and (prefers-reduced-motion: no-preference)').matches)return;ref.current?.style.setProperty('--drift',`${(e.clientX/innerWidth-.5)*8}px`)}} onPointerLeave={()=>ref.current?.style.setProperty('--drift','0px')}><div className="hero-topline"><span>FASHION DESIGN & BESPOKE TAILORING</span><span>ROOTED IN CULTURE. MADE FOR YOU.</span></div><h1 className="hero-wordmark">JANE WEARS</h1><img className="hero-model" src="/images/hero-model-v2.png" alt="Editorial concept: a Nigerian model lifting a sweeping magenta and green Ankara gown" fetchPriority="high"/><div className="hero-copy"><span className="eyebrow">THE LIVING ATELIER</span><h2>Designed to express.<br/><em>Tailored to belong.</em></h2><Link className="button dark" href="/our-work">Explore Our Work <span>↗</span></Link><Link className="text-link" href="/appointment">Book a Consultation</Link></div><div className="hero-note"><span>AN EXPRESSION<br/>OF YOUR OWN.</span><p>Thoughtfully designed.<br/>Beautifully made.<br/>Unmistakably you.</p></div><div className="hero-bottom"><span>SCROLL TO DISCOVER</span><span className="thin-line"/><span>EDITORIAL CONCEPT</span></div></section>}
export function Collections(){
  const [active,setActive]=useState(0);
  const [playing,setPlaying]=useState(true);
  const [visible,setVisible]=useState(false);
  const section=useRef<HTMLElement>(null);
  useEffect(()=>{
    const node=section.current;
    if(!node)return;
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.35});
    observer.observe(node);
    return()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    if(!playing||!visible||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const timer=window.setInterval(()=>setActive(index=>(index+1)%categories.length),6000);
    return()=>window.clearInterval(timer);
  },[active,playing,visible]);
  const look=looks.find(item=>item.category===categories[active])!;
  const select=(index:number)=>setActive((index+categories.length)%categories.length);
  return <section className="collections section" ref={section} aria-label="Explore outfit styles">
    <div className="collection-copy">
      <span className="eyebrow">EXPLORE THE POSSIBILITIES</span>
      <h2>A world of<br/><em>expression.</em></h2>
      <p className="collection-intro">There is more than one way to make a look your own. Explore silhouettes, prints, and occasion dressing.</p>
      <div className="collection-tabs" aria-label="Choose a style">
        {categories.map((category,index)=><button key={category} aria-pressed={index===active} onClick={()=>select(index)}>
          <span className="collection-tab-index">0{index+1}</span>{category}<span className="collection-tab-mark" aria-hidden="true">{index===active?'●':'+'}</span>
        </button>)}
      </div>
      <p className="collection-description" aria-live="polite">{look.description}</p>
      <Link className="text-link" href={'/our-work?category='+encodeURIComponent(look.category)}>Explore this collection ↗</Link>
    </div>
    <div className="collection-visual">
      <div className="collection-photo">
        {looks.map(item=>{const selected=item.category===categories[active];return <img key={item.slug} src={'/images/'+item.image} alt={selected?item.description:''} aria-hidden={!selected} className={selected?'is-active':''} loading="lazy"/>})}
        <div className="collection-image-label" aria-hidden="true"><span>STYLE INSPIRATION</span><strong>{look.title}</strong></div>
      </div>
      <div className="collection-controls">
        <span className="collection-count" aria-label={`Look ${active+1} of ${categories.length}`}>0{active+1} <span>/</span> 0{categories.length}</span>
        <div className="collection-progress" aria-hidden="true">{categories.map((category,index)=><span key={category} className={index===active?'is-active':''}/>)}</div>
        <div className="collection-control-buttons">
          <button type="button" onClick={()=>select(active-1)} aria-label="Previous style">←</button>
          <button type="button" onClick={()=>select(active+1)} aria-label="Next style">→</button>
          <button type="button" onClick={()=>setPlaying(!playing)} aria-label={playing?'Pause slideshow':'Play slideshow'} aria-pressed={!playing}>{playing?'Ⅱ':'▶'}</button>
        </div>
      </div>
      <p className="collection-credit">STYLE INSPIRATION · PHOTO BY {look.credit}</p>
    </div>
  </section>
}
export function Gallery({preview=false}:{preview?:boolean}){
  const [filter,setFilter]=useState('All');
  const [query,setQuery]=useState('');
  useEffect(()=>{
    if(preview)return;
    const category=new URLSearchParams(location.search).get('category');
    if(category&&categories.includes(category))setFilter(category);
  },[preview]);
  const search=query.trim().toLocaleLowerCase();
  const matching=looks.filter(look=>(filter==='All'||look.category===filter)&&(
    !search||[look.title,look.category,look.description].some(value=>value.toLocaleLowerCase().includes(search))
  ));
  const shown=preview?matching.slice(0,3):matching;
  return <>
    {!preview&&<div className="gallery-search">
      <label htmlFor="look-search">Find a style</label>
      <div className="gallery-search-field">
        <input id="look-search" type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search styles, outfits, and details" autoComplete="off"/>
        <span aria-hidden="true">⌕</span>
      </div>
      <p role="status">{matching.length} {matching.length===1?'look':'looks'} found</p>
    </div>}
    <div className="filters" aria-label="Filter inspiration">{['All',...categories].map(category=><button key={category} aria-pressed={filter===category} onClick={()=>setFilter(category)}>{category}</button>)}</div>
    {shown.length>0?<div className="lookbook">{shown.map((look,index)=><Link className={'look look-'+index} key={look.slug} href={'/our-work/'+look.slug}><div><img src={'/images/'+look.image} alt={look.description} loading="lazy"/><span className="look-open">Explore the look ↗</span></div><p><span>{look.title}</span><small>{look.category}</small></p></Link>)}</div>:<div className="gallery-empty"><h2>No looks found.</h2><p>Try another search or browse all styles.</p><button type="button" className="text-link" onClick={()=>{setQuery('');setFilter('All')}}>Show all looks ↗</button></div>}
  </>;
}
export function Closing(){return <section className="closing"><span className="eyebrow">YOUR NEXT CHAPTER, BEAUTIFULLY TAILORED.</span><h2>MADE <em>FOR</em> YOU.</h2><p>Your next favorite outfit begins with a conversation.</p><Link className="button light" href="/request">Let’s Create Something ↗</Link></section>}
export function Process(){return <section className="process section"><div data-reveal><span className="eyebrow">THE BESPOKE JOURNEY</span><h2>From fabric<br/><em>to form.</em></h2><p>A thoughtful process.<br/>A piece that feels entirely yours.</p><Link className="text-link" href="/request">Begin your story ↗</Link><div className="process-gallery">{[["process-sketch.png","Fashion design sketch for an Ankara gown","The idea"],["process-fabric.png","Ankara fabric, scissors and dressmaking tools","The fabric"],["process-finished.png","Finished Ankara outfit worn by a model","The form"]].map(([image,alt,label])=><figure key={image}><img src={"/images/"+image} alt={alt} loading="lazy"/><figcaption>{label}</figcaption></figure>)}</div></div><div className="process-steps">{[['The idea','A conversation about your inspiration, your occasion, and how you want to feel.'],['The fabric','Explore the colors, textures, and prints that bring your vision into focus.'],['The craft','Measurements, pattern cutting, and considered construction give your idea its shape.'],['The final fit','The finishing touches. A considered fit. A creation that belongs to you.']].map(([title,copy],i)=><article data-reveal key={title}><span className="step-number">0{i+1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>}

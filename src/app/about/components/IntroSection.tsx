"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './IntroSection.css';

export default function IntroSection() {
  const toSplitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toSplitRef.current) return;

    const toSplit = toSplitRef.current;
    const content = toSplit.innerText;
    const contentLength = content.length;

    const PPC = 10; // Pixels per character
    const BUFFER = 40;

    document.documentElement.style.setProperty('--buffer', BUFFER.toString());
    document.documentElement.style.setProperty('--ppc', PPC.toString());
    document.documentElement.style.setProperty('--pad', '8');
    document.documentElement.style.setProperty('--content-length', (contentLength + 2).toString());

    const words = toSplit.innerText.split(' ');
    toSplit.innerHTML = '';
    
    let cumulation = 10;
    words.forEach((word, index) => {
      const text = Object.assign(document.createElement('span'), {
        innerHTML: `<span>${word} </span>`,
        style: `
          --index: ${index};
          --start: ${cumulation};
          --end: ${cumulation + word.length};
        `,
      });
      text.dataset.index = index.toString();
      text.dataset.start = cumulation.toString();
      text.dataset.end = (cumulation + word.length).toString();
      cumulation += word.length + 1;
      toSplit.appendChild(text);
    });

    // GSAP ScrollTrigger 추가
    if (!CSS.supports('animation-timeline: scroll()')) {
      gsap.registerPlugin(ScrollTrigger);
      console.info('GSAP ScrollTrigger: Registered');
      
      // Animate the words
      for (const word of toSplit.children) {
        const wordElement = word as HTMLElement;
        gsap.fromTo(
          wordElement,
          {
            '--active': 0,
          },
          {
            '--active': 1,
            ease: 'steps(1)',
            scrollTrigger: {
              trigger: '.reader',
              start: `top top-=${parseInt(wordElement.dataset.start!) * PPC}px`,
              end: `top top-=${parseInt(wordElement.dataset.end!) * PPC}px`,
              scrub: true,
            },
          }
        );
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* 타이틀 섹션 */}
      <div className="flex items-start justify-center pt-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 
            className="font-black text-white mb-6"
            style={{
              fontSize: '100px',
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 900,
            }}
          >
            WE OWN IT!
          </h1>
          
          <div
            className="h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-full mx-auto"
            style={{ width: "200px" }}
          />
        </div>
      </div>

      {/* 스크롤 애니메이션 섹션 */}
      <section className="reader relative" id="read">
        <div className="content">
          <div className="sr-only">
            We take responsibility for everything we do and think of every result we create as our own.
          </div>
          <div 
            ref={toSplitRef}
            data-split 
            aria-hidden="true"
            className="text-7xl md:text-8xl font-semibold text-white"
          >
            We take responsibility for everything we do and think of every result we create as our own.
          </div>
        </div>
      </section>


    </div>
  );
} 
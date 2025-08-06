'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { gsap } from 'gsap';

export default function ContactCard({ style }: { style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const bounds = cardRef.current!.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    gsap.killTweensOf([overlayRef.current, infoRef.current]);

    gsap.set(overlayRef.current, {
      clipPath: `circle(0% at ${x}px ${y}px)`,
      opacity: 1,
    });

    gsap.to(overlayRef.current, {
      clipPath: `circle(150% at ${x}px ${y}px)`,
      duration: 0.8,
      ease: 'power2.out',
    });

    gsap.to(infoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.1,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(infoRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.in',
    });

    gsap.to(overlayRef.current, {
      clipPath: `circle(0% at 50% 50%)`,
      duration: 0.7,
      delay: 0.2,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(overlayRef.current, { opacity: 0 });
      },
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden group rounded-2xl shadow-2xl cursor-pointer"
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-0 right-0 p-4 z-10 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
        <span
          className="text-3xl font-semibold text-white"
          style={{ fontFamily: 'Red Hat Display' }}
        >
          Contact Us
        </span>
      </div>
      <Image
        src="/contact_us_image2.jpg"
        alt="Contact Background"
        fill
        className="object-cover"
        aria-hidden="true"
      />

      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 bg-black/60 backdrop-blur-md opacity-0 pointer-events-none"
        style={{
          clipPath: 'circle(0% at 50% 50%)',
        }}
      />

      <div
        ref={infoRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center text-white opacity-0"
        style={{ transform: 'translateY(20px)' }}
      >
        <h3 className="text-4xl font-bold tracking-widest mb-5 font-sans">CONTACT</h3>
        <div className="space-y-1 text-xl font-light text-center tracking-wide leading-snug font-sans opacity-90">
          <p>contact@znit.co.kr</p>
          <p>032-1234-5678</p>
        </div>
      </div>
    </div>
  );
}
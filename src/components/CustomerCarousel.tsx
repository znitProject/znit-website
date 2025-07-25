
"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

const CUSTOMERS = [
  { src: "/customerLogo/MISLogo.png", alt: "행정안전부" },
  { src: "/customerLogo/ajouUniLogo.png", alt: "Ajou University" },
  { src: "/customerLogo/ITSKLogo.png", alt: "ITSK" },
  { src: "/customerLogo/KICTLogo.png", alt: "KICT" },
  { src: "/customerLogo/KTLogo.png", alt: "KT" },
  { src: "/customerLogo/MyoungJIUniLogo.jpg", alt: "Myongji University" },
  { src: "/customerLogo/SeoulCityLogo.png", alt: "Seoul City" },
  { src: "/customerLogo/skLogo.png", alt: "SK" },
  { src: "/customerLogo/TheSeoulInstituteLogo.svg", alt: "The Seoul Institute" },  
];

export default function CustomerCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate the items for a seamless loop
    const items = Array.from(track.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });

    const totalWidth = track.scrollWidth / 2;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalWidth,
        duration: 30, // Speed can be adjusted here
        ease: "linear",
        repeat: -1,
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden h-24 rounded-2xl border border-neutral-500 shadow-[inset_0_0_0.5px_rgba(0,0,0,0.08)] bg-gradient-to-r from-white via-slate-50 to-white"
      style={{ gridArea: "customer" }}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap gap-16 px-8 h-full items-center"
      >
        {CUSTOMERS.map((customer, index) => (
          <div
            key={index}
            className="carousel-item flex-shrink-0 flex items-center justify-center"
          >
            <Image
              src={customer.src}
              alt={customer.alt}
              width={150} // Increased width for better scaling
              height={40} // Fixed height
              className="object-contain h-10 w-auto" // h-10 ensures consistent height
            />
          </div>
        ))}
      </div>
    </div>
  );
}

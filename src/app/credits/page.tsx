"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CreditItem {
  title: string;
  author: string;
  url: string;
}

const credits: CreditItem[] = [
  {
    title: "Nixie Tube Clock",
    author: "@RAFA3L",
    url: "https://codepen.io/RAFA3L/pen/PoVYoPN"
  },
  {
    title: "Animated Hover Disclosures",
    author: "@jh3y",
    url: "https://codepen.io/jh3y/pen/XJWNMOO"
  },
  {
    title: "Hero Mask Reveal (Suz Sirunyan's design) / Filter version",
    author: "@wodniack",
    url: "https://codepen.io/wodniack/pen/qEWRvVW"
  },
  {
    title: "Geometric Globe Animation",
    author: "@fsadf",
    url: "https://codepen.io/fsadf/pen/WNmKRYd"
  },
  {
    title: "SVG Wave Mask (scroll up/down)",
    author: "@creativeocean",
    url: "https://codepen.io/creativeocean/pen/poyNVbo"
  },
  {
    title: "Waves",
    author: "@Mamboleoo",
    url: "https://codepen.io/Mamboleoo/pen/JjojgWw"
  },
  {
    title: "Skewed title text",
    author: "@paulnoble",
    url: "https://codepen.io/paulnoble/pen/OPXBzB"
  },
];

export default function CreditsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade in animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );

      // Simple cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
              delay: 0.1 + index * 0.05,
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white"
    >
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4"
          >
            Credits
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            오픈소스 코드와 영감을 준 작품들에 감사드립니다.
          </p>
        </div>

        {/* Credits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {credits.map((credit, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="group border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {credit.title}
              </h3>
                
              <div className="text-sm text-gray-600 mb-4">
                {credit.author}
              </div>

              <a
                href={credit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Link
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
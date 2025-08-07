"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import React from "react";

interface CarouselItem {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  color: string;
}

interface Carousel3DProps {
  items: CarouselItem[];
}



export default function Carousel3D({ items }: Carousel3DProps) {
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(0);
  const [lastMouseY, setLastMouseY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Enhanced scroll animations
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.7]);

  // Responsive settings
  const [radius, setRadius] = useState(380);
  const [cardWidth, setCardWidth] = useState(288);
  const [cardHeight, setCardHeight] = useState(224);
  const [perspective, setPerspective] = useState(900);
  const angleStep = 360 / items.length;

  // Enhanced GSAP 3D orbital animation
  useEffect(() => {
    if (!carouselRef.current || !isVisible) return;

    const tl = gsap.timeline({ repeat: -1 });
    
    // Create smooth orbital motion
    tl.to(carouselRef.current, {
      rotationY: "+=360",
      duration: 20,
      ease: "none",
    });

    return () => {
      tl.kill();
    };
  }, [isVisible]);

  // Responsive and visibility setup
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRadius(280);
        setPerspective(700);
        setCardWidth(224); // w-56
        setCardHeight(160); // h-40
      } else if (window.innerWidth < 1024) {
        setRadius(330);
        setPerspective(800);
        setCardWidth(256); // w-64
        setCardHeight(192); // h-48
      } else {
        setRadius(380);
        setPerspective(900);
        setCardWidth(288); // w-72
        setCardHeight(224); // h-56
      }
    };

    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Enhanced mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;

      if (!isDragging) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const normalizedX = (mouseEvent.clientX - centerX) / centerX;
        const normalizedY = (mouseEvent.clientY - centerY) / centerY;

        setMouseX((prev) => prev * 0.8 + normalizedX * 0.2);
        setMouseY((prev) => prev * 0.8 + normalizedY * 0.2);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isDragging]);

  // Enhanced interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouseX(e.clientX);
    setLastMouseY(e.clientY);
    document.body.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMouseX;
    const deltaY = e.clientY - lastMouseY;

    setRotationY((prev: number) => prev + deltaX * 0.6);
    setRotationX((prev: number) => {
      const newRotation = prev - deltaY * 0.4;
      return Math.max(-60, Math.min(60, newRotation));
    });

    setLastMouseX(e.clientX);
    setLastMouseY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setRotationX(0);
    document.body.style.cursor = "grab";
  };

  // Hopeful and modern card styles for career page
  const getHopefulCardStyle = (index: number) => {
    const colors = [
      { 
        bg: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(99,102,241,0.05) 100%)", 
        border: "rgba(59,130,246,0.6)", 
        glow: "rgba(59,130,246,0.4)", 
        accent: "#3b82f6",
        shadow: "rgba(59,130,246,0.15)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(59,130,246,0.1)"
        }
      },
      { 
        bg: "linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(5,150,105,0.05) 100%)", 
        border: "rgba(16,185,129,0.6)", 
        glow: "rgba(16,185,129,0.4)", 
        accent: "#10b981",
        shadow: "rgba(16,185,129,0.15)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(16,185,129,0.1)"
        }
      },
      { 
        bg: "linear-gradient(135deg, rgba(245,101,101,0.1) 0%, rgba(251,113,133,0.05) 100%)", 
        border: "rgba(245,101,101,0.6)", 
        glow: "rgba(245,101,101,0.4)", 
        accent: "#f56565",
        shadow: "rgba(245,101,101,0.15)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(245,101,101,0.1)"
        }
      },
      { 
        bg: "linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(147,51,234,0.05) 100%)", 
        border: "rgba(168,85,247,0.6)", 
        glow: "rgba(168,85,247,0.4)", 
        accent: "#a855f7",
        shadow: "rgba(168,85,247,0.15)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(168,85,247,0.1)"
        }
      },
      { 
        bg: "linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(22,163,74,0.05) 100%)", 
        border: "rgba(34,197,94,0.6)", 
        glow: "rgba(34,197,94,0.4)", 
        accent: "#22c55e",
        shadow: "rgba(34,197,94,0.15)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(34,197,94,0.1)"
        }
      },
      { 
        bg: "linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(245,158,11,0.05) 100%)", 
        border: "rgba(251,191,36,0.6)", 
        glow: "rgba(251,191,36,0.4)", 
        accent: "#fbbf24",
        shadow: "rgba(251,191,36,0.15)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(251,191,36,0.1)"
        }
      },
    ];
    return colors[index % colors.length];
  };

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col items-center select-none carousel-container min-h-screen"
      style={{ 
        opacity, 
        scale,
        background: "linear-gradient(180deg, #1e293b 0%, #334155 30%, #475569 60%, #1e293b 100%)",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => {
        document.body.style.cursor = "grab";
      }}
      onMouseLeave={() => {
        handleMouseUp();
        document.body.style.cursor = "default";
      }}
    >
      {/* Enhanced 3D Carousel Container */}
      <div
        className="relative h-[220px] sm:h-[280px] lg:h-[320px] mb-2 sm:mb-3 lg:mb-4"
        style={{ perspective: `${perspective}px` }}
        onMouseDown={handleMouseDown}
      >
        <div
          ref={carouselRef}
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotationY + mouseX * 10}deg) rotateX(${rotationX + mouseY * 15}deg)`,
            transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >


          {items.map((item, index) => {
            const rotateY = index * angleStep;
            const cardStyle = getHopefulCardStyle(index);

            return (
              <div
                key={item.id}
                className="absolute w-56 sm:w-64 lg:w-72 h-40 sm:h-48 lg:h-56 z-0 group cursor-pointer transition-all duration-700 hover:scale-105 hover:-translate-y-2"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `translate(-50%, -50%) rotateY(${rotateY}deg) translateZ(${radius}px)`,
                  transformOrigin: "center center",
                  background: `linear-gradient(145deg, rgba(248,250,252,0.1), rgba(241,245,249,0.05))`,
                  clipPath: `polygon(15px 0%, calc(100% - 15px) 0%, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0% calc(100% - 15px), 0% 15px)`,
                  boxShadow: `
                    12px 12px 24px ${cardStyle.shadow},
                    -12px -12px 24px ${cardStyle.neumorphism.light},
                    inset 4px 4px 8px ${cardStyle.neumorphism.dark},
                    inset -4px -4px 8px ${cardStyle.neumorphism.light},
                    0 0 20px ${cardStyle.shadow}
                  `,
                  backdropFilter: "blur(25px) saturate(200%)",
                }}
                onClick={() => {}}
              >
                {/* Gradient Border Effect */}
                <div 
                  className="absolute inset-0 rounded-none"
                  style={{
                    background: `linear-gradient(45deg, ${cardStyle.accent}20, transparent 30%, transparent 70%, ${cardStyle.accent}20)`,
                    clipPath: `polygon(15px 0%, calc(100% - 15px) 0%, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0% calc(100% - 15px), 0% 15px)`,
                    zIndex: 1,
                    filter: `blur(1px)`,
                  }}
                />
                <div 
                  className="absolute inset-0.5 rounded-none"
                  style={{
                    background: `linear-gradient(145deg, rgba(248,250,252,0.1), rgba(241,245,249,0.05))`,
                    clipPath: `polygon(15px 0%, calc(100% - 15px) 0%, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0% calc(100% - 15px), 0% 15px)`,
                    zIndex: 2,
                  }}
                />
                {/* Enhanced Front Face */}
                <div className="w-full h-full flex flex-col justify-center items-center group-hover:opacity-0 transition-opacity duration-700 relative overflow-hidden z-10">
                  {/* Modern glass overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)`,
                      clipPath: `polygon(15px 0%, calc(100% - 15px) 0%, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0% calc(100% - 15px), 0% 15px)`,
                    }}
                  />
                  
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center px-6 sm:px-7 lg:px-8 py-4">
                    <div
                      className="text-base sm:text-lg lg:text-xl font-bold text-center leading-tight mb-2"
                      style={{ 
                        fontFamily: "var(--font-stylish)",
                        textShadow: `0 2px 8px rgba(0,0,0,0.3)`,
                        letterSpacing: "0.02em",
                        color: cardStyle.accent,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-sm sm:text-base font-medium text-center leading-tight"
                      style={{ 
                        fontFamily: "var(--font-red-hat-display)",
                        color: cardStyle.accent,
                        letterSpacing: "0.01em",
                        opacity: 0.9,
                      }}
                    >
                      {item.titleEn}
                    </div>
                  </div>
                  
                  {/* Bottom geometric accent */}
                  <div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 opacity-50"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${cardStyle.accent}, transparent)`,
                      clipPath: `polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)`,
                    }}
                  />
                </div>

                {/* Enhanced Back Face */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 z-10"
                  style={{
                    background: `linear-gradient(145deg, rgba(30,30,35,0.98) 0%, rgba(40,40,45,0.95) 100%)`,
                    backdropFilter: "blur(30px) saturate(180%)",
                    border: `2px solid ${cardStyle.border}`,
                    clipPath: `polygon(15px 0%, calc(100% - 15px) 0%, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0% calc(100% - 15px), 0% 15px)`,
                    boxShadow: `
                      inset 0 0 30px rgba(0,0,0,0.3),
                      0 0 40px ${cardStyle.glow},
                      inset 0 1px 2px rgba(255,255,255,0.03)
                    `,
                  }}
                >
                  {/* Content wrapper with geometric elements */}
                  <div className="text-center px-6 sm:px-7 py-4 relative">
                    
                    <p
                      className="text-sm sm:text-base lg:text-lg text-white leading-relaxed pt-6"
                      style={{ 
                        fontFamily: "var(--font-stylish)",
                        textShadow: `0 2px 8px rgba(0,0,0,0.4)`,
                        lineHeight: "1.6",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {item.description}
                    </p>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modern Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-2]">
        {/* Static gradient overlays only */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `
              radial-gradient(ellipse at 25% 25%, rgba(100,116,139,0.2) 0%, transparent 60%),
              radial-gradient(ellipse at 75% 75%, rgba(148,163,184,0.15) 0%, transparent 60%),
              linear-gradient(135deg, rgba(203,213,225,0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <style jsx>{`

        .carousel-container {
          background: linear-gradient(180deg, #0f172a 0%, #1e293b 30%, #0f172a 100%);
        }

        .carousel-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(100,116,139,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(148,163,184,0.06) 0%, transparent 50%),
            linear-gradient(135deg, rgba(203,213,225,0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: -1;
        }

        /* Enhanced scrollbar styling for modern theme */
        .carousel-container::-webkit-scrollbar {
          width: 6px;
        }

        .carousel-container::-webkit-scrollbar-track {
          background: rgba(30,41,59,0.3);
        }

        .carousel-container::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #64748b, #94a3b8);
          border-radius: 3px;
        }

        .carousel-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #94a3b8, #cbd5e1);
        }
      `}</style>
    </motion.div>
  );
}
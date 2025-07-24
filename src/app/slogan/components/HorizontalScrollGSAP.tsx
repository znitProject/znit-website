'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

const HorizontalScrollGSAP = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<LocomotiveScroll | null>(null);

  const sentences = [
    {
      text: "우리는 하나의 일을 깊이 있게, 꾸준히 해온 팀입니다.",
      color: "bg-blue-600/90"
    },
    {
      text: "흐름에 휩쓸리지 않고, 방향을 스스로 정하며 주체적으로 움직입니다.",
      color: "bg-purple-600/90"
    },
    {
      text: "변화에 앞서 준비하고, 새로움 속에서도 중심을 지킵니다.",
      color: "bg-green-600/90"
    },
    {
      text: "디자인은 우리의 언어이며, 완성도는 우리의 자존심입니다.",
      color: "bg-red-600/90"
    },
    {
      text: "오래도록, 멀리 보며, 제대로 만들어가는 팀.",
      color: "bg-indigo-600/90"
    },
    {
      text: "우리는 그렇게 일합니다.",
      color: "bg-teal-600/90"
    }
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // GSAP 플러그인 등록
    gsap.registerPlugin(ScrollTrigger);

    const pageContainer = containerRef.current;
    if (!pageContainer) return;

    // Locomotive Scroll 초기화
    const scroller = new LocomotiveScroll({
      el: pageContainer,
      smooth: true,
      multiplier: 1,
      lerp: 0.1
    });

    scrollerRef.current = scroller;

    scroller.on("scroll", ScrollTrigger.update);

    // ScrollTrigger 프록시 설정
    ScrollTrigger.scrollerProxy(pageContainer, {
      scrollTop(value) {
        return arguments.length
          ? scroller.scrollTo(value, 0, 0)
          : scroller.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      pinType: pageContainer.style.transform ? "transform" : "fixed"
    });

    // 페이지 로드 후 애니메이션 설정
    const initAnimation = () => {
      const pinWrap = pinWrapRef.current;
      if (!pinWrap) return;

      const pinWrapWidth = pinWrap.offsetWidth;
      const horizontalScrollLength = pinWrapWidth - window.innerWidth;

      // 가로 스크롤 애니메이션
      gsap.to(pinWrap, {
        scrollTrigger: {
          scroller: pageContainer,
          scrub: true,
          trigger: "#sectionPin",
          pin: true,
          start: "top top",
          end: pinWrapWidth
        },
        x: -horizontalScrollLength,
        ease: "none"
      });

      ScrollTrigger.addEventListener("refresh", () => scroller.update());
      ScrollTrigger.refresh();
    };

    // 페이지 로드 완료 후 애니메이션 초기화
    window.addEventListener("load", initAnimation);
    
    // 컴포넌트 마운트 후에도 실행
    setTimeout(initAnimation, 100);

    return () => {
      if (scrollerRef.current) {
        scrollerRef.current.destroy();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="container">
      {/* 첫 번째 섹션 */}
      <section className="min-h-screen w-full relative grid place-items-center bg-gradient-to-b from-blue-900 to-blue-800 p-12">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-blue-300 leading-tight">
            <span className="block">ZNIT의</span>
            <span className="block">철학</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-200">
            아래로 스크롤하여 더 알아보세요
          </p>
        </div>
      </section>

      {/* 가로 스크롤 섹션 */}
      <section id="sectionPin" className="h-screen overflow-hidden flex left-0 bg-black text-white">
        <div ref={pinWrapRef} className="pin-wrap h-screen flex justify-start items-center p-12">
          {sentences.map((sentence, index) => (
            <div
              key={index}
              className={`${sentence.color} backdrop-blur-sm min-w-[60vw] p-8 rounded-2xl flex flex-col items-center justify-center text-white border border-white/20 mx-4`}
            >
              <div className="text-center max-w-4xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed">
                  {sentence.text}
                </h2>
              </div>
              
              {/* 카드 번호 */}
              <div className="absolute top-6 right-6 text-white/50 text-sm font-mono">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 마지막 섹션 */}
      <section className="min-h-screen w-full relative grid place-items-center bg-gradient-to-b from-blue-800 to-blue-900 p-12">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-blue-300">
            다음 섹션으로
          </h2>
          <p className="text-xl md:text-2xl text-blue-200">
            계속 스크롤하세요
          </p>
        </div>
      </section>
    </div>
  );
};

export default HorizontalScrollGSAP; 
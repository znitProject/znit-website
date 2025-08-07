"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as d3 from "d3";
import { gsap } from "gsap";

export default function NetworkGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 스크롤 애니메이션
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 스크롤에 따른 다양한 애니메이션 효과
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.9]
  );
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);

  useEffect(() => {
    if (!svgRef.current) return;

    // 기존 SVG 내용 제거
    d3.select(svgRef.current).selectAll("*").remove();

    const svgElement = svgRef.current;
    // 노트북 사이즈에서 SVG 크기가 0이 되는 문제 방지
    const w = Math.max(svgElement?.clientWidth || 0, 800); // 최소 800px
    const h = Math.max(svgElement?.clientHeight || 0, 600); // 최소 600px
    
    // 크기가 여전히 작으면 부모 요소 크기 사용
    if (w < 100 || h < 100) {
      console.warn('SVG 크기가 너무 작습니다:', { w, h });
      return; // 애니메이션 설정하지 않음
    }
    const circleWidth = 12; // 기본 원형 크기 증가
    
    // GSAP 애니메이션을 위한 참조 저장
    const nodeElements: any[] = [];

    // 모던 미니멀 컬러 팔레트 정의
    const modernPalette = {
      primary: "#1F2937",     // 다크 그레이 (전체 페이지와 통일)
      secondary: "#3B82F6",   // 블루 (BenefitCard와 일관성)
      emerald: "#10B981",     // 에메랄드 (포인트 컬러)
      amber: "#F59E0B",       // 앰버 (포인트 컬러)
      purple: "#8B5CF6",      // 퍼플
      rose: "#F43F5E",        // 로즈
      violet: "#A855F7",      // 바이올렛
      neutral: "rgba(255,255,255,0.1)", // 글라스모피즘 효과
    };

    // 글라스모피즘 스타일 색상 팔레트
    const glassColors = [
      { 
        primary: "rgba(59, 130, 246, 0.08)",   // 블루
        accent: "rgba(59, 130, 246, 0.25)",
        border: "rgba(59, 130, 246, 0.4)",
        glow: "rgba(59, 130, 246, 0.6)"
      },
      { 
        primary: "rgba(16, 185, 129, 0.08)",   // 에메랄드
        accent: "rgba(16, 185, 129, 0.25)",
        border: "rgba(16, 185, 129, 0.4)",
        glow: "rgba(16, 185, 129, 0.6)"
      },
      { 
        primary: "rgba(245, 158, 11, 0.08)",   // 앰버
        accent: "rgba(245, 158, 11, 0.25)",
        border: "rgba(245, 158, 11, 0.4)",
        glow: "rgba(245, 158, 11, 0.6)"
      },
      { 
        primary: "rgba(139, 92, 246, 0.08)",   // 퍼플
        accent: "rgba(139, 92, 246, 0.25)",
        border: "rgba(139, 92, 246, 0.4)",
        glow: "rgba(139, 92, 246, 0.6)"
      },
      { 
        primary: "rgba(244, 63, 94, 0.08)",    // 로즈
        accent: "rgba(244, 63, 94, 0.25)",
        border: "rgba(244, 63, 94, 0.4)",
        glow: "rgba(244, 63, 94, 0.6)"
      },
      { 
        primary: "rgba(168, 85, 247, 0.08)",   // 바이올렛
        accent: "rgba(168, 85, 247, 0.25)",
        border: "rgba(168, 85, 247, 0.4)",
        glow: "rgba(168, 85, 247, 0.6)"
      }
    ];

    const nodes = [
      { 
        name: "WITH", 
        x: w / 2, 
        y: h / 2, 
        charge: -2000, 
        originalX: w / 2, 
        originalY: h / 2,
        gsapFloat: { speed: 0.5, radius: 15 }
      }, // 중앙 노드 - 강한 반발력
      {
        name: "변화에 대한 도전",
        target: [0], // with 노드에만 연결
        value: 58,
        x: w * 0.2,
        y: h * 0.3,
        charge: -1200,
        originalX: w * 0.2,
        originalY: h * 0.3,
        gsapFloat: { speed: 0.7, radius: 18 }
      },
      {
        name: "긍정적인 마인드",
        target: [0], // with 노드에만 연결
        value: 65,
        x: w * 0.8,
        y: h * 0.3,
        charge: -1000,
        originalX: w * 0.8,
        originalY: h * 0.3,
        gsapFloat: { speed: 0.6, radius: 16 }
      },
      {
        name: "지속적인 성장",
        target: [0], // with 노드에만 연결
        value: 52,
        x: w * 0.9,
        y: h * 0.7,
        charge: -800,
        originalX: w * 0.9,
        originalY: h * 0.7,
        gsapFloat: { speed: 0.8, radius: 20 }
      },
      {
        name: "창의적 사고",
        target: [0], // with 노드에만 연결
        value: 48,
        x: w * 0.85,
        y: h * 0.7,
        charge: -1500,
        originalX: w * 0.85,
        originalY: h * 0.7,
        gsapFloat: { speed: 0.55, radius: 14 }
      },
      {
        name: "책임감과 열정",
        target: [0], // with 노드에만 연결
        value: 40,
        x: w * 0.35,
        y: h * 0.15,
        charge: -600,
        originalX: w * 0.35,
        originalY: h * 0.15,
        gsapFloat: { speed: 0.65, radius: 17 }
      },
      {
        name: "팀워크 정신",
        target: [0], // with 노드에만 연결
        value: 52,
        x: w * 0.5,
        y: h * 0.85,
        charge: -1100,
        originalX: w * 0.5,
        originalY: h * 0.85,
        gsapFloat: { speed: 0.6, radius: 19 }
      },
    ];

    const links: any[] = [];

    for (let i = 0; i < nodes.length; i++) {
      if ((nodes[i] as any).target !== undefined) {
        for (let x = 0; x < (nodes[i] as any).target.length; x++) {
          links.push({
            source: nodes[i],
            target: nodes[(nodes[i] as any).target[x]],
          });
        }
      }
    }

    const svg = d3.select(svgRef.current);

    const force = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.name)
          .distance(250) // 링크 거리 증가
      )
      .force(
        "charge",
        d3.forceManyBody().strength((d: any) => d.charge || -1500)
      ) // 개별 노드 장력 사용
      .force("center", d3.forceCenter(w / 2, h / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d: any) => {
          if (d.value) {
            return circleWidth + d.value * 1.5 + 60; // 충돌 반경 증가
          } else {
            return circleWidth + 50 + 60;
          }
        })
      )
      .force("x", d3.forceX().strength(0.05)) // X축 중심력 감소 (GSAP 충돌 방지)
      .force("y", d3.forceY().strength(0.02)); // Y축 중심력 감소 (GSAP 충돌 방지)

    // 경계 제한 함수 (부드러운 제한으로 GSAP 애니메이션 보호)
    function constrainPosition(node: any) {
      const radius = node.value
        ? circleWidth + node.value * 1.5 + 60
        : circleWidth + 50 + 60;
      
      const margin = 20; // 여유 공간 추가
      
      // 부드러운 경계 제한 (GSAP 애니메이션 방해 방지)
      if (node.x < radius + margin) {
        node.x = Math.max(node.x, radius + margin);
        if (node.vx < 0) node.vx *= 0.8; // 속도 감소
      }
      if (node.x > w - radius - margin) {
        node.x = Math.min(node.x, w - radius - margin);
        if (node.vx > 0) node.vx *= 0.8;
      }
      if (node.y < radius + margin) {
        node.y = Math.max(node.y, radius + margin);
        if (node.vy < 0) node.vy *= 0.8;
      }
      if (node.y > h - radius - margin) {
        node.y = Math.min(node.y, h - radius - margin);
        if (node.vy > 0) node.vy *= 0.8;
      }
    }

    // 초기 위치 설정 - 가로로 더 넓게
    nodes.forEach((node: any, i: number) => {
      if (i > 0) {
        node.x = node.x || w * (0.1 + (i - 1) * 0.12); // 가로 간격 증가
        node.y = node.y || h * (0.2 + Math.sin(i * 0.6) * 0.3); // 세로 범위 감소
      }
    });

    // D3 시뮬레이션 빠른 안정화
    force.alphaTarget(0).alphaDecay(0.05);
    
    // GSAP 애니메이션 상태 추적
    let animationsInitialized = false;
    
    // GSAP 두둥실 흔들리는 애니메이션 설정 (D3 데이터 직접 조작)
    function setupFloatingAnimations() {
      if (animationsInitialized) return; // 중복 실행 방지
      
      // D3 시뮬레이션이 안정된 후 GSAP 애니메이션 시작
      setTimeout(() => {
        if (animationsInitialized) return;
        
        // SVG 크기가 유효한지 다시 확인 (노트북 화면 방어)
        if (w < 100 || h < 100) {
          console.warn('애니메이션 시작 불가: SVG 크기 문제');
          return;
        }
        
        animationsInitialized = true;
        
        // D3 시뮬레이션 강도를 더욱 낮춰서 GSAP와의 충돌 방지
        force.alphaTarget(0.005).alphaDecay(0.01);
        nodes.forEach((nodeData: any, index: number) => {
          if (index > 0 && nodeData.gsapFloat) {
            const { speed, radius } = nodeData.gsapFloat;
            
            // 기준 위치 저장 (원래 위치로 돌아가기 위해)
            if (!nodeData.baseX) nodeData.baseX = nodeData.x;
            if (!nodeData.baseY) nodeData.baseY = nodeData.y;
            
            // D3 데이터 객체를 직접 애니메이션 (처음에 원래 위치 기준으로 설정)
            const tl = gsap.timeline({ repeat: -1 });
            
            // 각 단계마다 기준 위치에서의 상대적 이동
            tl.to(nodeData, {
              x: nodeData.baseX + radius * 1.3,
              y: nodeData.baseY + radius * 0.9,
              duration: 1.2 / speed,
              ease: "sine.inOut"
            })
            .to(nodeData, {
              x: nodeData.baseX - radius * 0.9,
              y: nodeData.baseY + radius * 1.7,
              duration: 1.6 / speed,
              ease: "sine.inOut"
            })
            .to(nodeData, {
              x: nodeData.baseX + radius * 0.6,
              y: nodeData.baseY - radius * 0.1,
              duration: 1.4 / speed,
              ease: "sine.inOut"
            })
            .to(nodeData, {
              x: nodeData.baseX,
              y: nodeData.baseY,
              duration: 1.0 / speed,
              ease: "sine.inOut"
            })
            .delay(index * 0.3);
          }
        });
        
        // 중앙 WITH 노드도 D3 데이터 기반 애니메이션
        const centralNode = nodes[0];
        if (!centralNode.baseX) {
          centralNode.baseX = centralNode.x;
          centralNode.baseY = centralNode.y;
        }
        
        gsap.to(centralNode, {
          x: centralNode.baseX + 4,
          y: centralNode.baseY + 3,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }, 2000); // D3 시뮬레이션 안정화 대기
    }
    
    // 애니메이션 시작
    setupFloatingAnimations();

    // Glassmorphism 평면 원 효과를 위한 필터 정의
    const defs = svg.append("defs");

    // Soft Blur for background glow
    const blurFilter = defs
      .append("filter")
      .attr("id", "blur")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");

    blurFilter
      .append("feGaussianBlur")
      .attr("stdDeviation", "8");

    // Drop Shadow for depth
    const dropShadow = defs
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");

    dropShadow
      .append("feDropShadow")
      .attr("dx", "0")
      .attr("dy", "4")
      .attr("stdDeviation", "6")
      .attr("flood-color", "rgba(0,0,0,0.15)");

    // 모던한 연결선 그라데이션 정의
    const linkGradient = defs
      .append("linearGradient")
      .attr("id", "link-gradient")
      .attr("gradientUnits", "userSpaceOnUse");

    linkGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "rgba(31, 41, 55, 0.05)")
      .attr("stop-opacity", "0.3");

    linkGradient
      .append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "rgba(59, 130, 246, 0.2)")
      .attr("stop-opacity", "0.6");

    linkGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgba(31, 41, 55, 0.05)")
      .attr("stop-opacity", "0.3");

    // 연결선을 먼저 그리기 (z-index 문제 해결)
    const linkGroup = svg.append("g").attr("class", "links");
    
    const link = linkGroup
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "url(#link-gradient)")
      .attr("stroke-width", "1")
      .attr("opacity", "0.4")
      .style("filter", "drop-shadow(0px 1px 2px rgba(59, 130, 246, 0.1))");
    
    // 노드 그룹을 연결선 이후에 생성 (항상 위에 표시)
    const nodeGroup = svg.append("g").attr("class", "nodes");

    const node = nodeGroup
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .call(
        d3
          .drag<any, any>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // 글라스모피즘 그라데이션 생성
    nodes.forEach((node: any, i: number) => {
      if (i > 0) {
        const colorIndex = (i - 1) % glassColors.length;
        const nodeColor = glassColors[colorIndex];

        // 각 노드의 글라스모피즘 그라데이션
        const nodeGradient = defs
          .append("radialGradient")
          .attr("id", `node-gradient-${i}`)
          .attr("cx", "20%")
          .attr("cy", "20%")
          .attr("r", "85%");

        nodeGradient
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", "rgba(255, 255, 255, 0.9)")
          .attr("stop-opacity", "0.95");

        nodeGradient
          .append("stop")
          .attr("offset", "25%")
          .attr("stop-color", "rgba(255, 255, 255, 0.6)")
          .attr("stop-opacity", "0.7");

        nodeGradient
          .append("stop")
          .attr("offset", "60%")
          .attr("stop-color", nodeColor.accent)
          .attr("stop-opacity", "0.3");

        nodeGradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", nodeColor.primary)
          .attr("stop-opacity", "0.6");
      } else {
        // 중앙 WITH 노드의 글라스모피즘 그라데이션
        const centralGradient = defs
          .append("radialGradient")
          .attr("id", "central-gradient")
          .attr("cx", "20%")
          .attr("cy", "20%")
          .attr("r", "85%");

        centralGradient
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", "rgba(255, 255, 255, 0.95)")
          .attr("stop-opacity", "1");

        centralGradient
          .append("stop")
          .attr("offset", "25%")
          .attr("stop-color", "rgba(255, 255, 255, 0.7)")
          .attr("stop-opacity", "0.8");

        centralGradient
          .append("stop")
          .attr("offset", "60%")
          .attr("stop-color", "rgba(31, 41, 55, 0.2)")
          .attr("stop-opacity", "0.4");

        centralGradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "rgba(31, 41, 55, 0.4)")
          .attr("stop-opacity", "0.7");
      }
    });

    // 글라스모피즘 노드 구조
    nodes.forEach((nodeData: any, i: number) => {
      const nodeElement = d3.select(node.nodes()[i]);
      const radius = i > 0 ? circleWidth + nodeData.value * 1.5 : circleWidth + 50;

      if (i > 0) {
        const colorIndex = (i - 1) % glassColors.length;
        const nodeColor = glassColors[colorIndex];

        // 외부 글로우 링
        nodeElement
          .append("circle")
          .attr("r", radius + 10)
          .attr("fill", "none")
          .attr("stroke", nodeColor.glow)
          .attr("stroke-width", "2")
          .attr("opacity", "0.4")
          .style("filter", "url(#blur)");

        // 중간 글로우 레이어
        nodeElement
          .append("circle")
          .attr("r", radius + 5)
          .attr("fill", nodeColor.glow)
          .attr("opacity", "0.2")
          .style("filter", "url(#blur)");

        // 메인 글라스모피즘 구체
        nodeElement
          .append("circle")
          .attr("r", radius)
          .attr("fill", `url(#node-gradient-${i})`)
          .attr("stroke", nodeColor.border)
          .attr("stroke-width", "1.5")
          .style("filter", "url(#drop-shadow)");

        // 하이라이트 점
        nodeElement
          .append("circle")
          .attr("r", radius * 0.12)
          .attr("cx", -radius * 0.35)
          .attr("cy", -radius * 0.35)
          .attr("fill", "rgba(255, 255, 255, 0.9)")
          .attr("opacity", "0.8");
          
      } else {
        // 중앙 WITH 노드 - 특별한 글라스모피즘 스타일
        
        // 외부 펄스 링
        nodeElement
          .append("circle")
          .attr("r", radius + 15)
          .attr("fill", "none")
          .attr("stroke", "rgba(31, 41, 55, 0.5)")
          .attr("stroke-width", "3")
          .attr("opacity", "0.6")
          .style("filter", "url(#blur)");

        // 중간 글로우
        nodeElement
          .append("circle")
          .attr("r", radius + 8)
          .attr("fill", "rgba(31, 41, 55, 0.3)")
          .attr("opacity", "0.4")
          .style("filter", "url(#blur)");

        // 메인 중앙 구체
        nodeElement
          .append("circle")
          .attr("r", radius)
          .attr("fill", "url(#central-gradient)")
          .attr("stroke", "rgba(255, 255, 255, 0.7)")
          .attr("stroke-width", "2.5")
          .style("filter", "url(#drop-shadow)");

        // 중앙 노드 하이라이트
        nodeElement
          .append("circle")
          .attr("r", radius * 0.15)
          .attr("cx", -radius * 0.3)
          .attr("cy", -radius * 0.3)
          .attr("fill", "rgba(255, 255, 255, 1)")
          .attr("opacity", "0.9");
      }
    });

    // 텍스트 그림자 필터 추가
    const textShadow = defs
      .append("filter")
      .attr("id", "text-shadow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");

    textShadow
      .append("feDropShadow")
      .attr("dx", "0")
      .attr("dy", "2")
      .attr("stdDeviation", "3")
      .attr("flood-color", "rgba(0, 0, 0, 0.3)")
      .attr("flood-opacity", "1");

    node
      .append("text")
      .text((d: any) => d.name)
      .attr("font-family", "'Istok Web', 'Inter', 'Helvetica Neue', Helvetica, sans-serif")
      .attr("fill", (d: any, i: number) => {
        if (i === 0) {
          return "#1F2937";
        } else {
          return "#1F2937"; // 모든 노드에 통일된 다크 컬러
        }
      })
      .attr("text-anchor", "middle")
      .attr("font-size", (d: any, i: number) => {
        if (i > 0) {
          return "1.1em";
        } else {
          return "1.5em";
        }
      })
      .attr("font-weight", (d: any, i: number) => {
        if (i === 0) {
          return "700";
        } else {
          return "600";
        }
      })
      .style("filter", "url(#text-shadow)")
      .style("text-rendering", "optimizeLegibility")
      .style("letter-spacing", "0.02em");

    function dragstarted(event: any, d: any) {
      // GSAP 애니메이션 일시 중지
      gsap.killTweensOf(d);
      if (!event.active) force.alphaTarget(0.1).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) force.alphaTarget(0.005);
      d.fx = null;
      d.fy = null;
      
      // 드래그 종료 후 기준점 업데이트 및 GSAP 애니메이션 재시작
      setTimeout(() => {
        d.baseX = d.x;
        d.baseY = d.y;
        
        // 개별 노드 GSAP 애니메이션 재시작 (중앙 노드 제외)
        const nodeIndex = nodes.findIndex(node => node === d);
        if (nodeIndex > 0 && d.gsapFloat) {
          const { speed, radius } = d.gsapFloat;
          
          const tl = gsap.timeline({ repeat: -1 });
          tl.to(d, {
            x: d.baseX + radius * 1.3,
            y: d.baseY + radius * 0.9,
            duration: 1.2 / speed,
            ease: "sine.inOut"
          })
          .to(d, {
            x: d.baseX - radius * 0.9,
            y: d.baseY + radius * 1.7,
            duration: 1.6 / speed,
            ease: "sine.inOut"
          })
          .to(d, {
            x: d.baseX + radius * 0.6,
            y: d.baseY - radius * 0.1,
            duration: 1.4 / speed,
            ease: "sine.inOut"
          })
          .to(d, {
            x: d.baseX,
            y: d.baseY,
            duration: 1.0 / speed,
            ease: "sine.inOut"
          });
        }
      }, 500);
    }

    force.on("tick", () => {
      // 모든 노드에 경계 제한 적용
      nodes.forEach((nodeData: any) => {
        constrainPosition(nodeData);
      });

      // 링크 업데이트 (D3 데이터 기반)
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      // 노드 위치 업데이트 (D3 데이터 기반, GSAP 캐싱 및 총돌 방지)
      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // 호버 시 크기 변화 효과
    node
      .on("mouseenter", function () {
        const circles = d3.select(this).selectAll("circle");
        circles
          .transition()
          .duration(200)
          .attr("r", function() {
            const currentRadius = parseFloat(d3.select(this).attr("r"));
            return currentRadius * 1.08; // 현재 크기에서 8% 증가
          });
      })
      .on("mouseleave", function () {
        const circles = d3.select(this).selectAll("circle");
        circles
          .transition()
          .duration(200)
          .attr("r", function() {
            const currentRadius = parseFloat(d3.select(this).attr("r"));
            return currentRadius / 1.08; // 8% 증가된 크기에서 원래 크기로 복원
          });
      });

    // 중앙 WITH 노드 고정 해제 (GSAP 애니메이션 허용)
    // D3 force의 강제 고정을 해제하여 GSAP이 자연스럽게 작동하도록 함
    setTimeout(() => {
      delete (nodes[0] as any).fx;
      delete (nodes[0] as any).fy;
    }, 3000); // 초기 안정화 후 고정 해제

    // 리사이즈 이벤트 핸들러 (노트북 화면 안정성 개선)
    let resizeTimeout: NodeJS.Timeout;
    function handleResize() {
      if (!svgRef.current) return;
      
      // 디바운싱으로 과도한 리사이즈 이벤트 방지
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newW = Math.max(svgRef.current?.clientWidth || 0, 800);
        const newH = Math.max(svgRef.current?.clientHeight || 0, 600);
        
        // 너무 작은 크기에서는 리사이즈 무시
        if (newW < 100 || newH < 100) return;
        
        // SVG 크기만 업데이트, 애니메이션은 유지
        d3.select(svgRef.current!)
          .attr("width", newW)
          .attr("height", newH);
        
        // 비율 변화가 클 때만 노드 위치 조정
        const scaleX = newW / w;
        const scaleY = newH / h;
        
        if (Math.abs(scaleX - 1) > 0.1 || Math.abs(scaleY - 1) > 0.1) {
          nodes.forEach((node: any) => {
            if (node.baseX && node.baseY) {
              node.baseX *= scaleX;
              node.baseY *= scaleY;
              node.x *= scaleX;
              node.y *= scaleY;
            }
          });
        }
      }, 150); // 150ms 디바운싱
    }
    
    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);
    
    // 컴포너트 언마운트 시 GSAP 애니메이션 정리
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout); // 리사이즈 타이머 정리
      force.stop();
      gsap.killTweensOf(nodes); // 모든 GSAP 애니메이션 중단
      animationsInitialized = false; // 상태 초기화
    };
  }, []); // 빈 의존성 배열로 한 번만 실행

  // 각 글자별 애니메이션 - 스크롤 기반
  const letters = "Work with us.".split("");

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-white overflow-hidden flex flex-col items-center justify-center py-8"
    >
      {/* 메인 타이틀 */}
      <motion.div
        className="relative z-10 text-center mt-24 sm:mt-28 lg:mt-54"
        style={{ opacity, scale, y, rotateX }}
      >
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 lg:gap-6">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-tight"
              style={{ fontFamily: "'Istok Web', sans-serif" }}
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        {/* 서브 타이틀 */}
        <motion.div
          className="mt-3 sm:mt-4 lg:mt-5"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-black font-bold"
            style={{ fontFamily: "'Istok Web', sans-serif" }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{
              scale: 1.05,
              color: "#3B82F6",
              transition: { duration: 0.3 },
            }}
          >
            우리와 함께 성장할 동료를 찾습니다
          </motion.p>
        </motion.div>
      </motion.div>

      {/* 네트워크 그래프 */}
      <motion.div
        className="mt-4 sm:mt-10 lg:mt-0 mb-10 sm:mb-30 lg:mb-38 flex justify-center items-center flex-1 w-full px-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          className="max-w-full max-h-[70vh]"
          style={{ minHeight: "650px" }}
        />
      </motion.div>
    </div>
  );
}
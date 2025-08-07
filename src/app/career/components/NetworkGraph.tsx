"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as d3 from "d3";

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
    const w = svgElement?.clientWidth || 1000;
    const h = svgElement?.clientHeight || 800;
    const circleWidth = 20; // 기본 원형 크기 증가

    const palette = {
      lightgray: "#E5E8E8",
      gray: "#708284",
      mediumgray: "#536870",
      blue: "#3B757F",
    };

    // 컬러 팔레트 정의 (우주적 느낌)
    const colorPalette = [
      "#02050A", // 매우 어두운 검정
      "#00224E", // 어두운 네이비 블루
      "#4376AB", // 중간 블루
      "#F6BF41", // 골든 옐로우/라이트 오렌지
      "#FFD700", // 밝은 골든 옐로우
    ];

    const colors = d3.scaleOrdinal(colorPalette);

    const nodes = [
      { name: "WITH", x: w / 2, y: h / 2, charge: -2000 }, // 중앙 노드 - 강한 반발력
      {
        name: "변화에 대한 도전",
        target: [0], // with 노드에만 연결
        value: 58,
        x: w * 0.2,
        y: h * 0.3,
        charge: -1200,
      },
      {
        name: "긍정적인 마인드",
        target: [0], // with 노드에만 연결
        value: 65,
        x: w * 0.8,
        y: h * 0.3,
        charge: -1000,
      },
      {
        name: "지속적인 성장",
        target: [0], // with 노드에만 연결
        value: 52,
        x: w * 0.9,
        y: h * 0.7,
        charge: -800,
      },
      {
        name: "창의적 사고",
        target: [0], // with 노드에만 연결
        value: 48,
        x: w * 0.85,
        y: h * 0.7,
        charge: -1500,
      },
      {
        name: "책임감과 열정",
        target: [0], // with 노드에만 연결
        value: 40,
        x: w * 0.35,
        y: h * 0.15,
        charge: -600,
      },
      {
        name: "함께 할 수 있는 유대감",
        target: [0], // with 노드에만 연결
        value: 36,
        x: w * 0.65,
        y: h * 0.15,
        charge: -900,
      },
      {
        name: "팀워크 정신",
        target: [0], // with 노드에만 연결
        value: 52,
        x: w * 0.5,
        y: h * 0.85,
        charge: -1100,
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
      .force("x", d3.forceX().strength(0.3)) // X축 중심력 추가
      .force("y", d3.forceY().strength(0.1)); // Y축 중심력 (약하게)

    // 경계 제한 함수 추가
    function constrainPosition(node: any) {
      const radius = node.value
        ? circleWidth + node.value * 1.5 + 60
        : circleWidth + 50 + 60;

      // X축 경계 제한
      if (node.x < radius) node.x = radius;
      if (node.x > w - radius) node.x = w - radius;

      // Y축 경계 제한
      if (node.y < radius) node.y = radius;
      if (node.y > h - radius) node.y = h - radius;
    }

    // 초기 위치 설정 - 가로로 더 넓게
    nodes.forEach((node: any, i: number) => {
      if (i > 0) {
        node.x = node.x || w * (0.1 + (i - 1) * 0.12); // 가로 간격 증가
        node.y = node.y || h * (0.2 + Math.sin(i * 0.6) * 0.3); // 세로 범위 감소
      }
    });

    // 3D 스러운 원판 효과를 위한 그라데이션 정의
    const defs = svg.append("defs");

    // 연결선 그라데이션 정의
    const linkGradient = defs
      .append("linearGradient")
      .attr("id", "link-gradient")
      .attr("gradientUnits", "userSpaceOnUse");

    linkGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#E5E8E8")
      .attr("stop-opacity", "0.8");

    linkGradient
      .append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "#708284")
      .attr("stop-opacity", "0.6");

    linkGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#E5E8E8")
      .attr("stop-opacity", "0.8");

    const link = svg
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#000000")
      .attr("stroke-width", "2")
      .attr("opacity", "0.4");

    const node = svg
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

    // 배경 그라데이션
    const backgroundGradient = defs
      .append("radialGradient")
      .attr("id", "background-gradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "100%");

    backgroundGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ffffff")
      .attr("stop-opacity", "1");

    backgroundGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#f8fafc")
      .attr("stop-opacity", "1");

    nodes.forEach((node: any, i: number) => {
      if (i > 0) {
        // 메인 그라데이션
        const gradient = defs
          .append("radialGradient")
          .attr("id", `gradient-${i}`)
          .attr("cx", "25%")
          .attr("cy", "25%")
          .attr("r", "75%");

        gradient
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", colors(i.toString()))
          .attr("stop-opacity", "1");

        gradient
          .append("stop")
          .attr("offset", "50%")
          .attr("stop-color", colors(i.toString()))
          .attr("stop-opacity", "0.9");

        gradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", colors(i.toString()))
          .attr("stop-opacity", "0.7");

        // 하이라이트 그라데이션 (입체감 강화)
        const highlightGradient = defs
          .append("radialGradient")
          .attr("id", `highlight-${i}`)
          .attr("cx", "20%")
          .attr("cy", "20%")
          .attr("r", "60%");

        highlightGradient
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", "#ffffff")
          .attr("stop-opacity", "0.8");

        highlightGradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "transparent")
          .attr("stop-opacity", "0");
      }
    });

    // 메인 원형 노드
    node
      .append("circle")
      .attr("r", (d: any, i: number) => {
        if (i > 0) {
          // 맨 처음처럼 제각각한 크기로 조정
          const baseSize = circleWidth + d.value * 1.5; // 기본 크기
          const textLength = d.name.length;
          const textAdjustment = Math.max(textLength * 4, 20); // 글자 길이에 따른 최소 크기
          return Math.max(baseSize, textAdjustment); // 기본 크기와 글자 크기 중 큰 값 사용
        } else {
          return circleWidth + 50; // WITH 노드 크기
        }
      })
      .attr("fill", (d: any, i: number) => {
        if (i > 0) {
          return colors(i.toString());
        } else {
          return "#02050A"; // WITH 노드는 가장 어두운 검정 색상
        }
      })
      .attr("stroke-width", (d: any, i: number) => {
        if (i > 0) {
          return "2";
        } else {
          return "3";
        }
      })
      .attr("stroke", (d: any, i: number) => {
        if (i > 0) {
          return "#ffffff";
        } else {
          return "#ffffff";
        }
      });

    node
      .append("text")
      .text((d: any) => d.name)
      .attr("font-family", "Raleway, Helvetica Neue, Helvetica")
      .attr("fill", (d: any, i: number) => {
        if (i === 0) {
          return "#ffffff"; // WITH 노드는 흰색 텍스트
        } else if (i > 0 && d.value < 10) {
          return palette.mediumgray;
        } else if (i > 0 && d.value > 10) {
          return palette.lightgray;
        } else {
          return palette.blue;
        }
      })
      .attr("text-anchor", "middle")
      .attr("font-size", (d: any, i: number) => {
        if (i > 0) {
          return "1.8em"; // 글자 크기 증가
        } else {
          return "2.2em"; // WITH 노드 글자 크기 증가
        }
      })
      .attr("font-weight", "600");

    function dragstarted(event: any, d: any) {
      if (!event.active) force.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) force.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    force.on("tick", () => {
      // 모든 노드에 경계 제한 적용
      nodes.forEach((node: any) => {
        constrainPosition(node);
      });

      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // 호버 시 크기 변화 효과
    node
      .on("mouseenter", function () {
        const circle = d3.select(this).select("circle");
        const currentRadius = parseFloat(circle.attr("r"));
        circle
          .transition()
          .duration(200)
          .attr("r", currentRadius * 1.05); // 현재 크기에서 5% 증가
      })
      .on("mouseleave", function () {
        const circle = d3.select(this).select("circle");
        const currentRadius = parseFloat(circle.attr("r"));
        circle
          .transition()
          .duration(200)
          .attr("r", currentRadius / 1.05); // 5% 증가된 크기에서 원래 크기로 복원
      });

    // 우주에 떠있는 듯한 움직임 추가
    force.alphaDecay(0.01); // 천천히 안정화되도록
    force.velocityDecay(0.3); // 속도 감쇠를 줄여서 계속 움직이도록

    return () => {
      force.stop();
    };
  }, []);

  // 각 글자별 애니메이션 - 스크롤 기반
  const letters = "Work with us.".split("");

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[130vh] bg-white overflow-hidden flex flex-col items-center justify-center py-20"
    >
      {/* 메인 타이틀 */}
      <motion.div
        className="relative z-10 text-center mt-5 sm:mt-5 lg:mt-5"
        style={{ opacity, scale, y, rotateX }}
      >
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 lg:gap-6">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-tight"
              style={{ fontFamily: "Istok Web" }}
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
          className="mt-6 sm:mt-8 lg:mt-10"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-black font-bold"
            style={{ fontFamily: "Istok Web" }}
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
        className="mt-32 sm:mt-40 lg:mt-48 mb-10 sm:mb-30 lg:mb-38 flex justify-center items-center flex-1 w-full px-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          className="max-w-full max-h-[75vh]"
          style={{ minHeight: "650px" }}
        />
      </motion.div>
    </div>
  );
}

"use client";

import React from "react";

const RibbonAnimation: React.FC = () => {
  return (
    <div className="ribbon-container">
      <svg
        className="ribbon"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>{/* No defs content from original HTML */}</defs>
        <path
          strokeWidth="200"
          strokeMiterlimit="0"
          fill="none"
          id="text-path"
          d="M-98 194C260 326 450 318 770 294 1010 262 1200 182 1430 150 1530 134 1631 129 1718 202.8 1810 289 1810 438 1540 510 1190 606 810 470 430 550 251 590 140 670 160 790 192 910 308 917 410 926 530 934 620 918 790 886 943 854 1100 806 1240 790 1500 750 1720 774 2120 945"
        />
        <text className="ribbon__text">
          <textPath
            fill="black"
            xlinkHref="#text-path"
            startOffset="0"
            textAnchor="middle"
            alignmentBaseline="central"
          >
            <animate
              attributeName="startOffset"
              from="0%"
              to="-100%"
              begin="0s"
              dur="25s"
              repeatCount="indefinite"
            />
            We Own the Details — We Own the Process — We Own the Outcome — We
            Own Our Work — We Own the Impact — We Own the Conversation — We Own
            the Standards — We Own the Vision — We Own the Roadblocks — We Own
            the Execution — We Own the Strategy — We Own the Why — We Own the
            Details — We Own the Process — We Own the Outcome — We Own Our Work
            — We Own the Impact — We Own the Conversation — We Own the Standards
            — We Own the Vision — We Own the Roadblocks — We Own the Execution —
            We Own the Strategy — We Own the Why —
          </textPath>
          <textPath
            xlinkHref="#text-path"
            startOffset="0"
            textAnchor="middle"
            alignmentBaseline="central"
          >
            <animate
              attributeName="startOffset"
              from="-0.3%"
              to="-100.25%"
              begin="0s"
              dur="25s"
              repeatCount="indefinite"
            ></animate>
            We Own the Details — We Own the Process — We Own the Outcome — We
            Own Our Work — We Own the Impact — We Own the Conversation — We Own
            the Standards — We Own the Vision — We Own the Roadblocks — We Own
            the Execution — We Own the Strategy — We Own the Why — We Own the
            Details — We Own the Process — We Own the Outcome — We Own Our Work
            — We Own the Impact — We Own the Conversation — We Own the Standards
            — We Own the Vision — We Own the Roadblocks — We Own the Execution —
            We Own the Strategy — We Own the Why —
          </textPath>
        </text>
      </svg>

      <style jsx>{`
        .ribbon-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 100px;
          padding-bottom: 100px;
          overflow: hidden;
        }
        .ribbon {
          stroke: #006fa1;
          width: 100%;
          height: auto;
          min-height: 400px;
        }
        .ribbon__text {
          text-transform: uppercase;
          fill: #fff;
          paint-order: stroke fill;
          font-weight: 900;
          font-size: clamp(60px, 10vw, 120px);
          letter-spacing: clamp(3px, 1.2vw, 10px);
        }

        /* 모바일 화면에서의 최소 크기 보장 */
        @media (max-width: 768px) {
          .ribbon {
            min-height: 300px;
          }
          .ribbon__text {
            font-size: clamp(50px, 12vw, 100px);
            letter-spacing: clamp(3px, 1vw, 8px);
          }
        }

        /* 매우 작은 화면에서의 최소 크기 보장 */
        @media (max-width: 480px) {
          .ribbon {
            min-height: 250px;
          }
          .ribbon__text {
            font-size: clamp(45px, 15vw, 80px);
            letter-spacing: clamp(2.5px, 1.2vw, 6px);
          }
        }
      `}</style>
    </div>
  );
};

export default RibbonAnimation;

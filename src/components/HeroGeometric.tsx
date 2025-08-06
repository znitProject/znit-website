
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Point {
  x: number;
  originX: number;
  y: number;
  originY: number;
  rad: number;
  color: string;
  jointo: Point[];
  length: number;
  seperation: number;
  offset: number;
  circle?: Circle;
}

interface Circle {
  draw: () => void;
}

const GeometricGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const pointsRef = useRef<Point[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 반응형 크기 설정 - 원래 비율 유지
    const getCanvasSize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 640) {
        // 모바일 - 원래 비율 유지하면서 스케일링
        return { width: 280, height: 290 };
      } else if (windowWidth < 1024) {
        // 태블릿 - 원래 비율 유지하면서 스케일링
        return { width: 360, height: 375 };
      } else {
        // 데스크톱/노트북 - 원래 크기 유지
        return { width: 470, height: 490 };
      }
    };

    const { width, height } = getCanvasSize();
    canvas.width = width;
    canvas.height = height;

    // 스케일링 팩터 계산 - 데스크톱/노트북은 스케일링 없음
    const scaleX = width < 1024 ? width / 470 : 1;
    const scaleY = width < 1024 ? height / 490 : 1;

    const dark = theme === 'dark' ? '#FFFFFF' : 'rgb(0, 0, 0)';
    const light = theme === 'dark' ? 'rgba(167,175,181,0.5)' : 'rgba(167,175,181,1)';
    const gold = 'rgb(188, 208, 229)';


    const getRandomInt = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const createCircle = (pos: Point, rad: number, color: string): Circle => ({
      draw: () => {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, rad, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
      },
    });

    // Initialize points
    const points: Point[] = [
      {
        x: 216,
        originX: 216,
        y: 49,
        originY: 49,
        rad: 4,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 125,
        originX: 125,
        y: 95,
        originY: 95,
        rad: 4,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 250,
        originX: 250,
        y: 100,
        originY: 100,
        rad: 10,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 346,
        originX: 346,
        y: 80,
        originY: 80,
        rad: 4,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 51,
        originX: 51,
        y: 182,
        originY: 182,
        rad: 4,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 120,
        originX: 120,
        y: 205,
        originY: 205,
        rad: 6,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 380,
        originX: 380,
        y: 165,
        originY: 165,
        rad: 4,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 420,
        originX: 420,
        y: 190,
        originY: 190,
        rad: 6,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 50,
        originX: 50,
        y: 270,
        originY: 270,
        rad: 3,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 293,
        originX: 293,
        y: 260,
        originY: 260,
        rad: 12,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 65,
        originX: 65,
        y: 320,
        originY: 320,
        rad: 3,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 170,
        originX: 170,
        y: 350,
        originY: 350,
        rad: 9,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 400,
        originX: 400,
        y: 300,
        originY: 300,
        rad: 4,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 100,
        originX: 100,
        y: 370,
        originY: 370,
        rad: 4,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 290,
        originX: 290,
        y: 380,
        originY: 380,
        rad: 6,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 370,
        originX: 370,
        y: 370,
        originY: 370,
        rad: 3,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 175,
        originX: 175,
        y: 400,
        originY: 400,
        rad: 4,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 270,
        originX: 270,
        y: 415,
        originY: 415,
        rad: 4,
        color: dark,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 314,
        originX: 314,
        y: 184,
        originY: 184,
        rad: 4,
        color: light,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 235,
        originX: 235,
        y: 270,
        originY: 270,
        rad: 6,
        color: light,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 112,
        originX: 112,
        y: 315,
        originY: 315,
        rad: 5,
        color: light,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
      {
        x: 140,
        originX: 140,
        y: 150,
        originY: 150,
        rad: 4,
        color: light,
        jointo: [],
        length: 0,
        seperation: 0,
        offset: 0,
      },
    ];

    // Apply scaling to all points only for mobile/tablet
    if (window.innerWidth < 1024) {
      for (let i = 0; i < points.length; i++) {
        points[i].x *= scaleX;
        points[i].originX *= scaleX;
        points[i].y *= scaleY;
        points[i].originY *= scaleY;
        points[i].rad *= Math.min(scaleX, scaleY);
      }
    }

    // Set random properties for each point
    for (let i = 0; i < points.length; i++) {
      points[i].length = getRandomInt(16, 35);
      points[i].seperation = getRandomInt(500, 1300);
      points[i].offset = getRandomInt(100, 1000);
    }

    // Set up connections
    points[0].jointo.push(points[1], points[2], points[3]);
    points[1].jointo.push(points[4], points[2], points[5]);
    points[2].jointo.push(points[3], points[5], points[6], points[9]);
    points[3].jointo.push(points[6], points[7]);
    points[4].jointo.push(points[5], points[8], points[10]);
    points[5].jointo.push(points[9], points[10], points[11]);
    points[6].jointo.push(points[7], points[9], points[12]);
    points[7].jointo.push(points[12]);
    points[8].jointo.push(points[10]);
    points[9].jointo.push(points[11], points[12], points[14]);
    points[10].jointo.push(points[11], points[13], points[16]);
    points[11].jointo.push(points[14], points[16]);
    points[12].jointo.push(points[14], points[15]);
    points[13].jointo.push(points[16]);
    points[14].jointo.push(points[15], points[16], points[17]);
    points[15].jointo.push(points[17]);
    points[16].jointo.push(points[17]);
    points[18].jointo.push(points[2], points[7], points[19]);
    points[19].jointo.push(points[12], points[17], points[4], points[20]);
    points[20].jointo.push(points[8], points[16]);
    points[21].jointo.push(points[18], points[4], points[0]);

    // Create circles for each point
    for (let i = 0; i < points.length; i++) {
      points[i].circle = createCircle(
        points[i],
        points[i].rad,
        points[i].color
      );
    }

    pointsRef.current = points;

    const drawLines = (p: Point) => {
      for (let i = 0; i < p.jointo.length; i++) {
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.jointo[i].x, p.jointo[i].y);
        ctx.strokeStyle = p.color;
        ctx.stroke();
      }
    };

    const drawTransit = (p: Point) => {
      for (let i = 0; i < p.jointo.length; i++) {
        if (p.offset != null) {
          ctx.save();
          ctx.setLineDash([p.length, p.seperation]);
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.jointo[0].x, p.jointo[0].y);
          if (p.color === light) {
            ctx.strokeStyle = light;
          } else {
            ctx.strokeStyle = gold;
          }
          ctx.lineDashOffset = p.offset;
          ctx.stroke();
          ctx.restore();
          p.offset = p.offset + 0.2 + 0.4 * Math.random();
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw light points first
      for (let i = 0; i < points.length; i++) {
        if (points[i].color === light) {
          drawLines(points[i]);
          drawTransit(points[i]);
          points[i].circle?.draw();
        }
      }

      // Draw dark points
      for (let i = 0; i < points.length; i++) {
        if (points[i].color === dark) {
          drawLines(points[i]);
          drawTransit(points[i]);
          points[i].circle?.draw();
        }
      }

      animationRef.current = requestAnimationFrame(render);
    };

    const shiftPoint = (p: Point) => {
      const duration = 1000 + 2000 * Math.random();
      const targetX = getRandomInt(p.originX - 8, p.originX + 8);
      const targetY = getRandomInt(p.originY - 8, p.originY + 8);

      const startTime = Date.now();
      const startX = p.x;
      const startY = p.y;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease out)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        p.x = startX + (targetX - startX) * easeOut;
        p.y = startY + (targetY - startY) * easeOut;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setTimeout(() => shiftPoint(p), 100);
        }
      };

      animate();
    };

    // Start animations
    render();
    for (let i = 0; i < points.length; i++) {
      shiftPoint(points[i]);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="max-w-full mx-auto block w-full h-auto"
      style={{ 
        maxWidth: "100%",
        width: "auto",
        height: "auto"
      }}
    />
  );
};

export default GeometricGlobe;

"use client";

import { useEffect, useRef } from "react";
import type p5 from "p5";

// p5.Particle 타입이 없으므로 커스텀 타입을 정의합니다.
interface CustomParticle {
  pos: p5.Vector;
  col: string;
  size: number;
  fill: number;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  offset: p5.Vector;
  update: () => void;
  isDead: () => boolean;
  render: () => void;
}

interface CustomParticleConstructor {
  new (pos: p5.Vector, ppos: p5.Vector): CustomParticle;
}

interface ParticleSystem {
  particles: CustomParticle[];
  addParticle: (pos: p5.Vector, ppos: p5.Vector) => void;
  run: () => void;
}

interface ParticleSystemConstructor {
  new (): ParticleSystem;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 동적으로 p5.js 로드
    const loadP5 = async () => {
      const p5 = (await import("p5")).default;

      const colors = ["#FFE300", "#FF7494", "#00E6FF", "#89FF47"];
      let ps: ParticleSystem;
      let ptime = 0;
      let offset: p5.Vector;
      let origin: p5.Vector;
      let bg = 0;

      const sketch = (p: p5) => {
        const Particle = function (
          this: CustomParticle,
          pos: p5.Vector,
          ppos: p5.Vector
        ) {
          this.pos = pos.copy();
          this.col = p.random(colors);
          this.size = p.random(5, 30);
          this.fill = p.random([0, 1]);
          this.velocity = p.createVector(0, 0);
          this.acceleration = p5.Vector.sub(ppos, pos);
          this.acceleration.mult(0.02);
          this.offset = p.createVector(p.random(0, 1000), p.random(0, 1000));

          this.update = function () {
            this.velocity.add(this.acceleration);
            this.pos.add(this.velocity);

            // 마우스가 움직이고 있는지 확인
            const isMouseMoving =
              p.mouseX !== p.pmouseX || p.mouseY !== p.pmouseY;

            if (isMouseMoving) {
              // 마우스 움직일 때는 원래 속도
              this.pos.add(
                p.createVector(
                  10 * (p.noise(this.offset.x) - 0.5),
                  10 * (p.noise(this.offset.y) - 0.5)
                )
              );
              this.offset.x = this.offset.x + 0.01;
              this.offset.y = this.offset.y + 0.01;
              // 마우스 움직일 때는 원래 속도로 크기 감소
              this.size = this.size * 0.95;
            } else {
              // 가만히 있을 때는 더 천천히
              this.pos.add(
                p.createVector(
                  5 * (p.noise(this.offset.x) - 0.5),
                  5 * (p.noise(this.offset.y) - 0.5)
                )
              );
              this.offset.x = this.offset.x + 0.005;
              this.offset.y = this.offset.y + 0.005;
              // 가만히 있을 때는 더 천천히 크기 감소
              this.size = this.size * 0.99;
            }
            this.acceleration.mult(0);
            if (this.velocity.mag() > 1) this.velocity.mult(0.95);
          };

          this.isDead = function () {
            return this.size < 1;
          };

          this.render = function () {
            if (this.fill == 1) {
              p.noStroke();
              p.fill(this.col);
            } else {
              p.noFill();
              p.stroke(this.col);
              p.strokeWeight(1);
            }
            p.ellipse(this.pos.x, this.pos.y, this.size, this.size);
          };
        } as unknown as CustomParticleConstructor;

        const ParticleSystem = function (this: ParticleSystem) {
          this.particles = [];

          this.addParticle = function (pos: p5.Vector, ppos: p5.Vector) {
            // 가만히 있을 때는 파티클 갯수를 제한
            const isMouseMoving =
              p.mouseX !== p.pmouseX || p.mouseY !== p.pmouseY;
            const maxParticles = isMouseMoving ? 50 : 20; // 마우스 움직일 때 50개, 가만히 있을 때 20개

            if (this.particles.length < maxParticles) {
              this.particles.push(new Particle(pos, ppos));
            }
          };

          this.run = function () {
            for (let i = this.particles.length - 1; i >= 0; i--) {
              const particle: CustomParticle = this.particles[i];
              particle.update();
              particle.render();
              if (particle.isDead()) {
                this.particles.splice(i, 1);
              }
            }
          };
        } as unknown as ParticleSystemConstructor;

        p.setup = () => {
          const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
          if (canvasRef.current) {
            canvas.parent(canvasRef.current);
          }
          ps = new ParticleSystem();
          p.background(0, 0, 0); // 파티클 배경만 검정색
          offset = p.createVector(p.random(1000), p.random(1000));
          origin = p.createVector(p.width / 2, p.height / 2);
        };

        p.draw = () => {
          if (bg % 2 == 0) p.background(0, 0, 0);
          else p.background(31, 31, 31, 20);

          if (
            p.mouseX == p.pmouseX &&
            p.mouseY == p.mouseY &&
            p.millis() - ptime > 1000
          ) {
            // 가만히 있을 때는 조금씩 천천히 터지도록
            const randomX = p.random(p.width * 0.1, p.width * 0.9);
            const randomY = p.random(p.height * 0.1, p.height * 0.9);
            const pos = p.createVector(randomX, randomY);

            // 노이즈 기반 움직임 (작게)
            const step = p.createVector(
              p.noise(offset.x) - 0.5,
              p.noise(offset.y) - 0.5
            );
            step.mult(10); // 작은 움직임
            const noisePos = p5.Vector.add(pos, step);

            // 화면 경계 처리
            if (noisePos.x > p.width) noisePos.x -= p.width;
            if (noisePos.x < 0) noisePos.x += p.width;
            if (noisePos.y > p.height) noisePos.y -= p.height;
            if (noisePos.y < 0) noisePos.y += p.height;

            ps.addParticle(noisePos, pos);
            origin = noisePos;
            offset.x += 0.005; // 더 천천히
            offset.y += 0.005; // 더 천천히
          }

          ps.run();
        };

        p.windowResized = () => {
          p.resizeCanvas(window.innerWidth, window.innerHeight);
        };

        p.mouseClicked = () => {
          bg++;
        };

        p.mouseMoved = () => {
          const pos = p.createVector(p.mouseX, p.mouseY);
          const ppos = p.createVector(p.pmouseX, p.pmouseY);
          ps.addParticle(pos, ppos);
          ptime = p.millis();
          origin = p.createVector(p.width / 2, p.height / 2);
        };
      };

      // p5.js 인스턴스 생성
      p5InstanceRef.current = new p5(sketch);
    };

    loadP5();

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        margin: 0,
        padding: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    />
  );
}

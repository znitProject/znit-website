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
          ppos: p5.Vector,
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
            this.pos.add(
              p.createVector(
                10 * (p.noise(this.offset.x) - 0.5),
                10 * (p.noise(this.offset.y) - 0.5),
              ),
            );
            this.offset.x = this.offset.x + 0.01;
            this.offset.y = this.offset.y + 0.01;
            this.size = this.size * 0.95;
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
            this.particles.push(new Particle(pos, ppos));
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
          p.background(0, 0, 0);
          offset = p.createVector(p.random(1000), p.random(1000));
          origin = p.createVector(p.width / 2, p.height / 2);
        };

        p.draw = () => {
          if (bg % 2 == 0) p.background(0, 0, 0);
          else p.background(31, 31, 31, 20);

          if (
            p.mouseX == p.pmouseX &&
            p.mouseY == p.pmouseY &&
            p.millis() - ptime > 800
          ) {
            const step = p.createVector(
              p.noise(offset.x) - 0.5,
              p.noise(offset.y) - 0.5,
            );
            step.mult(10);
            const pos = p5.Vector.add(origin, step);
            if (pos.x > p.width) pos.x -= p.width;
            if (pos.x < 0) pos.x += p.width;
            if (pos.y > p.height) pos.y -= p.height;
            if (pos.y < 0) pos.y += p.height;
            ps.addParticle(pos, origin);
            origin = pos;
            offset.x += 0.01;
            offset.y += 0.01;
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
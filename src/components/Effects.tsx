import { motion, useScroll, useTransform } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

export const ParticleDrift: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-spa-nude"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export const GridShimmer: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, #D9C5C5 1px, transparent 1px), linear-gradient(to bottom, #D9C5C5 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <motion.div 
        className="absolute inset-0 bg-linear-to-r from-transparent via-spa-nude/10 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export const BeamTexture: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <div 
        className="absolute -top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 rotate-45"
        style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(217, 197, 197, 0.1) 101px, transparent 102px)',
        }}
      />
      <motion.div
        className="absolute -top-1/2 left-0 w-full h-[200%] bg-linear-to-b from-transparent via-white/20 to-transparent blur-3xl"
        animate={{
          x: ['-50%', '50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export const ParallaxShapes: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-spa-nude/5 blur-3xl"
      />
      <motion.div 
        style={{ y: y2, rotate: -rotate }}
        className="absolute top-3/4 -right-20 w-64 h-64 rounded-full bg-spa-stone/5 blur-3xl"
      />
    </div>
  );
};

export const AnimatedGradient: React.FC = () => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none opacity-30 animate-gradient"
      style={{
        background: 'radial-gradient(circle at 20% 20%, #D9C5C5 0%, transparent 50%), radial-gradient(circle at 80% 80%, #625959 0%, transparent 50%)',
        filter: 'blur(80px)',
      }}
    />
  );
};

export const CustomCursorProxy: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-96 h-96 bg-spa-nude/10 rounded-full blur-[100px] pointer-events-none z-0"
      animate={{
        x: mousePos.x - 192,
        y: mousePos.y - 192,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 100, restDelta: 0.001 }}
    />
  );
};

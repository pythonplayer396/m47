
import React, { useEffect, useRef } from 'react';
import './particles.css';

const HomeParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create gift box particles
    const createGiftParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'gift-particle';
      
      const centerX = 50;
      const centerY = 45;
      const spread = 35;
      
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * spread;
      const left = centerX + Math.cos(angle) * distance;
      const top = centerY + Math.sin(angle) * distance;
      
      const size = Math.random() * 8 + 6;
      const animationDelay = Math.random() * 10;
      
      particle.style.cssText = `
        left: ${Math.max(10, Math.min(90, left))}%;
        top: ${Math.max(20, Math.min(70, top))}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${animationDelay}s;
      `;
      
      container.appendChild(particle);
      elementsRef.current.push(particle);
      
      return particle;
    };

    // Create celebration sparkles
    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.className = 'celebration-sparkle';
      
      const positions = [
        { left: 25, top: 35 },
        { left: 75, top: 30 },
        { left: 35, top: 55 },
        { left: 65, top: 40 },
        { left: 45, top: 25 },
        { left: 55, top: 60 }
      ];
      
      const position = positions[Math.floor(Math.random() * positions.length)];
      
      sparkle.style.cssText = `
        left: ${position.left}%;
        top: ${position.top}%;
      `;
      
      container.appendChild(sparkle);
      return sparkle;
    };

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      elementsRef.current.forEach(element => {
        if (!element.parentNode) return;
        
        const elementRect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const elementX = elementRect.left - containerRect.left + elementRect.width / 2;
        const elementY = elementRect.top - containerRect.top + elementRect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2)
        );
        
        if (distance < 100) {
          const angle = Math.atan2(elementY - mouseY, elementX - mouseX);
          const repelStrength = (100 - distance) / 100 * 20;
          const offsetX = Math.cos(angle) * repelStrength;
          const offsetY = Math.sin(angle) * repelStrength;
          
          element.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.3) rotate(15deg)`;
          element.style.opacity = '0.9';
        } else {
          element.style.transform = 'translate(0, 0) scale(1) rotate(0deg)';
          element.style.opacity = '0.7';
        }
      });
    };

    // Initialize particles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createGiftParticle(), i * 150);
    }

    for (let i = 0; i < 6; i++) {
      setTimeout(() => createSparkle(), i * 1000);
    }

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      elementsRef.current = [];
    };
  }, []);

  return (
    <div ref={containerRef} className="particles-container">
      <div className="home-gradient-bg"></div>
    </div>
  );
};

export default HomeParticles;

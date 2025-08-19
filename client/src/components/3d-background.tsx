
import React, { useEffect, useRef } from 'react';
import './3d-background.css';

const ThreeDBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles focused around the hero text area
    const createFloatingParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      
      // Concentrate particles around the center where text is
      const centerX = 50;
      const centerY = 45; // Slightly higher to align with hero text
      const spread = 30; // Spread radius
      
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * spread;
      const left = centerX + Math.cos(angle) * distance;
      const top = centerY + Math.sin(angle) * distance;
      
      const size = Math.random() * 4 + 2;
      const animationDelay = Math.random() * 8;
      
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

    // Create glowing orbs that follow the text area
    const createGlowOrb = () => {
      const orb = document.createElement('div');
      orb.className = 'glow-orb';
      
      // Position orbs around the hero text area
      const positions = [
        { left: 20, top: 30 },
        { left: 80, top: 40 },
        { left: 30, top: 60 },
        { left: 70, top: 25 }
      ];
      
      const position = positions[Math.floor(Math.random() * positions.length)];
      
      orb.style.cssText = `
        left: ${position.left}%;
        top: ${position.top}%;
      `;
      
      container.appendChild(orb);
      return orb;
    };

    // Enhanced mouse interaction for particles
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
        
        if (distance < 120) {
          const angle = Math.atan2(elementY - mouseY, elementX - mouseX);
          const repelStrength = (120 - distance) / 120 * 25;
          const offsetX = Math.cos(angle) * repelStrength;
          const offsetY = Math.sin(angle) * repelStrength;
          
          element.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.2)`;
          element.style.opacity = '0.8';
        } else {
          element.style.transform = 'translate(0, 0) scale(1)';
          element.style.opacity = '0.6';
        }
      });

      // Handle glow orbs
      const orbs = container.querySelectorAll('.glow-orb');
      orbs.forEach((orb) => {
        const htmlOrb = orb as HTMLElement;
        const orbRect = htmlOrb.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const orbX = orbRect.left - containerRect.left + orbRect.width / 2;
        const orbY = orbRect.top - containerRect.top + orbRect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(mouseX - orbX, 2) + Math.pow(mouseY - orbY, 2)
        );
        
        if (distance < 150) {
          const intensity = (150 - distance) / 150;
          htmlOrb.style.transform = `scale(${1 + intensity * 0.3})`;
          htmlOrb.style.opacity = `${0.3 + intensity * 0.4}`;
        } else {
          htmlOrb.style.transform = 'scale(1)';
          htmlOrb.style.opacity = '0.2';
        }
      });
    };

    // Initialize particles concentrated in hero area
    for (let i = 0; i < 25; i++) {
      setTimeout(() => createFloatingParticle(), i * 100);
    }

    // Create fewer, more impactful glowing orbs
    for (let i = 0; i < 4; i++) {
      setTimeout(() => createGlowOrb(), i * 800);
    }

    // Add mouse event listener
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      elementsRef.current = [];
    };
  }, []);

  return (
    <div ref={containerRef} className="three-d-background">
      {/* Animated gradient background */}
      <div className="animated-gradient"></div>
      
      {/* Subtle grid that moves with scroll */}
      <div className="hero-grid"></div>
      
      {/* Main background orbs */}
      <div className="background-orb orb-1"></div>
      <div className="background-orb orb-2"></div>
      <div className="background-orb orb-3"></div>
    </div>
  );
};

export default ThreeDBackground;

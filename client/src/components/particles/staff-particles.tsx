
import React, { useEffect, useRef } from 'react';
import './particles.css';

const StaffParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create professional badge particles
    const createBadgeParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'badge-particle';
      
      const centerX = 50;
      const centerY = 35;
      const spread = 30;
      
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * spread;
      const left = centerX + Math.cos(angle) * distance;
      const top = centerY + Math.sin(angle) * distance;
      
      const size = Math.random() * 6 + 4;
      const animationDelay = Math.random() * 8;
      
      particle.style.cssText = `
        left: ${Math.max(15, Math.min(85, left))}%;
        top: ${Math.max(15, Math.min(60, top))}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${animationDelay}s;
      `;
      
      container.appendChild(particle);
      elementsRef.current.push(particle);
      
      return particle;
    };

    // Create floating icons (crown, shield, etc.)
    const createRoleIcon = () => {
      const icon = document.createElement('div');
      icon.className = 'role-icon';
      
      const icons = ['👑', '🛡️', '⚔️', '🏆', '💎'];
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      icon.textContent = randomIcon;
      
      const positions = [
        { left: 20, top: 25 },
        { left: 80, top: 30 },
        { left: 30, top: 50 },
        { left: 70, top: 20 },
        { left: 50, top: 55 }
      ];
      
      const position = positions[Math.floor(Math.random() * positions.length)];
      
      icon.style.cssText = `
        left: ${position.left}%;
        top: ${position.top}%;
      `;
      
      container.appendChild(icon);
      return icon;
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
        
        if (distance < 90) {
          const angle = Math.atan2(elementY - mouseY, elementX - mouseX);
          const repelStrength = (90 - distance) / 90 * 15;
          const offsetX = Math.cos(angle) * repelStrength;
          const offsetY = Math.sin(angle) * repelStrength;
          
          element.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.2)`;
          element.style.opacity = '0.9';
        } else {
          element.style.transform = 'translate(0, 0) scale(1)';
          element.style.opacity = '0.6';
        }
      });
    };

    // Initialize particles
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createBadgeParticle(), i * 200);
    }

    for (let i = 0; i < 5; i++) {
      setTimeout(() => createRoleIcon(), i * 1500);
    }

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      elementsRef.current = [];
    };
  }, []);

  return (
    <div ref={containerRef} className="particles-container">
      <div className="staff-gradient-bg"></div>
    </div>
  );
};

export default StaffParticles;


import React, { useEffect, useRef } from 'react';
import './particles.css';

const UpdatesParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create tech circuit particles
    const createCircuitParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'circuit-particle';
      
      const centerX = 50;
      const centerY = 40;
      const spread = 40;
      
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * spread;
      const left = centerX + Math.cos(angle) * distance;
      const top = centerY + Math.sin(angle) * distance;
      
      const size = Math.random() * 4 + 3;
      const animationDelay = Math.random() * 12;
      
      particle.style.cssText = `
        left: ${Math.max(10, Math.min(90, left))}%;
        top: ${Math.max(15, Math.min(70, top))}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${animationDelay}s;
      `;
      
      container.appendChild(particle);
      elementsRef.current.push(particle);
      
      return particle;
    };

    // Create floating update badges
    const createUpdateBadge = () => {
      const badge = document.createElement('div');
      badge.className = 'update-badge';
      
      const badges = ['NEW', 'HOT', '2024', 'BETA', 'LIVE'];
      const randomBadge = badges[Math.floor(Math.random() * badges.length)];
      badge.textContent = randomBadge;
      
      const positions = [
        { left: 15, top: 20 },
        { left: 85, top: 25 },
        { left: 25, top: 60 },
        { left: 75, top: 15 },
        { left: 50, top: 65 }
      ];
      
      const position = positions[Math.floor(Math.random() * positions.length)];
      
      badge.style.cssText = `
        left: ${position.left}%;
        top: ${position.top}%;
      `;
      
      container.appendChild(badge);
      return badge;
    };

    // Create data streams
    const createDataStream = () => {
      const stream = document.createElement('div');
      stream.className = 'data-stream';
      
      const isVertical = Math.random() > 0.5;
      
      if (isVertical) {
        stream.style.cssText = `
          left: ${Math.random() * 90 + 5}%;
          top: 0;
          width: 2px;
          height: 100px;
        `;
      } else {
        stream.style.cssText = `
          left: 0;
          top: ${Math.random() * 70 + 15}%;
          width: 100px;
          height: 2px;
        `;
      }
      
      container.appendChild(stream);
      
      setTimeout(() => {
        if (stream.parentNode) {
          stream.parentNode.removeChild(stream);
        }
      }, 3000);
      
      return stream;
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
        
        if (distance < 120) {
          const angle = Math.atan2(elementY - mouseY, elementX - mouseX);
          const repelStrength = (120 - distance) / 120 * 25;
          const offsetX = Math.cos(angle) * repelStrength;
          const offsetY = Math.sin(angle) * repelStrength;
          
          element.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.4)`;
          element.style.opacity = '1';
        } else {
          element.style.transform = 'translate(0, 0) scale(1)';
          element.style.opacity = '0.7';
        }
      });
    };

    // Initialize particles
    for (let i = 0; i < 25; i++) {
      setTimeout(() => createCircuitParticle(), i * 120);
    }

    for (let i = 0; i < 5; i++) {
      setTimeout(() => createUpdateBadge(), i * 1200);
    }

    // Create data streams periodically
    const streamInterval = setInterval(() => {
      createDataStream();
    }, 2000);

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      clearInterval(streamInterval);
      elementsRef.current = [];
    };
  }, []);

  return (
    <div ref={containerRef} className="particles-container">
      <div className="updates-gradient-bg"></div>
    </div>
  );
};

export default UpdatesParticles;

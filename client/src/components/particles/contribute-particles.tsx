
import React, { useEffect, useRef } from 'react';
import './particles.css';

const ContributeParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create heart particles for community love
    const createHeartParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'heart-particle';
      
      const centerX = 50;
      const centerY = 40;
      const spread = 35;
      
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * spread;
      const left = centerX + Math.cos(angle) * distance;
      const top = centerY + Math.sin(angle) * distance;
      
      const size = Math.random() * 6 + 4;
      const animationDelay = Math.random() * 8;
      
      particle.innerHTML = '❤️';
      
      particle.style.cssText = `
        left: ${Math.max(10, Math.min(90, left))}%;
        top: ${Math.max(15, Math.min(70, top))}%;
        font-size: ${size}px;
        animation-delay: ${animationDelay}s;
      `;
      
      container.appendChild(particle);
      elementsRef.current.push(particle);
      
      return particle;
    };

    // Create community connection lines
    const createConnectionLine = () => {
      const line = document.createElement('div');
      line.className = 'connection-line';
      
      const startX = Math.random() * 80 + 10;
      const startY = Math.random() * 60 + 20;
      const endX = Math.random() * 80 + 10;
      const endY = Math.random() * 60 + 20;
      
      const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
      
      line.style.cssText = `
        left: ${startX}%;
        top: ${startY}%;
        width: ${length}%;
        transform: rotate(${angle}deg);
        transform-origin: 0 50%;
      `;
      
      container.appendChild(line);
      
      setTimeout(() => {
        if (line.parentNode) {
          line.parentNode.removeChild(line);
        }
      }, 4000);
      
      return line;
    };

    // Create floating contribution icons
    const createContribIcon = () => {
      const icon = document.createElement('div');
      icon.className = 'contrib-icon';
      
      const icons = ['🤝', '💪', '🌟', '🎯', '🚀'];
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      icon.textContent = randomIcon;
      
      const positions = [
        { left: 20, top: 30 },
        { left: 80, top: 25 },
        { left: 30, top: 55 },
        { left: 70, top: 45 },
        { left: 50, top: 20 }
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
        
        if (distance < 100) {
          element.style.transform = 'scale(1.5) rotate(15deg)';
          element.style.opacity = '1';
        } else {
          element.style.transform = 'scale(1) rotate(0deg)';
          element.style.opacity = '0.8';
        }
      });
    };

    // Initialize particles
    for (let i = 0; i < 18; i++) {
      setTimeout(() => createHeartParticle(), i * 180);
    }

    for (let i = 0; i < 5; i++) {
      setTimeout(() => createContribIcon(), i * 1000);
    }

    // Create connection lines periodically
    const lineInterval = setInterval(() => {
      createConnectionLine();
    }, 3000);

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      clearInterval(lineInterval);
      elementsRef.current = [];
    };
  }, []);

  return (
    <div ref={containerRef} className="particles-container">
      <div className="contribute-gradient-bg"></div>
    </div>
  );
};

export default ContributeParticles;

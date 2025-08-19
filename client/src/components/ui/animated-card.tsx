
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  tiltIntensity?: number;
  glowColor?: string;
  hoverScale?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className, 
  tiltIntensity = 10,
  glowColor = 'blue',
  hoverScale = 1.02
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * tiltIntensity;
    const rotateY = ((centerX - x) / centerX) * tiltIntensity;

    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale3d(${hoverScale}, ${hoverScale}, ${hoverScale})
      translateZ(20px)
    `;
    
    card.style.boxShadow = `
      ${rotateY * 2}px ${rotateX * 2}px 40px rgba(0, 0, 0, 0.1),
      0 0 80px rgba(59, 130, 246, 0.15)
    `;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)';
      cardRef.current.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        'transition-all duration-300 ease-out transform-gpu cursor-pointer',
        'hover:shadow-xl',
        'relative overflow-hidden',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glow effect on hover */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500",
          `bg-gradient-to-br from-${glowColor}-500/10 to-transparent`,
          "pointer-events-none"
        )}
        style={{
          opacity: isHovered ? 0.6 : 0,
        }}
      />
    </div>
  );
};

export default AnimatedCard;

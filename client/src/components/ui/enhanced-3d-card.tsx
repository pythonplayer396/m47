
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Enhanced3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
  enableGlow?: boolean;
}

const Enhanced3DCard: React.FC<Enhanced3DCardProps> = ({ 
  children, 
  className, 
  intensity = 15,
  glowColor = 'blue',
  enableGlow = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * intensity;
      const rotateY = ((centerX - x) / centerX) * intensity;

      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale3d(1.03, 1.03, 1.03)
        translateZ(50px)
      `;
      
      if (enableGlow) {
        card.style.boxShadow = `
          ${rotateY * 3}px ${rotateX * 3}px 60px rgba(0, 0, 0, 0.15),
          0 0 100px rgba(59, 130, 246, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `;
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)';
      card.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity, enableGlow, isHovered]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative rounded-xl border bg-card text-card-foreground shadow-lg',
        'transition-all duration-500 ease-out transform-gpu',
        'hover:shadow-2xl',
        'backdrop-blur-sm',
        'overflow-hidden',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
      }}
    >
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default Enhanced3DCard;

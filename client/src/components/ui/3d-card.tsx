
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const ThreeDCard: React.FC<ThreeDCardProps> = ({ 
  children, 
  className, 
  intensity = 15 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
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
        scale3d(1.02, 1.02, 1.02)
      `;
      card.style.boxShadow = `
        ${rotateY * 2}px ${rotateX * 2}px 20px rgba(0, 0, 0, 0.15),
        0 0 50px rgba(59, 130, 246, 0.1)
      `;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'transition-all duration-300 ease-out transform-gpu',
        'hover:shadow-xl',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
};

export default ThreeDCard;

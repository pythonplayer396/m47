import { ReactNode, forwardRef } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface ScrollAnimatedProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-down' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale-in' | 'rotate-in';
  delay?: number;
  threshold?: number;
}

const ScrollAnimated = forwardRef<HTMLDivElement, ScrollAnimatedProps>(
  ({ children, className = '', animation = 'slide-up', delay = 0, threshold = 0.1 }, forwardedRef) => {
    const ref = useScrollAnimation(threshold);

    const animationClass = `scroll-${animation}`;
    const delayClass = delay > 0 ? `scroll-stagger-${Math.min(delay, 6)}` : '';

    return (
      <div
        ref={forwardedRef || (ref as any)}
        className={`${animationClass} ${delayClass} ${className}`}
      >
        {children}
      </div>
    );
  }
);

ScrollAnimated.displayName = 'ScrollAnimated';

export default ScrollAnimated;
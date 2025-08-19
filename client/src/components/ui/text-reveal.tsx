
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  letterDelay?: number;
  as?: keyof JSX.IntrinsicElements;
}

export function TextReveal({ 
  text, 
  className, 
  delay = 0, 
  letterDelay = 0.05,
  as: Component = "span"
}: TextRevealProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const words = text.split(" ");

  return (
    <Component className={cn("inline-block", className)} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[10px]">
          {word.split("").map((letter, letterIndex) => (
            <span
              key={letterIndex}
              className="inline-block mr-[0.001em]"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0) translateZ(0)" : "translateY(0.25em) translateZ(0)",
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
                transitionDelay: `${(wordIndex * 5 + letterIndex) * letterDelay}s`,
              }}
              aria-hidden="true"
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </Component>
  );
}

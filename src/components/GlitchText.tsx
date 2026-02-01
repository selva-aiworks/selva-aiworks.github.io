import { FC } from 'react';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = ''
}) => {
  return (
    <div 
      data-text={children} 
      className={`glitch-container text-white text-[clamp(3rem,15vw,10rem)] font-black mx-auto select-none cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};

export default GlitchText;


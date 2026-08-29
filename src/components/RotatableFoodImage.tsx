import React, { useState } from 'react';

interface RotatableFoodImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  variant?: 'dish' | 'standard';
}

/**
 * RotatableFoodImage
 * Kotal-style interactive hover spin animation for food items.
 * 
 * - When cursor hovers OVER the food: ONLY the food item / dish spins smoothly.
 * - When cursor leaves: Smoothly stops spinning and eases back to resting position.
 * - No scroll-based rotation.
 * - Pure GPU-accelerated transforms (transform-origin: center center).
 * - Works automatically for all existing & future/admin-added menu items.
 */
export const RotatableFoodImage: React.FC<RotatableFoodImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  variant = 'dish',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === 'dish') {
    return (
      <div
        className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#181818] via-[#121212] to-[#0A0A0A] ${wrapperClassName}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Soft Ambient Gold Platter Halo */}
        <div className="absolute w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-[#C5A059]/10 blur-xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-40" />

        {/* Circular Gourmet Food Platter / Dish that spins smoothly on hover */}
        <div
          className={`relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden border border-[#C5A059]/30 shadow-[0_10px_25px_rgba(0,0,0,0.85),inset_0_1px_3px_rgba(255,255,255,0.15)] flex items-center justify-center transition-all duration-500 group-hover:border-[#C5A059]/70 group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.9),0_0_25px_rgba(197,160,89,0.3)] ${
            isHovered ? 'food-hover-spin-active' : 'food-hover-spin-rest'
          }`}
          style={{
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        >
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover object-center pointer-events-none select-none ${className}`}
            {...props}
          />
        </div>
      </div>
    );
  }

  // Standard variant for non-dish banners or thumbnails
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${wrapperClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-full h-full flex items-center justify-center ${
          isHovered ? 'food-hover-spin-active' : 'food-hover-spin-rest'
        }`}
        style={{
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <img
          src={src}
          alt={alt}
          className={`${className}`}
          {...props}
        />
      </div>
    </div>
  );
};

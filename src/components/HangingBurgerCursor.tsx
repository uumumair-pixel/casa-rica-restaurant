import React, { useEffect, useRef } from 'react';

export const HangingBurgerCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wirePathRef = useRef<SVGPathElement>(null);
  const burgerWrapperRef = useRef<HTMLDivElement>(null);
  const burgerInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (mouse/trackpad)
    const isDesktopPointer = () =>
      window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768;

    if (!isDesktopPointer()) {
      return;
    }

    let isVisible = false;
    let isMouseDown = false;
    let isHoveringInteractive = false;

    // Mouse coordinates (anchor point)
    let mouseX = -200;
    let mouseY = -200;

    // Burger position and physics state
    const WIRE_LENGTH = 34;
    let burgerX = -200;
    let burgerY = -200;
    let vx = 0;
    let vy = 0;
    let angle = 0;
    let currentScale = 1;
    let targetScale = 1;

    let animFrameId: number | null = null;
    let isLoopRunning = false;

    const checkInteractiveTarget = (target: EventTarget | null): boolean => {
      if (!target || !(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          'a, button, [role="button"], input, select, textarea, label[for], .cursor-pointer, [data-interactive="true"]'
        )
      );
    };

    // Physics update loop
    const updatePhysics = () => {
      if (!isVisible) {
        isLoopRunning = false;
        animFrameId = null;
        return;
      }

      const targetX = mouseX;
      const targetY = mouseY + WIRE_LENGTH;

      // High responsiveness spring-damper
      const dx = targetX - burgerX;
      const dy = targetY - burgerY;

      const stiffness = 0.28;
      const damping = 0.72;

      vx = (vx + dx * stiffness) * damping;
      vy = (vy + dy * stiffness) * damping;

      burgerX += vx;
      burgerY += vy;

      // Dynamic tilt based on horizontal velocity & swing
      const targetAngle = Math.max(-22, Math.min(22, vx * 1.4));
      angle += (targetAngle - angle) * 0.22;

      // Target scale based on hover & click
      const baseScale = isHoveringInteractive ? 1.06 : 1;
      targetScale = isMouseDown ? 0.86 : baseScale;
      currentScale += (targetScale - currentScale) * 0.25;

      // Update Burger Position (GPU hardware accelerated translate3d)
      if (burgerWrapperRef.current) {
        burgerWrapperRef.current.style.transform = `translate3d(${burgerX.toFixed(2)}px, ${burgerY.toFixed(2)}px, 0px) rotate(${angle.toFixed(2)}deg) scale(${currentScale.toFixed(3)})`;
      }

      // Update Burger Glow on interactive hover
      if (burgerInnerRef.current) {
        if (isHoveringInteractive) {
          burgerInnerRef.current.style.filter =
            'drop-shadow(0 6px 14px rgba(197, 160, 89, 0.55)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8))';
        } else {
          burgerInnerRef.current.style.filter =
            'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.65))';
        }
      }

      // Update Golden Wire Curve (hanging from mouseX, mouseY to burgerX, burgerY)
      if (wirePathRef.current) {
        const midX = (mouseX + burgerX) / 2 - vx * 0.15;
        const midY = (mouseY + burgerY) / 2 + 3;

        wirePathRef.current.setAttribute(
          'd',
          `M ${mouseX.toFixed(1)} ${mouseY.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)} ${burgerX.toFixed(1)} ${burgerY.toFixed(1)}`
        );
      }

      // If motion is settled down and mouse isn't moving, conserve CPU
      const isSettled =
        Math.abs(dx) < 0.1 &&
        Math.abs(dy) < 0.1 &&
        Math.abs(vx) < 0.05 &&
        Math.abs(vy) < 0.05 &&
        Math.abs(targetScale - currentScale) < 0.005;

      if (isSettled) {
        // Snap directly to final resting position
        burgerX = targetX;
        burgerY = targetY;
        vx = 0;
        vy = 0;
        angle = 0;
        isLoopRunning = false;
        animFrameId = null;
        return;
      }

      animFrameId = requestAnimationFrame(updatePhysics);
    };

    const startPhysicsLoop = () => {
      if (!isLoopRunning && isVisible) {
        isLoopRunning = true;
        animFrameId = requestAnimationFrame(updatePhysics);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      isHoveringInteractive = checkInteractiveTarget(e.target);

      if (!isVisible) {
        isVisible = true;
        burgerX = mouseX;
        burgerY = mouseY + WIRE_LENGTH;
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
        }
      }

      startPhysicsLoop();
    };

    const handleMouseEnter = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isVisible = true;
      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
      }
      startPhysicsLoop();
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (containerRef.current) {
        containerRef.current.style.opacity = '0';
      }
    };

    const handleMouseDown = () => {
      isMouseDown = true;
      targetScale = 0.86;
      startPhysicsLoop();
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      targetScale = isHoveringInteractive ? 1.08 : 1;
      startPhysicsLoop();
    };

    // Attach passive listeners for maximum scrolling fluidity
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, []);

  return (
    <div
      id="custom-hanging-burger-cursor"
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 999999,
        opacity: 0,
        transition: 'opacity 0.2s ease-out',
        willChange: 'opacity',
      }}
      className="hidden md:block select-none pointer-events-none"
    >
      {/* SVG Canvas for the hanging golden wire */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      >
        <defs>
          <filter id="burger-wire-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* The golden hanging thread */}
        <path
          ref={wirePathRef}
          d="M 0 0 Q 0 0 0 0"
          fill="none"
          stroke="#C5A059"
          strokeWidth="1.2"
          strokeLinecap="round"
          filter="url(#burger-wire-shadow)"
          opacity="0.9"
        />
      </svg>

      {/* Hanging Gourmet Burger (38px width, GPU accelerated) */}
      <div
        ref={burgerWrapperRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          willChange: 'transform',
          transformOrigin: 'top center',
          pointerEvents: 'none',
        }}
      >
        <div
          ref={burgerInnerRef}
          style={{
            position: 'absolute',
            left: -19,
            top: 0,
            width: 38,
            height: 34,
            transition: 'filter 0.2s ease',
            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.65))',
            pointerEvents: 'none',
          }}
        >
          <svg
            viewBox="0 0 44 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full pointer-events-none"
          >
            {/* Top Attachment Ring */}
            <circle cx="22" cy="3" r="2" fill="none" stroke="#C5A059" strokeWidth="1.2" />
            <circle cx="22" cy="3" r="0.8" fill="#F3E5C8" />
            <path d="M 22 5 L 22 7" stroke="#C5A059" strokeWidth="1.2" />

            {/* Top Brioche Bun */}
            <path
              d="M 6 18 C 6 10 13 7 22 7 C 31 7 38 10 38 18 C 38 19 36 20 22 20 C 8 20 6 19 6 18 Z"
              fill="#E59E27"
              stroke="#A86F15"
              strokeWidth="0.8"
            />
            {/* Bun golden highlight */}
            <path
              d="M 12 12 C 15 9.5 29 9.5 32 12"
              stroke="#FAD179"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* Sesame Seeds */}
            <ellipse cx="14" cy="13" rx="0.9" ry="0.6" fill="#FFF6DC" transform="rotate(-15 14 13)" />
            <ellipse cx="20" cy="11" rx="0.9" ry="0.6" fill="#FFF6DC" transform="rotate(5 20 11)" />
            <ellipse cx="27" cy="12" rx="0.9" ry="0.6" fill="#FFF6DC" transform="rotate(20 27 12)" />
            <ellipse cx="17" cy="15" rx="0.9" ry="0.6" fill="#FFF6DC" transform="rotate(-5 17 15)" />
            <ellipse cx="24" cy="15" rx="0.9" ry="0.6" fill="#FFF6DC" transform="rotate(10 24 15)" />
            <ellipse cx="30" cy="15" rx="0.9" ry="0.6" fill="#FFF6DC" transform="rotate(-10 30 15)" />

            {/* Fresh Tomato Slice */}
            <rect x="8" y="19" width="28" height="3" rx="1.5" fill="#E53E3E" stroke="#C53030" strokeWidth="0.6" />

            {/* Melted Cheddar Cheese with drips */}
            <path
              d="M 5 21.5 L 39 21.5 L 36 25 L 31 23 L 26 26 L 21 23 L 15 25.5 L 11 23 L 7 25 Z"
              fill="#ECC94B"
              stroke="#D69E2E"
              strokeWidth="0.6"
            />

            {/* Flame-Grilled Angus Beef Patty */}
            <rect x="5" y="24" width="34" height="6.5" rx="3" fill="#442314" stroke="#2B140B" strokeWidth="0.8" />
            {/* Charcoal Grill Marks */}
            <line x1="12" y1="25" x2="15" y2="29.5" stroke="#1A0C06" strokeWidth="1" strokeLinecap="round" />
            <line x1="19" y1="25" x2="22" y2="29.5" stroke="#1A0C06" strokeWidth="1" strokeLinecap="round" />
            <line x1="26" y1="25" x2="29" y2="29.5" stroke="#1A0C06" strokeWidth="1" strokeLinecap="round" />

            {/* Crisp Wavy Lettuce Layer */}
            <path
              d="M 4 29.5 C 7 31.5 9 29.5 13 31 C 17 29.5 19 31.5 23 30 C 27 31.5 29 29.5 33 31 C 37 29.5 39 31 40 29.5"
              fill="none"
              stroke="#48BB78"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Bottom Brioche Bun */}
            <path
              d="M 7 30 C 7 30 8 36 22 36 C 36 36 37 30 37 30 Z"
              fill="#D69E2E"
              stroke="#A86F15"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

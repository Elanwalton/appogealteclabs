'use client';

import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';
import { useSpring } from '@react-spring/web';

import { useTheme } from '@/context/ThemeContext';

export default function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const { theme } = useTheme();
  
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: theme === 'dark' ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: theme === 'dark' ? 5 : 6,
      baseColor: theme === 'dark' ? [0.08, 0.15, 0.25] : [0.9, 0.9, 0.9], // Lighter Dark Blue vs Light Gray
      markerColor: theme === 'dark' ? [0.39, 1, 0.85] : [0.1, 0.5, 1], // Cyan (#64ffda) vs Blue
      glowColor: theme === 'dark' ? [0.15, 0.35, 0.35] : [0.8, 0.8, 0.9],
      markers: [
        // Example markers (Lat, Lon)
        { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco
        { location: [40.7128, -74.0060], size: 0.03 }, // New York
        { location: [51.5074, -0.1278], size: 0.03 }, // London
        { location: [1.3521, 103.8198], size: 0.03 }, // Singapore
        { location: [-1.2921, 36.8219], size: 0.1 }, // Nairobi (Featured)
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        if (!pointerInteracting.current) {
          phi += 0.003;
        }
        state.phi = phi + r.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => (canvasRef.current!.style.opacity = '1'));
    return () => { 
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [theme]); // Re-run when theme changes

  return (
    <div className={`relative w-full aspect-square max-w-[600px] mx-auto ${className}`}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          opacity: 0,
          transition: 'opacity 1s ease',
        }}
        onPointerDown={(e: any) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          canvasRef.current!.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = 'grab';
        }}
        onMouseMove={(e: any) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 200,
            });
          }
        }}
        onTouchMove={(e: any) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 100,
            });
          }
        }}
      />
    </div>
  );
}

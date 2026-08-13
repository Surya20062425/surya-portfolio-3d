import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function RouteTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const overlayRef = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      setDisplayLocation(location);
      return;
    }
    if (location.pathname === displayLocation.pathname) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const tl = gsap.timeline();
    tl.set(overlay, { transformOrigin: 'bottom', scaleY: 0, display: 'block' })
      .to(overlay, { scaleY: 1, duration: 0.5, ease: 'power4.inOut' })
      .call(() => setDisplayLocation(location))
      .set(overlay, { transformOrigin: 'top' })
      .to(overlay, { scaleY: 0, duration: 0.55, ease: 'power4.inOut', delay: 0.05 })
      .set(overlay, { display: 'none' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <div ref={overlayRef} className="fixed inset-0 z-[600] bg-black pointer-events-none" style={{ display: 'none' }}>
        <div ref={label} className="w-full h-full flex items-center justify-center">
          <span className="font-space text-xs tracking-[0.3em] uppercase text-accent">SURYA.DEV</span>
        </div>
      </div>
      <Routes location={displayLocation}>{children}</Routes>
    </>
  );
}

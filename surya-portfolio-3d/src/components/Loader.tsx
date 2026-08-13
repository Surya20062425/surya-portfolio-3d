import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = { v: 0 };
    gsap.to(progress, {
      v: 100,
      duration: 1.3,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.round(progress.v);
        setPct(val);
        if (fillRef.current) fillRef.current.style.width = `${val}%`;
      },
      onComplete: () => {
        gsap
          .timeline({ onComplete: onDone })
          .to(rootRef.current?.querySelectorAll('.ldr-item') ?? [], {
            opacity: 0,
            y: -16,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.in',
          })
          .to(rootRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.15');
      },
    });
  }, [onDone]);

  return (
    <div ref={rootRef} className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center gap-5">
      <div className="ldr-item font-space text-3xl md:text-4xl font-semibold">
        SURYA<span className="text-gray-500">.DEV</span>
      </div>
      <div className="ldr-item text-[11px] tracking-[0.28em] uppercase text-gray-500">Entering the world</div>
      <div className="ldr-item w-[60vw] max-w-[320px] h-px bg-white/10 relative overflow-hidden">
        <div ref={fillRef} className="absolute left-0 top-0 h-full bg-white" style={{ width: '0%' }} />
      </div>
      <div className="ldr-item text-xs text-gray-500 tabular-nums">{pct}%</div>
    </div>
  );
}

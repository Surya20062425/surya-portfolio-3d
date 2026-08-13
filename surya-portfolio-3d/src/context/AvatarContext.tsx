import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import type { AvatarState, CameraTarget } from '../types';

interface AvatarContextValue {
  state: AvatarState;
  setState: (s: AvatarState) => void;
  cameraTarget: CameraTarget;
  setCameraTarget: (t: CameraTarget) => void;
  /** Normalized (-1..1) pointer position the avatar's head/eyes should track */
  pointer: { x: number; y: number };
  setPointer: (x: number, y: number) => void;
  /** Fire a short one-off reaction (e.g. on click / form success) without changing the base state */
  pulse: (s: AvatarState, durationMs?: number) => void;
}

const DEFAULT_CAMERA: CameraTarget = { position: [0, 0.4, 6.2], lookAt: [0, 0, 0], fov: 45 };

const AvatarContext = createContext<AvatarContextValue | null>(null);

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [state, setStateRaw] = useState<AvatarState>('IDLE');
  const [cameraTarget, setCameraTarget] = useState<CameraTarget>(DEFAULT_CAMERA);
  const [pointer, setPointerRaw] = useState({ x: 0, y: 0 });
  const pulseTimeout = useRef<number | null>(null);
  const baseState = useRef<AvatarState>('IDLE');

  const setState = useCallback((s: AvatarState) => {
    baseState.current = s;
    if (pulseTimeout.current) return; // don't clobber an active pulse
    setStateRaw(s);
  }, []);

  const pulse = useCallback((s: AvatarState, durationMs = 1400) => {
    if (pulseTimeout.current) window.clearTimeout(pulseTimeout.current);
    setStateRaw(s);
    pulseTimeout.current = window.setTimeout(() => {
      pulseTimeout.current = null;
      setStateRaw(baseState.current);
    }, durationMs);
  }, []);

  const setPointer = useCallback((x: number, y: number) => setPointerRaw({ x, y }), []);

  const value = useMemo(
    () => ({ state, setState, cameraTarget, setCameraTarget, pointer, setPointer, pulse }),
    [state, setState, cameraTarget, pointer, setPointer, pulse]
  );

  return <AvatarContext.Provider value={value}>{children}</AvatarContext.Provider>;
}

export function useAvatar() {
  const ctx = useContext(AvatarContext);
  if (!ctx) throw new Error('useAvatar must be used within an AvatarProvider');
  return ctx;
}

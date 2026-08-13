import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CursorState } from '../types';

interface CursorContextValue {
  state: CursorState;
  label: string;
  setCursor: (state: CursorState, label?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setStateRaw] = useState<CursorState>('default');
  const [label, setLabel] = useState('');

  const setCursor = useCallback((s: CursorState, l = '') => {
    setStateRaw(s);
    setLabel(l);
  }, []);

  const resetCursor = useCallback(() => {
    setStateRaw('default');
    setLabel('');
  }, []);

  const value = useMemo(() => ({ state, label, setCursor, resetCursor }), [state, label, setCursor, resetCursor]);

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error('useCursor must be used within a CursorProvider');
  return ctx;
}

/** Convenience prop-spread for hoverable elements: <div {...cursorHover('project', 'VIEW')}> */
export function useCursorHover() {
  const { setCursor, resetCursor } = useCursor();
  return (state: CursorState, label?: string) => ({
    onMouseEnter: () => setCursor(state, label),
    onMouseLeave: () => resetCursor(),
  });
}

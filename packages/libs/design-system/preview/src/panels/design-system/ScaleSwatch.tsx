import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

import { contrastOnBackground } from '../../swatchContrast';

export function ScaleSwatch({
  label,
  token,
  variable,
}: {
  label: string;
  token: string;
  variable: string;
}) {
  const chipRef = useRef<HTMLSpanElement>(null);
  const [ink, setInk] = useState('rgb(8 8 8)');

  useLayoutEffect(() => {
    const el = chipRef.current;
    if (!el) return;
    setInk(contrastOnBackground(getComputedStyle(el).backgroundColor));
  }, [variable]);

  return (
    <span
      ref={chipRef}
      style={{ '--swatch-color': variable, color: ink } as CSSProperties}
      title={token}
    >
      {label}
    </span>
  );
}

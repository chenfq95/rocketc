import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

import { contrastOnBackground } from './swatchContrast';

type ColorSwatchProps = {
  background: string;
  token: string;
  mapping: string;
  className?: string;
  startsGroup?: boolean;
};

export function ColorSwatch({
  background,
  token,
  mapping,
  className,
  startsGroup,
}: ColorSwatchProps) {
  const chipRef = useRef<HTMLDivElement>(null);
  const [ink, setInk] = useState('rgb(8 8 8)');

  useLayoutEffect(() => {
    const el = chipRef.current;
    if (!el) return;
    setInk(contrastOnBackground(getComputedStyle(el).backgroundColor));
  }, [background]);

  return (
    <>
      {startsGroup ? <div aria-hidden className="color-swatch-grid__break" /> : null}
      <div className={['color-swatch', className].filter(Boolean).join(' ')}>
        <div className="color-swatch__chip" ref={chipRef} style={{ background } as CSSProperties}>
          <code className="color-swatch__token" style={{ color: ink }} title={token}>
            {token}
          </code>
        </div>
        <code className="color-swatch__mapping" title={mapping}>
          {mapping}
        </code>
      </div>
    </>
  );
}

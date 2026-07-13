import type { CSSProperties } from 'react';

import { colorScales, colorSteps } from '../previewModel';

export function PrimitivePanel() {
  return (
    <div className="primitive-layout">
      <article className="panel primitive-panel primitive-panel-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Primitive color</p>
            <h2>Raw color scales</h2>
          </div>
          <span className="badge">Source values</span>
        </div>
        <div className="primitive-color-stack">
          {colorScales.map((scale) => (
            <div className="primitive-row" key={scale}>
              <strong>{scale}</strong>
              <div className="primitive-scale">
                {(scale === 'neutral' ? ['0', ...colorSteps] : colorSteps).map((step) => (
                  <span
                    key={step}
                    style={
                      { '--swatch-color': `var(--rds-color-${scale}-${step})` } as CSSProperties
                    }
                  >
                    {step}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="panel primitive-panel primitive-panel-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Primitive dimension</p>
            <h2>Spacing, radius, and shadow</h2>
          </div>
        </div>
        <div className="primitive-measure-grid">
          <div className="measure-list">
            <h3>Space</h3>
            {['1', '2', '4', '8', '16'].map((step) => (
              <div
                className="measure-item"
                key={step}
                style={{ '--measure': `var(--rds-space-${step})` } as CSSProperties}
              >
                <code>space.{step}</code>
                <span />
                <em>{Number(step) * 4}px</em>
              </div>
            ))}
          </div>
          <div className="measure-list">
            <h3>Radius</h3>
            <div className="radius-grid">
              {['xs', 'sm', 'md', 'lg', '2xl', 'full'].map((radius) => (
                <span
                  key={radius}
                  style={{ '--radius': `var(--rds-radius-${radius})` } as CSSProperties}
                >
                  <code>{radius}</code>
                </span>
              ))}
            </div>
          </div>
          <div className="measure-list">
            <h3>Shadow</h3>
            <div className="shadow-grid">
              {['xs', 'sm', 'md', 'lg'].map((shadow) => (
                <span
                  key={shadow}
                  style={
                    { '--shadow-sample': `var(--rds-shadow-scale-${shadow})` } as CSSProperties
                  }
                >
                  <code>{shadow}</code>
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

import type { CSSProperties } from 'react';

import { colorScales, colorSteps } from '../previewModel';

const spaceSteps = [
  ['0', '0'],
  ['px', '1px'],
  ['0.5', '2px', '0-5'],
  ['1', '4px'],
  ['1.5', '6px', '1-5'],
  ['2', '8px'],
  ['2.5', '10px', '2-5'],
  ['3', '12px'],
  ['3.5', '14px', '3-5'],
  ['4', '16px'],
  ['4.5', '18px', '4-5'],
  ['5', '20px'],
  ['6', '24px'],
  ['7', '28px'],
  ['8', '32px'],
  ['9', '36px'],
  ['10', '40px'],
  ['11', '44px'],
  ['12', '48px'],
  ['14', '56px'],
  ['16', '64px'],
  ['20', '80px'],
  ['24', '96px'],
  ['28', '112px'],
  ['32', '128px'],
  ['40', '160px'],
  ['48', '192px'],
  ['56', '224px'],
  ['64', '256px'],
] as const;

const singleColors = [
  ['black', 'rgb(0 0 0)'],
  ['white', 'rgb(255 255 255)'],
] as const;

const sizeSteps = [
  ['0', '0'],
  ['px', '1px'],
  ['1', '4px'],
  ['2', '8px'],
  ['3', '12px'],
  ['4', '16px'],
  ['5', '20px'],
  ['6', '24px'],
  ['8', '32px'],
  ['10', '40px'],
  ['12', '48px'],
  ['16', '64px'],
  ['20', '80px'],
  ['24', '96px'],
  ['32', '128px'],
  ['40', '160px'],
  ['48', '192px'],
  ['64', '256px'],
] as const;

const measureSteps = [
  ['xs', '480px'],
  ['sm', '640px'],
  ['md', '768px'],
  ['lg', '1024px'],
  ['xl', '1180px'],
  ['2xl', '1440px'],
  ['full', '100%'],
] as const;

const radiusSteps = [
  ['none', '0'],
  ['xs', '2px'],
  ['sm', '4px'],
  ['md', '6px'],
  ['lg', '8px'],
  ['xl', '12px'],
  ['2xl', '16px'],
  ['3xl', '24px'],
  ['full', '999px'],
] as const;

const borderSteps = [
  ['none', '0'],
  ['xs', '0.5px'],
  ['sm', '1px'],
  ['md', '2px'],
  ['lg', '4px'],
] as const;

const breakpointSteps = [
  ['sm', '640px'],
  ['md', '768px'],
  ['lg', '1024px'],
  ['xl', '1280px'],
  ['2xl', '1536px'],
] as const;

const typographySizes = [
  ['xs', '12px'],
  ['sm', '14px'],
  ['md', '16px'],
  ['lg', '18px'],
  ['xl', '20px'],
  ['2xl', '24px'],
  ['3xl', '30px'],
  ['4xl', '36px'],
  ['5xl', '48px'],
  ['6xl', '60px'],
  ['7xl', '72px'],
] as const;

const typographyWeights = [
  ['thin', '100'],
  ['extralight', '200'],
  ['light', '300'],
  ['normal', '400'],
  ['medium', '500'],
  ['semibold', '600'],
  ['bold', '700'],
  ['extrabold', '800'],
  ['black', '900'],
] as const;

const lineHeights = [
  ['none', '1'],
  ['tight', '1.15'],
  ['snug', '1.25'],
  ['normal', '1.5'],
  ['relaxed', '1.625'],
  ['loose', '2'],
] as const;

const letterSpacings = [
  ['normal', '0'],
  ['wide', '0.2px'],
] as const;

const shadowSteps = [
  ['none', '0 0 0 0 / 0'],
  ['xs', '0 1px 1px / 0.06'],
  ['sm', '0 1px 2px / 0.08'],
  ['md', '0 8px 24px / 0.12'],
  ['lg', '0 20px 48px / 0.18'],
  ['xl', '0 28px 64px / 0.22'],
] as const;

const opacitySteps = [
  ['0', '0'],
  ['4', '0.04'],
  ['5', '0.05'],
  ['8', '0.08'],
  ['10', '0.1'],
  ['12', '0.12'],
  ['20', '0.2'],
  ['24', '0.24'],
  ['30', '0.3'],
  ['38', '0.38'],
  ['40', '0.4'],
  ['50', '0.5'],
  ['60', '0.6'],
  ['70', '0.7'],
  ['80', '0.8'],
  ['90', '0.9'],
  ['100', '1'],
] as const;

const blurSteps = [
  ['none', '0'],
  ['xs', '2px'],
  ['sm', '4px'],
  ['md', '8px'],
  ['lg', '12px'],
  ['xl', '16px'],
  ['2xl', '24px'],
] as const;

const durationSteps = [
  ['instant', '0', '48px'],
  ['fast', '120ms', '78px'],
  ['normal', '180ms', '94px'],
  ['slow', '260ms', '114px'],
  ['slower', '360ms', '140px'],
] as const;

const easingSteps = [
  ['linear', 'cubic-bezier(0, 0, 1, 1)'],
  ['standard', 'cubic-bezier(0.2, 0, 0, 1)'],
  ['enter', 'cubic-bezier(0.16, 1, 0.3, 1)'],
  ['exit', 'cubic-bezier(0.7, 0, 0.84, 0)'],
  ['emphasized', 'cubic-bezier(0.2, 0, 0, 1.2)'],
] as const;

const zIndexSteps = [
  ['-1', '-1', '1'],
  ['0', '0'],
  ['10', '10'],
  ['100', '100'],
  ['200', '200'],
  ['300', '300'],
  ['400', '400'],
  ['500', '500'],
  ['600', '600'],
  ['700', '700'],
] as const;

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
          <div className="primitive-row">
            <strong>single</strong>
            <div className="primitive-single-grid">
              {singleColors.map(([color, value]) => (
                <span
                  key={color}
                  style={{ '--swatch-color': `var(--rds-color-${color})` } as CSSProperties}
                >
                  <code>{color}</code>
                  <em>{value}</em>
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      <article className="panel primitive-panel primitive-panel-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Primitive dimension</p>
            <h2>Spacing, size, measure, radius, border, and breakpoint</h2>
          </div>
        </div>
        <div className="primitive-measure-grid">
          <div className="measure-list">
            <h3>Space</h3>
            {spaceSteps.map(([step, value, varStep = step]) => (
              <div
                className="measure-item"
                key={step}
                style={{ '--measure': `var(--rds-space-${varStep})` } as CSSProperties}
              >
                <code>space.{step}</code>
                <span />
                <em>{value}</em>
              </div>
            ))}
          </div>
          <div className="measure-list">
            <h3>Size</h3>
            {sizeSteps.map(([step, value]) => (
              <div
                className="size-row"
                key={step}
                style={{ '--box-size': `var(--rds-size-${step})` } as CSSProperties}
              >
                <span />
                <code>size.{step}</code>
                <em>{value}</em>
              </div>
            ))}
          </div>
          <div className="measure-list">
            <h3>Radius</h3>
            <div className="radius-grid">
              {radiusSteps.map(([radius, value]) => (
                <span
                  key={radius}
                  style={{ '--radius': `var(--rds-radius-${radius})` } as CSSProperties}
                >
                  <code>{radius}</code>
                  <em>{value}</em>
                </span>
              ))}
            </div>
          </div>
          <div className="measure-list">
            <h3>Border</h3>
            <div className="token-table">
              {borderSteps.map(([step, value]) => (
                <div key={step}>
                  <code>border.{step}</code>
                  <span
                    className="border-sample"
                    style={{ '--border-width': `var(--rds-border-${step})` } as CSSProperties}
                  />
                  <em>{value}</em>
                </div>
              ))}
            </div>
          </div>
          <div className="measure-list">
            <h3>Measure</h3>
            <div className="token-table">
              {measureSteps.map(([step, value]) => (
                <div key={step}>
                  <code>measure.{step}</code>
                  <em>{value}</em>
                </div>
              ))}
            </div>
          </div>
          <div className="measure-list">
            <h3>Breakpoint</h3>
            <div className="token-table">
              {breakpointSteps.map(([step, value]) => (
                <div key={step}>
                  <code>breakpoint.{step}</code>
                  <em>{value}</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      <article className="panel primitive-panel primitive-panel-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Primitive typography</p>
            <h2>Families, sizes, weights, line heights, and letter spacing</h2>
          </div>
        </div>
        <div className="primitive-measure-grid">
          <div className="measure-list primitive-panel-wide">
            <h3>Size</h3>
            <div className="type-scale">
              {typographySizes.map(([size, value]) => (
                <div
                  key={size}
                  style={{ '--type-size': `var(--rds-typography-size-${size})` } as CSSProperties}
                >
                  <code>size.{size}</code>
                  <span>Rocketc typography</span>
                  <em>{value}</em>
                </div>
              ))}
            </div>
          </div>
          <div className="measure-list">
            <h3>Family</h3>
            <div className="token-table">
              <div>
                <code>family.sans</code>
                <span className="family-sans">Noto Sans SC, system-ui</span>
              </div>
              <div>
                <code>family.mono</code>
                <span className="family-mono">Noto Sans Mono, monospace</span>
              </div>
            </div>
          </div>
          <div className="measure-list">
            <h3>Weight</h3>
            <div className="token-table">
              {typographyWeights.map(([weight, value]) => (
                <div key={weight}>
                  <code>weight.{weight}</code>
                  <span
                    style={
                      { '--type-weight': `var(--rds-typography-weight-${weight})` } as CSSProperties
                    }
                  >
                    Aa
                  </span>
                  <em>{value}</em>
                </div>
              ))}
            </div>
          </div>
          <div className="measure-list">
            <h3>Line height</h3>
            <div className="token-table">
              {lineHeights.map(([step, value]) => (
                <div key={step}>
                  <code>lineHeight.{step}</code>
                  <span
                    className="line-height-sample"
                    style={
                      {
                        '--line-height': `var(--rds-typography-line-height-${step})`,
                      } as CSSProperties
                    }
                  >
                    Two lines of text
                    <br />
                    showing rhythm
                  </span>
                  <em>{value}</em>
                </div>
              ))}
            </div>
          </div>
          <div className="measure-list">
            <h3>Letter spacing</h3>
            <div className="token-table">
              {letterSpacings.map(([step, value]) => (
                <div key={step}>
                  <code>letterSpacing.{step}</code>
                  <span
                    style={
                      {
                        '--letter-spacing': `var(--rds-typography-letter-spacing-${step})`,
                      } as CSSProperties
                    }
                  >
                    ROCKETC
                  </span>
                  <em>{value}</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      <article className="panel primitive-panel">
        <div className="panel-header">
          <div>
            <p className="meta">Primitive shadow</p>
            <h2>Elevation shadows</h2>
          </div>
        </div>
        <div className="shadow-grid">
          {shadowSteps.map(([shadow, value]) => (
            <span
              key={shadow}
              style={{ '--shadow-sample': `var(--rds-shadow-${shadow})` } as CSSProperties}
            >
              <code>{shadow}</code>
              <em>{value}</em>
            </span>
          ))}
        </div>
      </article>

      <article className="panel primitive-panel">
        <div className="panel-header">
          <div>
            <p className="meta">Primitive opacity</p>
            <h2>Alpha scale</h2>
          </div>
        </div>
        <div className="opacity-list">
          {opacitySteps.map(([opacity, value]) => (
            <span
              key={opacity}
              style={{ '--alpha': `var(--rds-opacity-${opacity})` } as CSSProperties}
            >
              <code>{opacity}</code>
              <em>{value}</em>
            </span>
          ))}
        </div>
      </article>

      <article className="panel primitive-panel">
        <div className="panel-header">
          <div>
            <p className="meta">Primitive blur</p>
            <h2>Backdrop blur scale</h2>
          </div>
        </div>
        <div className="blur-grid">
          {blurSteps.map(([blur, value]) => (
            <span key={blur} style={{ '--blur': `var(--rds-blur-${blur})` } as CSSProperties}>
              <code>{blur}</code>
              <em>{value}</em>
            </span>
          ))}
        </div>
      </article>

      <article className="panel primitive-panel">
        <div className="panel-header">
          <div>
            <p className="meta">Primitive motion</p>
            <h2>Duration and easing</h2>
          </div>
        </div>
        <div className="motion-list">
          {durationSteps.map(([duration, value, width]) => (
            <div key={duration}>
              <code>duration.{duration}</code>
              <span style={{ '--motion-width': width } as CSSProperties}>{value}</span>
            </div>
          ))}
          {easingSteps.map(([easing, value]) => (
            <div key={easing}>
              <code>easing.{easing}</code>
              <em>{value}</em>
            </div>
          ))}
        </div>
      </article>

      <article className="panel primitive-panel primitive-panel-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Primitive z-index</p>
            <h2>Stacking scale</h2>
          </div>
        </div>
        <div className="z-index-ladder">
          {zIndexSteps.map(([step, value, varStep = step], index) => (
            <span
              key={step}
              style={
                {
                  '--layer': index,
                  '--z-token': `var(--rds-z-index-${varStep})`,
                } as CSSProperties
              }
            >
              <code>{step}</code>
              <em>{value}</em>
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}

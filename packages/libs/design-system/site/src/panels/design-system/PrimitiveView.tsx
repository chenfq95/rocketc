import type { CSSProperties } from 'react';

import { ColorSwatch } from '../../ColorSwatch';
import { colorScales, colorSteps } from '../../previewModel';
import {
  blurSteps,
  borderSteps,
  breakpointSteps,
  durationSteps,
  easingSteps,
  letterSpacings,
  lineHeights,
  measureSteps,
  opacitySteps,
  radiusSteps,
  shadowSteps,
  singleColors,
  sizeSteps,
  spaceSteps,
  typographySizes,
  typographyWeights,
  zIndexSteps,
} from './primitiveSteps';
import { PreviewPanel } from './PreviewPanel';
import { ScaleSwatch } from './ScaleSwatch';

export function PrimitiveView() {
  return (
    <div className="primitive-layout" role="tabpanel">
      <PreviewPanel meta="Primitive color" title="Raw color scales" badge="Source values">
        <div className="primitive-color-stack">
          {colorScales.map((scale) => (
            <div className="primitive-row" key={scale}>
              <strong>{scale}</strong>
              <div className="primitive-scale">
                {(scale === 'neutral' ? ['0', ...colorSteps] : colorSteps).map((step) => (
                  <ScaleSwatch
                    key={step}
                    label={step}
                    token={`${scale}.${step}`}
                    variable={`var(--rc-color-${scale}-${step})`}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="primitive-row">
            <strong>single</strong>
            <div className="color-swatch-grid">
              {singleColors.map(([color, value]) => (
                <ColorSwatch
                  background={`var(--rc-color-${color})`}
                  key={color}
                  mapping={value}
                  token={color}
                />
              ))}
            </div>
          </div>
        </div>
      </PreviewPanel>

      <PreviewPanel
        meta="Primitive dimension"
        title="Spacing, size, measure, radius, border, and breakpoint"
      >
        <div className="primitive-dimension-stack">
          <div className="measure-list measure-list--inline">
            <rc-typography variant="label" as="h3">
              Space
            </rc-typography>
            <div className="measure-list__track">
              {spaceSteps.map(([step, value, varStep = step]) => (
                <div
                  className="measure-item"
                  key={step}
                  style={{ '--measure': `var(--rc-space-${varStep})` } as CSSProperties}
                >
                  <code>space.{step}</code>
                  <span />
                  <em>{value}</em>
                </div>
              ))}
            </div>
          </div>
          <div className="measure-list measure-list--inline">
            <rc-typography variant="label" as="h3">
              Size
            </rc-typography>
            <div className="measure-list__track">
              {sizeSteps.map(([step, value]) => (
                <div
                  className="size-row"
                  key={step}
                  style={{ '--box-size': `var(--rc-size-${step})` } as CSSProperties}
                >
                  <span />
                  <code>size.{step}</code>
                  <em>{value}</em>
                </div>
              ))}
            </div>
          </div>
          <div className="measure-list measure-list--inline">
            <rc-typography variant="label" as="h3">
              Radius
            </rc-typography>
            <div className="measure-list__track radius-grid">
              {radiusSteps.map(([radius, value]) => (
                <span
                  key={radius}
                  style={{ '--radius': `var(--rc-radius-${radius})` } as CSSProperties}
                >
                  <code>{radius}</code>
                  <em>{value}</em>
                </span>
              ))}
            </div>
          </div>
          <div className="measure-list measure-list--inline">
            <rc-typography variant="label" as="h3">
              Border
            </rc-typography>
            <div className="measure-list__track">
              {borderSteps.map(([step, value]) => (
                <div className="dimension-chip" key={step}>
                  <code>border.{step}</code>
                  <span
                    className="border-sample"
                    style={{ '--border-width': `var(--rc-border-${step})` } as CSSProperties}
                  />
                  <em>{value}</em>
                </div>
              ))}
            </div>
          </div>
          <div className="measure-list measure-list--inline">
            <rc-typography variant="label" as="h3">
              Measure
            </rc-typography>
            <div className="measure-list__track">
              {measureSteps.map(([step, value]) => (
                <div className="dimension-chip" key={step}>
                  <code>measure.{step}</code>
                  <em>{value}</em>
                </div>
              ))}
            </div>
          </div>
          <div className="measure-list measure-list--inline">
            <rc-typography variant="label" as="h3">
              Breakpoint
            </rc-typography>
            <div className="measure-list__track">
              {breakpointSteps.map(([step, value]) => (
                <div className="dimension-chip" key={step}>
                  <code>breakpoint.{step}</code>
                  <em>{value}</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PreviewPanel>

      <PreviewPanel
        meta="Primitive typography"
        title="Families, sizes, weights, line heights, and letter spacing"
      >
        <div className="primitive-measure-grid">
          <div className="measure-list primitive-panel-wide">
            <rc-typography variant="label" as="h3">
              Size
            </rc-typography>
            <div className="type-scale">
              {typographySizes.map(([size, value]) => (
                <div
                  key={size}
                  style={{ '--type-size': `var(--rc-typography-size-${size})` } as CSSProperties}
                >
                  <code>size.{size}</code>
                  <span>Rocketc typography</span>
                  <em>{value}</em>
                </div>
              ))}
            </div>
          </div>
          <div className="measure-list">
            <rc-typography variant="label" as="h3">
              Family
            </rc-typography>
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
            <rc-typography variant="label" as="h3">
              Weight
            </rc-typography>
            <div className="token-table">
              {typographyWeights.map(([weight, value]) => (
                <div key={weight}>
                  <code>weight.{weight}</code>
                  <span
                    style={
                      { '--type-weight': `var(--rc-typography-weight-${weight})` } as CSSProperties
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
            <rc-typography variant="label" as="h3">
              Line height
            </rc-typography>
            <div className="token-table">
              {lineHeights.map(([step, value]) => (
                <div key={step}>
                  <code>lineHeight.{step}</code>
                  <span
                    className="line-height-sample"
                    style={
                      {
                        '--line-height': `var(--rc-typography-line-height-${step})`,
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
            <rc-typography variant="label" as="h3">
              Letter spacing
            </rc-typography>
            <div className="token-table">
              {letterSpacings.map(([step, value]) => (
                <div key={step}>
                  <code>letterSpacing.{step}</code>
                  <span
                    style={
                      {
                        '--letter-spacing': `var(--rc-typography-letter-spacing-${step})`,
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
      </PreviewPanel>

      <PreviewPanel meta="Primitive effect" title="Shadow, opacity, blur, and motion">
        <div className="primitive-dimension-stack">
          <div className="measure-list measure-list--inline">
            <rc-typography variant="label" as="h3">
              Shadow
            </rc-typography>
            <div className="measure-list__track shadow-grid">
              {shadowSteps.map(([shadow, value]) => (
                <span
                  key={shadow}
                  style={{ '--shadow-sample': `var(--rc-shadow-${shadow})` } as CSSProperties}
                >
                  <code>{shadow}</code>
                  <em>{value}</em>
                </span>
              ))}
            </div>
          </div>
          <div className="measure-list measure-list--inline">
            <rc-typography variant="label" as="h3">
              Opacity
            </rc-typography>
            <div className="measure-list__track opacity-list">
              {opacitySteps.map(([opacity, value]) => (
                <span
                  key={opacity}
                  style={{ '--alpha': `var(--rc-opacity-${opacity})` } as CSSProperties}
                >
                  <code>{opacity}</code>
                  <em>{value}</em>
                </span>
              ))}
            </div>
          </div>
          <div className="measure-list measure-list--inline">
            <rc-typography variant="label" as="h3">
              Blur
            </rc-typography>
            <div className="measure-list__track blur-grid">
              {blurSteps.map(([blur, value]) => (
                <span key={blur} style={{ '--blur': `var(--rc-blur-${blur})` } as CSSProperties}>
                  <code>{blur}</code>
                  <em>{value}</em>
                </span>
              ))}
            </div>
          </div>
          <div className="measure-list measure-list--inline">
            <rc-typography variant="label" as="h3">
              Duration
            </rc-typography>
            <div className="measure-list__track motion-list">
              {durationSteps.map(([duration, value, width]) => (
                <div key={duration}>
                  <code>duration.{duration}</code>
                  <span style={{ '--motion-width': width } as CSSProperties}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="measure-list measure-list--inline">
            <rc-typography variant="label" as="h3">
              Easing
            </rc-typography>
            <div className="measure-list__track motion-list">
              {easingSteps.map(([easing, value]) => (
                <div key={easing}>
                  <code>easing.{easing}</code>
                  <em>{value}</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PreviewPanel>

      <PreviewPanel meta="Primitive z-index" title="Stacking scale">
        <div className="z-index-ladder">
          {zIndexSteps.map(([step, value, varStep = step], index) => (
            <span
              key={step}
              style={
                {
                  '--layer': index,
                  '--z-token': `var(--rc-z-index-${varStep})`,
                } as CSSProperties
              }
            >
              <code>{step}</code>
              <em>{value}</em>
            </span>
          ))}
        </div>
      </PreviewPanel>
    </div>
  );
}

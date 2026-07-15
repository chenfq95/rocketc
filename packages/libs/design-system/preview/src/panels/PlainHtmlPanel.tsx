import type { CSSProperties } from 'react';

import {
  colorRoles,
  elevationSteps,
  plainTypographyRoles,
  startsTokenGroup,
  type DesignThemeName,
} from '../previewModel';
import { semanticColorSource } from '../tokenSource';

const plainButtonPalettes = [
  {
    label: 'Default',
    vars: {
      '--button-soft': 'var(--rds-color-action-hover)',
      '--button-border': 'var(--rds-color-border-default)',
      '--button-text': 'var(--rds-color-text-primary)',
      '--button-solid': 'var(--rds-color-text-primary)',
      '--button-solid-hover': 'var(--rds-color-text-secondary)',
      '--button-solid-active': 'var(--rds-color-text-muted)',
      '--button-contrast': 'var(--rds-color-text-inverse)',
    },
  },
  {
    label: 'Brand',
    vars: {
      '--button-soft': 'var(--rds-color-brand-soft)',
      '--button-border': 'var(--rds-color-brand-border)',
      '--button-text': 'var(--rds-color-brand-fg)',
      '--button-solid': 'var(--rds-color-brand-solid)',
      '--button-solid-hover': 'var(--rds-color-brand-solid-hover)',
      '--button-solid-active': 'var(--rds-color-brand-solid-active)',
      '--button-contrast': 'var(--rds-color-brand-contrast)',
    },
  },
  {
    label: 'Success',
    vars: {
      '--button-soft': 'var(--rds-color-success-soft)',
      '--button-border': 'var(--rds-color-success-border)',
      '--button-text': 'var(--rds-color-success-fg)',
      '--button-solid': 'var(--rds-color-success-solid)',
      '--button-solid-hover': 'var(--rds-color-success-solid-hover)',
      '--button-solid-active': 'var(--rds-color-success-solid-active)',
      '--button-contrast': 'var(--rds-color-success-contrast)',
    },
  },
  {
    label: 'Warning',
    vars: {
      '--button-soft': 'var(--rds-color-warning-soft)',
      '--button-border': 'var(--rds-color-warning-border)',
      '--button-text': 'var(--rds-color-warning-fg)',
      '--button-solid': 'var(--rds-color-warning-solid)',
      '--button-solid-hover': 'var(--rds-color-warning-solid-hover)',
      '--button-solid-active': 'var(--rds-color-warning-solid-active)',
      '--button-contrast': 'var(--rds-color-warning-contrast)',
    },
  },
  {
    label: 'Danger',
    vars: {
      '--button-soft': 'var(--rds-color-danger-soft)',
      '--button-border': 'var(--rds-color-danger-border)',
      '--button-text': 'var(--rds-color-danger-fg)',
      '--button-solid': 'var(--rds-color-danger-solid)',
      '--button-solid-hover': 'var(--rds-color-danger-solid-hover)',
      '--button-solid-active': 'var(--rds-color-danger-solid-active)',
      '--button-contrast': 'var(--rds-color-danger-contrast)',
    },
  },
  {
    label: 'Info',
    vars: {
      '--button-soft': 'var(--rds-color-info-soft)',
      '--button-border': 'var(--rds-color-info-border)',
      '--button-text': 'var(--rds-color-info-fg)',
      '--button-solid': 'var(--rds-color-info-solid)',
      '--button-solid-hover': 'var(--rds-color-info-solid-hover)',
      '--button-solid-active': 'var(--rds-color-info-solid-active)',
      '--button-contrast': 'var(--rds-color-info-contrast)',
    },
  },
] as const;

const plainButtonVariants = [
  { label: 'solid', disabled: false, variant: 'solid' },
  { label: 'subtle', disabled: false, variant: 'subtle' },
  { label: 'surface', disabled: false, variant: 'surface' },
  { label: 'outline', disabled: false, variant: 'outline' },
  { label: 'ghost', disabled: false, variant: 'ghost' },
  { label: 'plain', disabled: false, variant: 'plain' },
  { label: 'disabled', disabled: true, variant: 'solid' },
] as const;

export function PlainHtmlPanel({ themeName }: { themeName: DesignThemeName }) {
  return (
    <div className="overview-layout" aria-label="Plain HTML preview">
      <article className="panel feature overview-section">
        <div className="panel-header">
          <div>
            <p className="meta">Plain HTML</p>
            <h2>Brand, control, and state roles</h2>
          </div>
          <span className="badge">Semantic</span>
        </div>
        <p>
          Color is assigned by role first. Brand carries identity, control roles define interactive
          recipes, and status colors are reserved for communication and feedback.
        </p>
        <div className="overview-swatches">
          {colorRoles.map(([label, token, color], index) => (
            <div
              className={[
                startsTokenGroup(colorRoles, index) ? 'starts-color-group' : undefined,
                token === 'surface.panel' ? 'is-panel' : undefined,
                token === 'surface.elevated' ? 'is-elevated' : undefined,
              ]
                .filter(Boolean)
                .join(' ')}
              key={token}
              style={{ '--swatch-color': color } as CSSProperties}
            >
              <span />
              <strong>{label}</strong>
              <code>{token}</code>
              <code className="primitive-source">{semanticColorSource(themeName, token)}</code>
            </div>
          ))}
        </div>
      </article>

      <article className="panel overview-section">
        <div className="panel-header">
          <div>
            <p className="meta">Typography</p>
            <h2>Clear hierarchy for tools and docs</h2>
          </div>
        </div>
        <div className="overview-type">
          {plainTypographyRoles.map(([label, token, cssName, sample]) => (
            <div key={token}>
              <code>{label}</code>
              <span
                className="type-sample"
                style={
                  {
                    fontFamily: `var(--rds-typography-${cssName}-font-family)`,
                    fontSize: `var(--rds-typography-${cssName}-font-size)`,
                    fontWeight: `var(--rds-typography-${cssName}-font-weight)`,
                    lineHeight: `var(--rds-typography-${cssName}-line-height)`,
                    letterSpacing: `var(--rds-typography-${cssName}-letter-spacing)`,
                  } as CSSProperties
                }
              >
                {sample}
              </span>
              <code>{token}</code>
            </div>
          ))}
        </div>
      </article>

      <article className="panel overview-section overview-section-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Elevation</p>
            <h2>Three depth steps for tool UI</h2>
          </div>
          <span className="badge">Depth</span>
        </div>
        <p>
          Light mode separates depth with border and shadow; dark mode leans on surface color steps.
          Elevated surfaces must use <code>shadow.raised</code>.
        </p>
        <div className="elevation-stage" aria-label="Elevation ladder">
          {elevationSteps.map(([label, token, recipe, detail]) => (
            <div className={`elevation-card surface-${recipe}`} key={recipe}>
              <strong>{label}</strong>
              <code>{token}</code>
              <p>{detail}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="panel overview-section overview-section-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Components</p>
            <h2>Controls composed from the same token roles</h2>
          </div>
          <span className="badge">Portable</span>
        </div>
        <div className="overview-components">
          <div className="component-demo component-demo-wide">
            <h3>Buttons</h3>
            <div className="plain-button-grid">
              {plainButtonPalettes.map((palette) => (
                <div className="plain-button-row" key={palette.label}>
                  <strong>{palette.label}</strong>
                  {plainButtonVariants.map((variant) => (
                    <button
                      className="button token-button"
                      data-variant={variant.variant}
                      disabled={variant.disabled}
                      key={variant.label}
                      style={palette.vars as CSSProperties}
                      type="button"
                    >
                      {variant.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="component-demo">
            <h3>Actions</h3>
            <div className="button-row">
              <button className="button primary" type="button">
                Primary action
              </button>
              <button className="button secondary" type="button">
                Secondary
              </button>
              <button className="button quiet" type="button">
                Quiet
              </button>
            </div>
            <div className="status-list">
              <span className="status success">Success</span>
              <span className="status warning">Warning</span>
              <span className="status danger">Danger</span>
              <span className="status info">Info</span>
            </div>
          </div>

          <div className="component-demo">
            <h3>Inputs</h3>
            <label className="field">
              <span>Workspace name</span>
              <input readOnly value="Rocketc Studio" />
            </label>
            <label className="field">
              <span>Status</span>
              <select defaultValue="Designing tokens">
                <option>Designing tokens</option>
                <option>Building assets</option>
                <option>Ready to ship</option>
              </select>
            </label>
          </div>

          <div className="component-demo">
            <h3>Selection</h3>
            <div className="choice-list">
              <button className="choice-row is-selected" type="button">
                <span className="choice-indicator checkmark" />
                <span>
                  <strong>CSS variables</strong>
                  <em>Generate light and dark CSS outputs.</em>
                </span>
              </button>
              <button className="choice-row" type="button">
                <span className="choice-indicator checkmark" />
                <span>
                  <strong>Material UI theme</strong>
                  <em>Use generated theme options at runtime.</em>
                </span>
              </button>
            </div>
            <div className="segmented-control" aria-label="Preview adapter">
              <span className="is-selected">Tokens</span>
              <span>CSS</span>
              <span>MUI</span>
            </div>
          </div>

          <div className="component-demo">
            <h3>Status</h3>
            <div className="alert success">
              <strong>Build complete</strong>
              <span>Token outputs were generated successfully.</span>
            </div>
            <div className="alert warning">
              <strong>Review needed</strong>
              <span>Contrast should be checked before release.</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

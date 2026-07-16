import type { CSSProperties } from 'react';

import { ColorSwatch } from '../../ColorSwatch';
import {
  colorRoles,
  elevationSteps,
  plainTypographyRoles,
  startsTokenGroup,
  type DesignThemeName,
} from '../../previewModel';
import { semanticColorSource } from '../../tokenSource';
import { layoutRoles, opacityRoles, shadowRoles, zIndexRoles } from './semanticRoles';

export function SemanticView({ themeName }: { themeName: DesignThemeName }) {
  return (
    <div className="primitive-layout" role="tabpanel">
      <article className="panel feature overview-section primitive-panel primitive-panel-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Semantic color</p>
            <h2>Brand, control, and state roles</h2>
          </div>
          <span className="badge">Semantic</span>
        </div>
        <p>
          Color is assigned by role first. Brand carries identity, control roles define interactive
          recipes, and status colors are reserved for communication and feedback.
        </p>
        <div className="color-swatch-grid" style={{ marginTop: 'var(--rds-space-3)' }}>
          {colorRoles.map(([, token, color], index) => (
            <ColorSwatch
              background={color}
              className={
                token === 'surface.panel'
                  ? 'is-panel'
                  : token === 'surface.elevated'
                    ? 'is-elevated'
                    : undefined
              }
              key={token}
              mapping={semanticColorSource(themeName, token)}
              startsGroup={startsTokenGroup(colorRoles, index)}
              token={token}
            />
          ))}
        </div>
      </article>

      <article className="panel overview-section primitive-panel primitive-panel-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Semantic typography</p>
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

      <article className="panel overview-section primitive-panel primitive-panel-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Semantic elevation</p>
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

      <article className="panel primitive-panel primitive-panel-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Semantic shadow</p>
            <h2>Surface, raised, overlay, and focus</h2>
          </div>
        </div>
        <p>
          Product UI stays on these four roles. Pair <code>surface.elevated</code> with{' '}
          <code>shadow.raised</code> (or <code>shadow.overlay</code> for top chrome).
        </p>
        <div className="measure-list">
          <div className="measure-list__track shadow-grid">
            {shadowRoles.map(([role, token, detail, source]) => (
              <span
                key={token}
                style={{ '--shadow-sample': `var(--rds-shadow-${role})` } as CSSProperties}
                title={detail}
              >
                <code>{token}</code>
                <em>{source}</em>
              </span>
            ))}
          </div>
        </div>
      </article>

      <article className="panel primitive-panel primitive-panel-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Semantic layout</p>
            <h2>Shell geometry roles</h2>
          </div>
        </div>
        <p>
          Prefer these over magic numbers for page, reading, header, toolbar, and sidebar rhythm.
        </p>
        <div className="measure-list">
          <div className="measure-list__track">
            {layoutRoles.map(([label, token, cssName, value]) => (
              <div
                className="dimension-chip"
                key={token}
                title={`${token} → --rds-layout-${cssName}`}
              >
                <code>{label}</code>
                <em>{value}</em>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className="panel primitive-panel primitive-panel-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Semantic z-index</p>
            <h2>Stacking roles</h2>
          </div>
        </div>
        <p>
          Low → high: base · raised · dropdown · sticky · overlay · modal · popover · toast ·
          tooltip. Pair with elevation—modals use <code>shadow.overlay</code>.
        </p>
        <div className="z-index-ladder">
          {zIndexRoles.map(([role, token, value], index) => (
            <span
              key={token}
              style={
                {
                  '--layer': index,
                  '--z-token': `var(--rds-z-index-${role})`,
                } as CSSProperties
              }
            >
              <code>{role}</code>
              <em>{value}</em>
            </span>
          ))}
        </div>
      </article>

      <article className="panel primitive-panel primitive-panel-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Semantic opacity</p>
            <h2>State and overlay alphas</h2>
          </div>
        </div>
        <p>Prefer these roles over hard-coded alphas in components.</p>
        <div className="measure-list">
          <div className="measure-list__track opacity-list">
            {opacityRoles.map(([label, token, cssName, value]) => (
              <span
                key={token}
                style={{ '--alpha': `var(--rds-opacity-${cssName})` } as CSSProperties}
                title={token}
              >
                <code>{label}</code>
                <em>{value}</em>
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

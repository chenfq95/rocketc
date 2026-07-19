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
import { PreviewPanel } from './PreviewPanel';
import { layoutRoles, opacityRoles, shadowRoles, zIndexRoles } from './semanticRoles';

export function SemanticView({ themeName }: { themeName: DesignThemeName }) {
  return (
    <div className="primitive-layout" role="tabpanel">
      <PreviewPanel
        className="feature"
        meta="Semantic color"
        title="Brand, control, and state roles"
        badge="Semantic"
      >
        <rc-typography variant="body" color="secondary" as="p">
          Color is assigned by role first. Brand carries identity, control roles define interactive
          recipes, and status colors are reserved for communication and feedback.
        </rc-typography>
        <div className="color-swatch-grid" style={{ marginTop: 'var(--rc-space-3)' }}>
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
      </PreviewPanel>

      <PreviewPanel meta="Semantic typography" title="Clear hierarchy for tools and docs">
        <div className="overview-type">
          {plainTypographyRoles.map(([label, token, cssName, sample]) => (
            <div key={token}>
              <code>{label}</code>
              <span
                className="type-sample"
                style={
                  {
                    fontFamily: `var(--rc-typography-${cssName}-font-family)`,
                    fontSize: `var(--rc-typography-${cssName}-font-size)`,
                    fontWeight: `var(--rc-typography-${cssName}-font-weight)`,
                    lineHeight: `var(--rc-typography-${cssName}-line-height)`,
                    letterSpacing: `var(--rc-typography-${cssName}-letter-spacing)`,
                  } as CSSProperties
                }
              >
                {sample}
              </span>
              <code>{token}</code>
            </div>
          ))}
        </div>
      </PreviewPanel>

      <PreviewPanel meta="Semantic elevation" title="Three depth steps for tool UI" badge="Depth">
        <rc-typography variant="body" color="secondary" as="p">
          Light mode separates depth with border and shadow; dark mode leans on surface color steps.
          Elevated surfaces must use <code>shadow.raised</code>.
        </rc-typography>
        <div className="elevation-stage" aria-label="Elevation ladder">
          {elevationSteps.map(([label, token, recipe, detail]) => (
            <div className={`elevation-card surface-${recipe}`} key={recipe}>
              <strong>{label}</strong>
              <code>{token}</code>
              <rc-typography variant="body" color="secondary" as="p">
                {detail}
              </rc-typography>
            </div>
          ))}
        </div>
      </PreviewPanel>

      <PreviewPanel meta="Semantic shadow" title="Surface, raised, overlay, and focus">
        <rc-typography variant="body" color="secondary" as="p">
          Product UI stays on these four roles. Pair <code>surface.elevated</code> with{' '}
          <code>shadow.raised</code> (or <code>shadow.overlay</code> for top chrome).
        </rc-typography>
        <div className="measure-list">
          <div className="measure-list__track shadow-grid">
            {shadowRoles.map(([role, token, detail, source]) => (
              <span
                key={token}
                style={{ '--shadow-sample': `var(--rc-shadow-${role})` } as CSSProperties}
                title={detail}
              >
                <code>{token}</code>
                <em>{source}</em>
              </span>
            ))}
          </div>
        </div>
      </PreviewPanel>

      <PreviewPanel meta="Semantic layout" title="Shell geometry roles">
        <rc-typography variant="body" color="secondary" as="p">
          Prefer these over magic numbers for page, reading, header, toolbar, and sidebar rhythm.
        </rc-typography>
        <div className="measure-list">
          <div className="measure-list__track">
            {layoutRoles.map(([label, token, cssName, value]) => (
              <div
                className="dimension-chip"
                key={token}
                title={`${token} → --rc-layout-${cssName}`}
              >
                <code>{label}</code>
                <em>{value}</em>
              </div>
            ))}
          </div>
        </div>
      </PreviewPanel>

      <PreviewPanel meta="Semantic z-index" title="Stacking roles">
        <rc-typography variant="body" color="secondary" as="p">
          Low → high: base · raised · dropdown · sticky · overlay · modal · popover · toast ·
          tooltip. Pair with elevation—modals use <code>shadow.overlay</code>.
        </rc-typography>
        <div className="z-index-ladder">
          {zIndexRoles.map(([role, token, value], index) => (
            <span
              key={token}
              style={
                {
                  '--layer': index,
                  '--z-token': `var(--rc-z-index-${role})`,
                } as CSSProperties
              }
            >
              <code>{role}</code>
              <em>{value}</em>
            </span>
          ))}
        </div>
      </PreviewPanel>

      <PreviewPanel meta="Semantic opacity" title="State and overlay alphas">
        <rc-typography variant="body" color="secondary" as="p">
          Prefer these roles over hard-coded alphas in components.
        </rc-typography>
        <div className="measure-list">
          <div className="measure-list__track opacity-list">
            {opacityRoles.map(([label, token, cssName, value]) => (
              <span
                key={token}
                style={{ '--alpha': `var(--rc-opacity-${cssName})` } as CSSProperties}
                title={token}
              >
                <code>{label}</code>
                <em>{value}</em>
              </span>
            ))}
          </div>
        </div>
      </PreviewPanel>
    </div>
  );
}

import type { CSSProperties } from 'react';

import { ColorSwatch } from '../ColorSwatch';
import {
  colorRoles,
  elevationSteps,
  plainTypographyRoles,
  startsTokenGroup,
  type DesignThemeName,
} from '../previewModel';
import { semanticColorSource } from '../tokenSource';

const buttonVariants = [
  { label: 'solid', variant: 'solid' as const, disabled: false },
  { label: 'subtle', variant: 'subtle' as const, disabled: false },
  { label: 'outline', variant: 'outline' as const, disabled: false },
  { label: 'ghost', variant: 'ghost' as const, disabled: false },
  { label: 'destructive', variant: 'destructive' as const, disabled: false },
  { label: 'disabled', variant: 'solid' as const, disabled: true },
];

export function WebComponentsPanel({ themeName }: { themeName: DesignThemeName }) {
  return (
    <div className="overview-layout" aria-label="Web Components preview">
      <article className="panel feature overview-section">
        <div className="panel-header">
          <div>
            <p className="meta">Web Components</p>
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
            <h2>
              <code>@rocketc/web-components</code> on the same token roles
            </h2>
          </div>
          <span className="badge">Lit</span>
        </div>
        <div className="overview-components">
          <div className="component-demo component-demo-wide">
            <h3>Buttons</h3>
            <div className="button-row">
              {buttonVariants.map((item) => (
                <rds-button
                  disabled={item.disabled || undefined}
                  key={item.label}
                  variant={item.variant}
                >
                  {item.label}
                </rds-button>
              ))}
              <rds-button size="sm">Small</rds-button>
              <rds-button size="lg">Large</rds-button>
            </div>
          </div>

          <div className="component-demo">
            <h3>Badges</h3>
            <div className="status-list">
              <rds-badge>Default</rds-badge>
              <rds-badge variant="secondary">Secondary</rds-badge>
              <rds-badge variant="outline">Outline</rds-badge>
              <rds-badge variant="destructive">Destructive</rds-badge>
              <rds-badge variant="success">Success</rds-badge>
              <rds-badge variant="warning">Warning</rds-badge>
              <rds-badge variant="info">Info</rds-badge>
            </div>
          </div>

          <div className="component-demo">
            <h3>Form</h3>
            <div className="wc-field">
              <rds-label {...{ for: 'workspace-name' }}>Workspace name</rds-label>
              <rds-input id="workspace-name" value="Rocketc Studio" {...{ readonly: true }} />
            </div>
            <div className="wc-switch-row">
              <rds-switch checked id="notify" />
              <span>Notifications</span>
            </div>
          </div>

          <div className="component-demo">
            <h3>Card</h3>
            <rds-card>
              <div slot="header">
                <strong>Workspace</strong>
                <div className="wc-muted">header / body / footer slots</div>
              </div>
              <p className="wc-card-body">Panel surface composed from semantic tokens.</p>
              <div className="button-row" slot="footer">
                <rds-button size="sm" variant="outline">
                  Cancel
                </rds-button>
                <rds-button size="sm">Confirm</rds-button>
              </div>
            </rds-card>
          </div>

          <div className="component-demo component-demo-wide">
            <h3>Alerts</h3>
            <div className="wc-alert-stack">
              <rds-alert>
                <span slot="title">Default</span>
                Token bridge is active for the selected theme.
              </rds-alert>
              <rds-alert variant="success">
                <span slot="title">Build complete</span>
                Token outputs were generated successfully.
              </rds-alert>
              <rds-alert variant="warning">
                <span slot="title">Review needed</span>
                Contrast should be checked before release.
              </rds-alert>
              <rds-alert variant="destructive">
                <span slot="title">Destructive</span>
                Maps to danger.soft / fg / border.
              </rds-alert>
              <rds-alert variant="info">
                <span slot="title">Info</span>
                Maps to info.soft / fg / border.
              </rds-alert>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

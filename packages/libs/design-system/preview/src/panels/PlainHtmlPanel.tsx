import type { CSSProperties } from 'react';

import { colorRoles, plainTypographyRoles, startsTokenGroup } from '../previewModel';

export function PlainHtmlPanel() {
  return (
    <div className="overview-layout" aria-label="Plain HTML preview">
      <article className="panel feature overview-section">
        <div className="panel-header">
          <div>
            <p className="meta">Plain HTML</p>
            <h2>Brand, accent, and state roles</h2>
          </div>
          <span className="badge">Semantic</span>
        </div>
        <p>
          Color is assigned by role first. Brand color carries identity and primary actions; accent
          and state colors keep emphasis and feedback separate.
        </p>
        <div className="overview-swatches">
          {colorRoles.map(([label, token, color], index) => (
            <div
              className={startsTokenGroup(colorRoles, index) ? 'starts-color-group' : undefined}
              key={token}
              style={{ '--swatch-color': color } as CSSProperties}
            >
              <span />
              <strong>{label}</strong>
              <code>{token}</code>
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
            <p className="meta">Components</p>
            <h2>Controls composed from the same token roles</h2>
          </div>
          <span className="badge">Portable</span>
        </div>
        <div className="overview-components">
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

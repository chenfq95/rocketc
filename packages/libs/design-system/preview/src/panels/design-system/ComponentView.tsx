const buttonVariants = [
  { label: 'solid', variant: 'solid' as const, disabled: false },
  { label: 'subtle', variant: 'subtle' as const, disabled: false },
  { label: 'outline', variant: 'outline' as const, disabled: false },
  { label: 'ghost', variant: 'ghost' as const, disabled: false },
  { label: 'destructive', variant: 'destructive' as const, disabled: false },
  { label: 'disabled', variant: 'solid' as const, disabled: true },
];

export function ComponentView() {
  return (
    <div className="overview-layout" role="tabpanel" aria-label="Web Components preview">
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

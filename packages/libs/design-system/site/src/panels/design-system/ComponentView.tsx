import type { ReactNode } from 'react';

import { PreviewPanel } from './PreviewPanel';

const buttonVariants = [
  { label: 'solid', variant: 'solid' as const, disabled: false },
  { label: 'subtle', variant: 'subtle' as const, disabled: false },
  { label: 'outline', variant: 'outline' as const, disabled: false },
  { label: 'ghost', variant: 'ghost' as const, disabled: false },
  { label: 'destructive', variant: 'destructive' as const, disabled: false },
  { label: 'disabled', variant: 'solid' as const, disabled: true },
];

function Category({
  folder,
  title,
  children,
}: {
  folder: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="wc-category">
      <header className="wc-category-header">
        <div>
          <rds-typography class="meta" variant="caption" as="p">
            {folder}/
          </rds-typography>
          <rds-typography variant="subheading" as="h3">
            {title}
          </rds-typography>
        </div>
      </header>
      <div className="overview-components">{children}</div>
    </section>
  );
}

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <rds-card>
      <rds-typography slot="header" class="component-demo-title" variant="caption" as="h4">
        {title}
      </rds-typography>
      {children}
    </rds-card>
  );
}

export function ComponentView() {
  return (
    <div className="primitive-layout" role="tabpanel" aria-label="Web Components preview">
      <PreviewPanel
        meta="Components"
        title={
          <>
            <code>@rocketc/web-components</code> by folder
          </>
        }
        badge="Lit"
      >
        <div className="wc-category-stack">
          <Category folder="basic" title="Native analogs & controls">
            <Demo title="Typography">
              <div className="wc-field">
                <rds-typography variant="display" as="h2">
                  Display
                </rds-typography>
                <rds-typography variant="title" as="h3">
                  Title
                </rds-typography>
                <rds-typography variant="heading" as="h4">
                  Heading
                </rds-typography>
                <rds-typography variant="body">
                  Body copy uses typography.body tokens for default UI text.
                </rds-typography>
                <rds-typography variant="caption" color="muted">
                  Caption / meta
                </rds-typography>
                <rds-typography variant="code">const tokens = true</rds-typography>
              </div>
            </Demo>

            <Demo title="Button">
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
            </Demo>

            <Demo title="Icon / Close">
              <div className="button-row">
                <rds-icon-button aria-label="Settings" variant="outline">
                  ⚙
                </rds-icon-button>
                <rds-icon-button aria-label="More" variant="ghost">
                  ⋯
                </rds-icon-button>
                <rds-close-button aria-label="Dismiss" />
              </div>
            </Demo>

            <Demo title="Link">
              <rds-link href="https://github.com/chenfq95/rocketc">Docs</rds-link>
            </Demo>

            <Demo title="Segment">
              <rds-segment value="day" {...{ 'full-width': true }}>
                <rds-segment-item value="day">Day</rds-segment-item>
                <rds-segment-item value="week">Week</rds-segment-item>
                <rds-segment-item value="month">Month</rds-segment-item>
              </rds-segment>
            </Demo>

            <Demo title="Field / Input / Textarea / Select">
              <rds-field>
                <span slot="label">Workspace name</span>
                <rds-input value="Rocketc Studio" {...{ readonly: true }} />
                <span slot="helper">Shown under the control when valid.</span>
              </rds-field>
              <rds-field invalid required>
                <span slot="label">Notes</span>
                <rds-textarea rows={2} placeholder="Optional notes" />
                <span slot="error">Notes are required for this deploy.</span>
              </rds-field>
              <div className="wc-field">
                <rds-label {...{ for: 'workspace-region' }}>Region</rds-label>
                <rds-select id="workspace-region" value="apac">
                  <option value="apac">APAC</option>
                  <option value="emea">EMEA</option>
                  <option value="amer">AMER</option>
                </rds-select>
              </div>
            </Demo>

            <Demo title="Number / Password / Pin">
              <div className="wc-field">
                <rds-label>Port</rds-label>
                <rds-number-input value="443" min={1} max={65535} step={1} />
              </div>
              <div className="wc-field">
                <rds-label>Password</rds-label>
                <rds-password-input value="hunter2" />
              </div>
              <div className="wc-field">
                <rds-label>OTP</rds-label>
                <rds-pin-input value="12" length={4} />
              </div>
            </Demo>

            <Demo title="Tags / Combobox">
              <div className="wc-field">
                <rds-label>Tags</rds-label>
                <rds-tags-input value="tokens,preview" />
              </div>
              <div className="wc-field">
                <rds-label>Adapter</rds-label>
                <rds-combobox placeholder="Search adapter">
                  <rds-combobox-option value="tokens">Design tokens</rds-combobox-option>
                  <rds-combobox-option value="mui">MUI adapter</rds-combobox-option>
                  <rds-combobox-option value="chakra">Chakra adapter</rds-combobox-option>
                </rds-combobox>
              </div>
            </Demo>

            <Demo title="File upload">
              <rds-file-upload accept=".json,.css" label="Drop theme files">
                JSON or CSS up to a few MB.
              </rds-file-upload>
            </Demo>

            <Demo title="Checkbox / Switch / Radio">
              <div className="wc-switch-row">
                <rds-checkbox checked>Remember workspace</rds-checkbox>
              </div>
              <div className="wc-switch-row">
                <rds-switch checked id="notify" />
                <rds-label {...{ for: 'notify' }}>Notifications</rds-label>
              </div>
              <rds-radio-group name="plan" value="pro" orientation="horizontal">
                <span slot="label">Plan</span>
                <rds-radio value="free">Free</rds-radio>
                <rds-radio value="pro">Pro</rds-radio>
                <rds-radio value="team">Team</rds-radio>
              </rds-radio-group>
            </Demo>

            <Demo title="Slider / Color / Rating">
              <div className="wc-field">
                <rds-label {...{ for: 'volume' }}>Volume</rds-label>
                <rds-slider id="volume" min={0} max={100} value="40" />
              </div>
              <div className="wc-field">
                <rds-label>Accent</rds-label>
                <rds-color-picker value="#f97316" />
              </div>
              <div className="wc-field">
                <rds-label>Rating</rds-label>
                <rds-rating value={4} />
              </div>
            </Demo>

            <Demo title="Progress / Spinner / Meter">
              <div className="wc-field">
                <rds-progress value={64} max={100} />
                <div className="button-row">
                  <rds-progress-circle value={72} max={100} />
                  <rds-spinner label="Loading tokens" />
                </div>
                <rds-meter value={0.7} min={0} max={1} low={0.3} high={0.7} optimum={0.8} />
              </div>
            </Demo>

            <Demo title="Fieldset">
              <rds-fieldset>
                <span slot="legend">Deploy target</span>
                <rds-input placeholder="hostname" />
                <rds-input type="number" placeholder="port" value="443" />
              </rds-fieldset>
            </Demo>

            <Demo title="Details / Accordion">
              <rds-details>
                <span slot="summary">Token mapping</span>
                Components read <code>--rds-*</code> semantic tokens from the active theme.
              </rds-details>
              <rds-accordion value="a" style={{ marginTop: 'var(--rds-space-3)' }}>
                <rds-accordion-item value="a">
                  <span slot="trigger">Surfaces</span>
                  Panel and card share semantic surface tokens.
                </rds-accordion-item>
                <rds-accordion-item value="b">
                  <span slot="trigger">Controls</span>
                  Interactive chrome resolves through control.* roles.
                </rds-accordion-item>
              </rds-accordion>
            </Demo>

            <Demo title="Dialog">
              <div className="button-row">
                <rds-button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const dialog = document.getElementById('demo-dialog') as
                      | (HTMLElement & { showModal: () => void })
                      | null;
                    dialog?.showModal();
                  }}
                >
                  Open dialog
                </rds-button>
              </div>
              <rds-dialog id="demo-dialog">
                <span slot="title">Confirm deploy</span>
                Publish the current token build to the selected target?
                <div slot="footer" className="button-row">
                  <rds-button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const dialog = document.getElementById('demo-dialog') as
                        | (HTMLElement & { close: () => void })
                        | null;
                      dialog?.close();
                    }}
                  >
                    Cancel
                  </rds-button>
                  <rds-button
                    size="sm"
                    onClick={() => {
                      const dialog = document.getElementById('demo-dialog') as
                        | (HTMLElement & { close: () => void })
                        | null;
                      dialog?.close();
                    }}
                  >
                    Confirm
                  </rds-button>
                </div>
              </rds-dialog>
            </Demo>
          </Category>

          <Category folder="feedback" title="Status & messaging">
            <Demo title="Badge / Tag">
              <div className="status-list">
                <rds-badge>Default</rds-badge>
                <rds-badge variant="secondary">Secondary</rds-badge>
                <rds-badge variant="success">Success</rds-badge>
                <rds-badge variant="warning">Warning</rds-badge>
                <rds-badge variant="destructive">Destructive</rds-badge>
                <rds-tag>design</rds-tag>
                <rds-tag variant="outline" dismissible>
                  preview
                </rds-tag>
              </div>
            </Demo>

            <Demo title="Alert">
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
              </div>
            </Demo>

            <Demo title="Banner / Toast / Skeleton">
              <rds-banner open dismissible variant="info">
                <span slot="title">Banner</span>
                Persistent status across the page chrome.
              </rds-banner>
              <rds-toast open duration={0} variant="success">
                <span slot="title">Toast</span>
                Build finished successfully.
              </rds-toast>
              <rds-skeleton lines={3} />
            </Demo>
          </Category>

          <Category folder="surfaces" title="Content shells">
            <Demo title="Card">
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
            </Demo>

            <Demo title="Panel">
              <rds-panel bordered padded>
                Quiet surface for grouped content.
              </rds-panel>
            </Demo>

            <Demo title="Popover">
              <rds-popover>
                <rds-button slot="trigger" size="sm" variant="outline">
                  Open popover
                </rds-button>
                Token roles and component APIs stay in sync.
              </rds-popover>
            </Demo>
          </Category>

          <Category folder="navigation" title="Wayfinding">
            <Demo title="Breadcrumb">
              <rds-breadcrumb>
                <rds-link href="#home">Home</rds-link>
                <rds-link href="#components">Components</rds-link>
                <span>Preview</span>
              </rds-breadcrumb>
            </Demo>

            <Demo title="Tabs">
              <rds-tabs value="tokens">
                <rds-tab value="tokens">Tokens</rds-tab>
                <rds-tab value="components">Components</rds-tab>
                <div slot="panel" data-value="tokens">
                  Semantic token roles drive every control.
                </div>
                <div slot="panel" data-value="components">
                  Lit elements share the same CSS variables.
                </div>
              </rds-tabs>
            </Demo>

            <Demo title="Pagination">
              <rds-pagination page={2} count={8} />
            </Demo>

            <Demo title="Menu">
              <rds-menu>
                <span slot="label">Actions</span>
                <rds-menu-item value="edit">Edit</rds-menu-item>
                <rds-menu-item value="duplicate">Duplicate</rds-menu-item>
                <rds-menu-item value="delete" destructive>
                  Delete
                </rds-menu-item>
              </rds-menu>
            </Demo>

            <Demo title="Steps">
              <rds-steps index={1}>
                <rds-step value="tokens">
                  Tokens
                  <span slot="description">Generate CSS variables</span>
                </rds-step>
                <rds-step value="adapters">
                  Adapters
                  <span slot="description">MUI / Chakra / Tailwind</span>
                </rds-step>
                <rds-step value="ship">
                  Ship
                  <span slot="description">Publish preview</span>
                </rds-step>
              </rds-steps>
            </Demo>

            <Demo title="Timeline">
              <rds-timeline>
                <rds-timeline-item>
                  <span slot="title">Token build</span>
                  default.light regenerated
                </rds-timeline-item>
                <rds-timeline-item>
                  <span slot="title">Preview deploy</span>
                  Component gallery updated
                </rds-timeline-item>
              </rds-timeline>
            </Demo>
          </Category>

          <Category folder="overlay" title="Floating layers">
            <Demo title="Tooltip / Dropdown / Tips">
              <rds-stack direction="horizontal" gap="sm" align="center">
                <rds-tooltip content="Copied">
                  <rds-button size="sm" variant="outline">
                    Hover me
                  </rds-button>
                </rds-tooltip>
                <rds-dropdown>
                  <rds-button slot="trigger" size="sm">
                    Menu
                  </rds-button>
                  <rds-menu>
                    <rds-menu-item value="edit">Edit</rds-menu-item>
                    <rds-menu-item value="duplicate">Duplicate</rds-menu-item>
                    <rds-menu-item value="delete" destructive>
                      Delete
                    </rds-menu-item>
                  </rds-menu>
                </rds-dropdown>
                <rds-hover-card>
                  <rds-button slot="trigger" size="sm" variant="ghost">
                    Hover card
                  </rds-button>
                  Peek at related token roles without leaving the page.
                </rds-hover-card>
                <rds-toggle-tip>
                  <rds-button slot="trigger" size="sm" variant="outline">
                    Tip
                  </rds-button>
                  Click to toggle helper copy.
                </rds-toggle-tip>
              </rds-stack>
            </Demo>
          </Category>

          <Category folder="data" title="Collections & metrics">
            <Demo title="Avatar / Stat">
              <rds-stack direction="horizontal" gap="sm" align="center">
                <rds-avatar>RC</rds-avatar>
                <rds-stat trend="up">
                  <span slot="label">Deploys</span>
                  <span slot="value">128</span>
                  <span slot="trend">+12%</span>
                </rds-stat>
              </rds-stack>
            </Demo>

            <Demo title="List">
              <rds-list>
                <rds-list-item>
                  Design tokens
                  <span slot="description">Semantic roles</span>
                  <rds-badge slot="suffix" variant="success">
                    ready
                  </rds-badge>
                </rds-list-item>
                <rds-list-item>
                  Web components
                  <span slot="description">Lit + ElementInternals</span>
                  <rds-badge slot="suffix">live</rds-badge>
                </rds-list-item>
              </rds-list>
            </Demo>

            <Demo title="Empty">
              <rds-empty>
                <span slot="title">No drafts</span>
                Create a theme variant to get started.
              </rds-empty>
            </Demo>

            <Demo title="Table">
              <rds-table>
                <span slot="caption">Recent builds</span>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>default.light</td>
                      <td>ok</td>
                    </tr>
                    <tr>
                      <td>sun.dark</td>
                      <td>ok</td>
                    </tr>
                  </tbody>
                </table>
              </rds-table>
            </Demo>
          </Category>

          <Category folder="layout" title="Layout primitives">
            <Demo title="Box / Flex / Center">
              <rds-box bg="panel" bordered rounded="lg" p="md">
                <rds-flex gap="sm" align="center" justify="between" wrap>
                  <rds-box bg="elevated" rounded="md" px="sm" py="xs">
                    Box
                  </rds-box>
                  <rds-center min-height="2.5rem" style={{ flex: '1' }}>
                    <rds-typography variant="caption" color="secondary">
                      Center
                    </rds-typography>
                  </rds-center>
                  <rds-flex gap="xs" inline>
                    <rds-badge variant="secondary">Flex</rds-badge>
                    <rds-badge>row</rds-badge>
                  </rds-flex>
                </rds-flex>
              </rds-box>
            </Demo>

            <Demo title="Stack / Grid">
              <rds-stack gap="sm">
                <rds-grid columns={2} gap="sm">
                  <rds-panel bordered padded>
                    Panel A
                  </rds-panel>
                  <rds-panel bordered padded>
                    Panel B
                  </rds-panel>
                </rds-grid>
                <rds-divider label="or" />
                <rds-separator />
              </rds-stack>
            </Demo>

            <Demo title="Scroll area">
              <rds-scroll-area max-height="7rem">
                <p>Line 1 — semantic tokens</p>
                <p>Line 2 — control recipes</p>
                <p>Line 3 — surface elevation</p>
                <p>Line 4 — motion duration</p>
                <p>Line 5 — z-index ladder</p>
                <p>Line 6 — typography scale</p>
              </rds-scroll-area>
            </Demo>
          </Category>
        </div>
      </PreviewPanel>
    </div>
  );
}

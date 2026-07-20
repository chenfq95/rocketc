import type { ReactNode } from 'react';

import { LucideIcon } from '../../lib/lucide-icon';
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
          <rc-typography class="meta" variant="caption" as="p">
            {folder}/
          </rc-typography>
          <rc-typography variant="subheading" as="h3">
            {title}
          </rc-typography>
        </div>
      </header>
      <div className="overview-components">{children}</div>
    </section>
  );
}

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <rc-card>
      <rc-typography slot="header" class="component-demo-title" variant="caption" as="h4">
        {title}
      </rc-typography>
      {children}
    </rc-card>
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
                <rc-typography variant="display" as="h2">
                  Display
                </rc-typography>
                <rc-typography variant="title" as="h3">
                  Title
                </rc-typography>
                <rc-typography variant="heading" as="h4">
                  Heading
                </rc-typography>
                <rc-typography variant="body">
                  Body copy uses typography.body tokens for default UI text.
                </rc-typography>
                <rc-typography variant="caption" color="muted">
                  Caption / meta
                </rc-typography>
                <rc-typography variant="code">const tokens = true</rc-typography>
              </div>
            </Demo>

            <Demo title="Button">
              <div className="button-row">
                {buttonVariants.map((item) => (
                  <rc-button
                    disabled={item.disabled || undefined}
                    key={item.label}
                    variant={item.variant}
                  >
                    {item.label}
                  </rc-button>
                ))}
                <rc-button size="sm">Small</rc-button>
                <rc-button size="lg">Large</rc-button>
                <rc-button variant="solid">
                  <LucideIcon name="plus" slot="prefix" />
                  New
                </rc-button>
                <rc-button variant="outline">
                  Next
                  <LucideIcon name="arrow-right" slot="suffix" />
                </rc-button>
              </div>
            </Demo>

            <Demo title="Icon / Close">
              <div className="button-row">
                <rc-button icon variant="outline" aria-label="Search">
                  <LucideIcon name="search" />
                </rc-button>
                <rc-icon-button aria-label="Settings" variant="outline">
                  <LucideIcon name="setting" />
                </rc-icon-button>
                <rc-icon-button aria-label="More">
                  <LucideIcon name="ellipsis" />
                </rc-icon-button>
                <rc-close-button aria-label="Dismiss" />
              </div>
            </Demo>

            <Demo title="Link">
              <rc-link href="https://github.com/chenfq95/rocketc">Docs</rc-link>
            </Demo>

            <Demo title="Segment">
              <rc-segment value="day" {...{ 'full-width': true }}>
                <rc-segment-item value="day">Day</rc-segment-item>
                <rc-segment-item value="week">Week</rc-segment-item>
                <rc-segment-item value="month">Month</rc-segment-item>
              </rc-segment>
            </Demo>

            <Demo title="Field / Input / Textarea / Select">
              <rc-field>
                <span slot="label">Workspace name</span>
                <rc-input value="Rocketc Studio" {...{ readonly: true }} />
                <span slot="helper">Shown under the control when valid.</span>
              </rc-field>
              <rc-field invalid required>
                <span slot="label">Notes</span>
                <rc-textarea rows={2} placeholder="Optional notes" />
                <span slot="error">Notes are required for this deploy.</span>
              </rc-field>
              <div className="wc-field">
                <rc-label {...{ for: 'workspace-region' }}>Region</rc-label>
                <rc-select id="workspace-region" value="apac">
                  <option value="apac">APAC</option>
                  <option value="emea">EMEA</option>
                  <option value="amer">AMER</option>
                </rc-select>
              </div>
            </Demo>

            <Demo title="Number / Password / Pin">
              <div className="wc-field">
                <rc-label>Port</rc-label>
                <rc-number-input value="443" min={1} max={65535} step={1} />
              </div>
              <div className="wc-field">
                <rc-label>Password</rc-label>
                <rc-password-input value="hunter2" />
              </div>
              <div className="wc-field">
                <rc-label>OTP</rc-label>
                <rc-pin-input value="12" length={4} />
              </div>
            </Demo>

            <Demo title="Tags / Combobox">
              <div className="wc-field">
                <rc-label>Tags</rc-label>
                <rc-tags-input value="tokens,preview" />
              </div>
              <div className="wc-field">
                <rc-label>Adapter</rc-label>
                <rc-combobox placeholder="Search adapter">
                  <rc-combobox-option value="tokens">Design tokens</rc-combobox-option>
                  <rc-combobox-option value="mui">MUI adapter</rc-combobox-option>
                  <rc-combobox-option value="chakra">Chakra adapter</rc-combobox-option>
                </rc-combobox>
              </div>
            </Demo>

            <Demo title="File upload">
              <rc-file-upload accept=".json,.css" label="Drop theme files">
                JSON or CSS up to a few MB.
              </rc-file-upload>
            </Demo>

            <Demo title="Checkbox / Switch / Radio">
              <div className="wc-switch-row">
                <rc-checkbox checked>Remember workspace</rc-checkbox>
              </div>
              <div className="wc-switch-row">
                <rc-switch checked id="notify" />
                <rc-label {...{ for: 'notify' }}>Notifications</rc-label>
              </div>
              <rc-radio-group name="plan" value="pro" orientation="horizontal">
                <span slot="label">Plan</span>
                <rc-radio value="free">Free</rc-radio>
                <rc-radio value="pro">Pro</rc-radio>
                <rc-radio value="team">Team</rc-radio>
              </rc-radio-group>
            </Demo>

            <Demo title="Slider / Color / Rating">
              <div className="wc-field">
                <rc-label {...{ for: 'volume' }}>Volume</rc-label>
                <rc-slider id="volume" min={0} max={100} value="40" />
              </div>
              <div className="wc-field">
                <rc-label>Accent</rc-label>
                <rc-color-picker value="#f97316" />
              </div>
              <div className="wc-field">
                <rc-label>Rating</rc-label>
                <rc-rating value={4} />
              </div>
            </Demo>

            <Demo title="Progress / Spinner / Meter">
              <div className="wc-field">
                <rc-progress value={64} max={100} />
                <div className="button-row">
                  <rc-progress-circle value={72} max={100} />
                  <rc-spinner label="Loading tokens" />
                </div>
                <rc-meter value={0.7} min={0} max={1} low={0.3} high={0.7} optimum={0.8} />
              </div>
            </Demo>

            <Demo title="Fieldset">
              <rc-fieldset>
                <span slot="legend">Deploy target</span>
                <rc-input placeholder="hostname" />
                <rc-input type="number" placeholder="port" value="443" />
              </rc-fieldset>
            </Demo>

            <Demo title="Details / Accordion">
              <rc-details>
                <span slot="summary">Token mapping</span>
                Components read <code>--rc-*</code> semantic tokens from the active theme.
              </rc-details>
              <rc-accordion value="a" style={{ marginTop: 'var(--rc-space-3)' }}>
                <rc-accordion-item value="a">
                  <span slot="trigger">Surfaces</span>
                  Panel and card share semantic surface tokens.
                </rc-accordion-item>
                <rc-accordion-item value="b">
                  <span slot="trigger">Controls</span>
                  Interactive chrome resolves through control.* roles.
                </rc-accordion-item>
              </rc-accordion>
            </Demo>

            <Demo title="Dialog">
              <div className="button-row">
                <rc-button
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
                </rc-button>
              </div>
              <rc-dialog id="demo-dialog">
                <span slot="title">Confirm deploy</span>
                Publish the current token build to the selected target?
                <div slot="footer" className="button-row">
                  <rc-button
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
                  </rc-button>
                  <rc-button
                    size="sm"
                    onClick={() => {
                      const dialog = document.getElementById('demo-dialog') as
                        | (HTMLElement & { close: () => void })
                        | null;
                      dialog?.close();
                    }}
                  >
                    Confirm
                  </rc-button>
                </div>
              </rc-dialog>
            </Demo>
          </Category>

          <Category folder="feedback" title="Status & messaging">
            <Demo title="Badge / Tag">
              <div className="status-list">
                <rc-badge>Default</rc-badge>
                <rc-badge variant="secondary">Secondary</rc-badge>
                <rc-badge variant="success">Success</rc-badge>
                <rc-badge variant="warning">Warning</rc-badge>
                <rc-badge variant="destructive">Destructive</rc-badge>
                <rc-tag>design</rc-tag>
                <rc-tag variant="outline" dismissible>
                  preview
                </rc-tag>
              </div>
            </Demo>

            <Demo title="Alert">
              <div className="wc-alert-stack">
                <rc-alert>
                  <span slot="title">Default</span>
                  Token bridge is active for the selected theme.
                </rc-alert>
                <rc-alert variant="success">
                  <span slot="title">Build complete</span>
                  Token outputs were generated successfully.
                </rc-alert>
                <rc-alert variant="warning">
                  <span slot="title">Review needed</span>
                  Contrast should be checked before release.
                </rc-alert>
              </div>
            </Demo>

            <Demo title="Banner / Toast / Skeleton">
              <rc-banner open dismissible variant="info">
                <span slot="title">Banner</span>
                Persistent status across the page chrome.
              </rc-banner>
              <rc-toast open duration={0} variant="success">
                <span slot="title">Toast</span>
                Build finished successfully.
              </rc-toast>
              <rc-skeleton lines={3} />
            </Demo>
          </Category>

          <Category folder="surfaces" title="Content shells">
            <Demo title="Card">
              <rc-card>
                <div slot="header">
                  <strong>Workspace</strong>
                  <div className="wc-muted">header / body / footer slots</div>
                </div>
                <p className="wc-card-body">Panel surface composed from semantic tokens.</p>
                <div className="button-row" slot="footer">
                  <rc-button size="sm" variant="outline">
                    Cancel
                  </rc-button>
                  <rc-button size="sm">Confirm</rc-button>
                </div>
              </rc-card>
            </Demo>

            <Demo title="Panel">
              <rc-panel bordered padded>
                Quiet surface for grouped content.
              </rc-panel>
            </Demo>

            <Demo title="Popover">
              <rc-popover>
                <rc-button slot="trigger" size="sm" variant="outline">
                  Open popover
                </rc-button>
                Token roles and component APIs stay in sync.
              </rc-popover>
            </Demo>
          </Category>

          <Category folder="navigation" title="Wayfinding">
            <Demo title="Breadcrumb">
              <rc-breadcrumb>
                <rc-link href="#home">Home</rc-link>
                <rc-link href="#components">Components</rc-link>
                <span>Preview</span>
              </rc-breadcrumb>
            </Demo>

            <Demo title="Tabs">
              <rc-tabs value="tokens">
                <rc-tab value="tokens">Tokens</rc-tab>
                <rc-tab value="components">Components</rc-tab>
                <div slot="panel" data-value="tokens">
                  Semantic token roles drive every control.
                </div>
                <div slot="panel" data-value="components">
                  Lit elements share the same CSS variables.
                </div>
              </rc-tabs>
            </Demo>

            <Demo title="Pagination">
              <rc-pagination page={2} count={8} />
            </Demo>

            <Demo title="Menu">
              <rc-menu>
                <span slot="label">Actions</span>
                <rc-menu-item value="edit">Edit</rc-menu-item>
                <rc-menu-item value="duplicate">Duplicate</rc-menu-item>
                <rc-menu-item value="delete" destructive>
                  Delete
                </rc-menu-item>
              </rc-menu>
            </Demo>

            <Demo title="Steps">
              <rc-steps index={1}>
                <rc-step value="tokens">
                  Tokens
                  <span slot="description">Generate CSS variables</span>
                </rc-step>
                <rc-step value="adapters">
                  Adapters
                  <span slot="description">MUI / Chakra / Tailwind</span>
                </rc-step>
                <rc-step value="ship">
                  Ship
                  <span slot="description">Publish preview</span>
                </rc-step>
              </rc-steps>
            </Demo>

            <Demo title="Timeline">
              <rc-timeline>
                <rc-timeline-item>
                  <span slot="title">Token build</span>
                  default.light regenerated
                </rc-timeline-item>
                <rc-timeline-item>
                  <span slot="title">Preview deploy</span>
                  Component gallery updated
                </rc-timeline-item>
              </rc-timeline>
            </Demo>
          </Category>

          <Category folder="overlay" title="Floating layers">
            <Demo title="Tooltip / Dropdown / Tips">
              <rc-stack direction="horizontal" gap="sm" align="center">
                <rc-tooltip content="Copied">
                  <rc-button size="sm" variant="outline">
                    Hover me
                  </rc-button>
                </rc-tooltip>
                <rc-dropdown>
                  <rc-button slot="trigger" size="sm">
                    Menu
                  </rc-button>
                  <rc-menu>
                    <rc-menu-item value="edit">Edit</rc-menu-item>
                    <rc-menu-item value="duplicate">Duplicate</rc-menu-item>
                    <rc-menu-item value="delete" destructive>
                      Delete
                    </rc-menu-item>
                  </rc-menu>
                </rc-dropdown>
                <rc-hover-card>
                  <rc-button slot="trigger" size="sm" variant="ghost">
                    Hover card
                  </rc-button>
                  Peek at related token roles without leaving the page.
                </rc-hover-card>
                <rc-toggle-tip>
                  <rc-button slot="trigger" size="sm" variant="outline">
                    Tip
                  </rc-button>
                  Click to toggle helper copy.
                </rc-toggle-tip>
              </rc-stack>
            </Demo>
          </Category>

          <Category folder="data" title="Collections & metrics">
            <Demo title="Avatar / Stat">
              <rc-stack direction="horizontal" gap="sm" align="center">
                <rc-avatar>RC</rc-avatar>
                <rc-stat trend="up">
                  <span slot="label">Deploys</span>
                  <span slot="value">128</span>
                  <span slot="trend">+12%</span>
                </rc-stat>
              </rc-stack>
            </Demo>

            <Demo title="List">
              <rc-list>
                <rc-list-item>
                  Design tokens
                  <span slot="description">Semantic roles</span>
                  <rc-badge slot="suffix" variant="success">
                    ready
                  </rc-badge>
                </rc-list-item>
                <rc-list-item>
                  Web components
                  <span slot="description">Lit + ElementInternals</span>
                  <rc-badge slot="suffix">live</rc-badge>
                </rc-list-item>
              </rc-list>
            </Demo>

            <Demo title="Empty">
              <rc-empty>
                <span slot="title">No drafts</span>
                Create a theme variant to get started.
              </rc-empty>
            </Demo>

            <Demo title="Table">
              <rc-table>
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
              </rc-table>
            </Demo>
          </Category>

          <Category folder="layout" title="Layout primitives">
            <Demo title="Box / Flex / Center">
              <rc-box bg="panel" border="sm" border-color="subtle" border-radius="lg" pd="md">
                <rc-flex gap="sm" align="center" justify="between" wrap>
                  <rc-box bg="elevated" border-radius="md" px="sm" py="xs">
                    Box
                  </rc-box>
                  <rc-center min-height="2.5rem" style={{ flex: '1' }}>
                    <rc-typography variant="caption" color="secondary">
                      Center
                    </rc-typography>
                  </rc-center>
                  <rc-flex gap="xs" inline>
                    <rc-badge variant="secondary">Flex</rc-badge>
                    <rc-badge>row</rc-badge>
                  </rc-flex>
                </rc-flex>
              </rc-box>
            </Demo>

            <Demo title="Stack / Grid">
              <rc-stack gap="sm">
                <rc-grid columns={2} gap="sm">
                  <rc-panel bordered padded>
                    Panel A
                  </rc-panel>
                  <rc-panel bordered padded>
                    Panel B
                  </rc-panel>
                </rc-grid>
                <rc-divider label="or" />
                <rc-separator />
              </rc-stack>
            </Demo>

            <Demo title="Scroll area">
              <rc-scroll-area max-height="7rem">
                <p>Line 1 — semantic tokens</p>
                <p>Line 2 — control recipes</p>
                <p>Line 3 — surface elevation</p>
                <p>Line 4 — motion duration</p>
                <p>Line 5 — z-index ladder</p>
                <p>Line 6 — typography scale</p>
              </rc-scroll-area>
            </Demo>
          </Category>
        </div>
      </PreviewPanel>
    </div>
  );
}

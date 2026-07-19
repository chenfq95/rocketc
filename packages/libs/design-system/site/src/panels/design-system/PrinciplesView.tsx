import { semanticGlossarySections } from '../../semanticGlossary';
import { PreviewPanel } from './PreviewPanel';
import {
  brandFamilies,
  depthSteps,
  designGoals,
  packageScope,
  principleCards,
  principlesIntro,
  productDirection,
  tokenLayers,
} from './principlesContent';

function TextList({
  items,
  color = 'secondary',
}: {
  items: readonly string[];
  color?: 'secondary' | 'muted';
}) {
  return (
    <rc-stack class="principles-text-list" gap="sm">
      {items.map((item) => (
        <div className="principles-text-list__item" key={item}>
          <rc-typography variant="body-small" color={color} as="p">
            {item}
          </rc-typography>
        </div>
      ))}
    </rc-stack>
  );
}

export function PrinciplesView() {
  return (
    <rc-stack class="principles-layout" gap="xl" role="tabpanel">
      <PreviewPanel meta={principlesIntro.meta} title={principlesIntro.title} badge="Philosophy">
        <rc-typography class="primitive-glossary-lede" variant="body" color="secondary" as="p">
          {principlesIntro.lede}
        </rc-typography>
      </PreviewPanel>

      <PreviewPanel meta="Scope" title={packageScope.title}>
        <rc-grid columns={2} gap="lg">
          <rc-stack gap="sm">
            <rc-typography variant="caption" color="muted" as="p">
              It is
            </rc-typography>
            <TextList items={packageScope.is} />
          </rc-stack>
          <rc-stack gap="sm">
            <rc-typography variant="caption" color="muted" as="p">
              It is not
            </rc-typography>
            <TextList items={packageScope.isNot} color="muted" />
          </rc-stack>
        </rc-grid>
      </PreviewPanel>

      <PreviewPanel meta="Direction" title={productDirection.title}>
        <rc-stack gap="md">
          <rc-typography class="primitive-glossary-lede" variant="body" color="secondary" as="p">
            {productDirection.blurb}
          </rc-typography>
          <TextList items={productDirection.bullets} />
        </rc-stack>
      </PreviewPanel>

      <PreviewPanel meta="Goals" title="What success looks like">
        <rc-grid class="principles-card-grid" columns={2} gap="lg">
          {designGoals.map((goal) => (
            <rc-card key={goal.title}>
              <rc-typography slot="header" variant="subheading" as="h3">
                {goal.title}
              </rc-typography>
              <rc-typography variant="body-small" color="secondary" as="p">
                {goal.body}
              </rc-typography>
            </rc-card>
          ))}
        </rc-grid>
      </PreviewPanel>

      <PreviewPanel meta="Brand" title="Two families, four themes">
        <rc-stack gap="md">
          <rc-typography class="primitive-glossary-lede" variant="body" color="secondary" as="p">
            Each family has light and dark modes → <code>default.light</code>,{' '}
            <code>default.dark</code>, <code>sun.light</code>, <code>sun.dark</code>.
          </rc-typography>
          <rc-table compact>
            <table>
              <thead>
                <tr>
                  <th>Family</th>
                  <th>Character</th>
                  <th>Brand solid</th>
                </tr>
              </thead>
              <tbody>
                {brandFamilies.map((row) => (
                  <tr key={row.family}>
                    <td>
                      <code>{row.family}</code>
                    </td>
                    <td>{row.character}</td>
                    <td>
                      <code>{row.solid}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </rc-table>
        </rc-stack>
      </PreviewPanel>

      <PreviewPanel meta="Tokens" title="Primitive → semantic → theme">
        <rc-stack gap="md">
          <rc-typography class="primitive-glossary-lede" variant="body" color="secondary" as="p">
            Prefer semantic roles in product UI. Primitives build those roles; themes remap values
            without renaming them.
          </rc-typography>
          <rc-table compact>
            <table>
              <thead>
                <tr>
                  <th>Layer</th>
                  <th>Source</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {tokenLayers.map((row) => (
                  <tr key={row.layer}>
                    <td>
                      <strong>{row.layer}</strong>
                    </td>
                    <td>
                      <code>{row.path}</code>
                    </td>
                    <td>{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </rc-table>
        </rc-stack>
      </PreviewPanel>

      <PreviewPanel meta="Principles" title="Do and don’t">
        <rc-grid columns={2} gap="lg">
          {principleCards.map((card) => (
            <rc-card key={card.title}>
              <rc-stack slot="header" gap="xs">
                <rc-typography variant="subheading" as="h3">
                  {card.title}
                </rc-typography>
                <rc-typography variant="body-small" color="secondary" as="p">
                  {card.intent}
                </rc-typography>
              </rc-stack>
              <rc-stack gap="md">
                <rc-stack gap="sm">
                  <rc-badge variant="success">Do</rc-badge>
                  <TextList items={card.do} />
                </rc-stack>
                <rc-stack gap="sm">
                  <rc-badge variant="outline">Don’t</rc-badge>
                  <TextList items={card.dont} color="muted" />
                </rc-stack>
              </rc-stack>
            </rc-card>
          ))}
        </rc-grid>
      </PreviewPanel>

      <PreviewPanel meta="Depth" title="Three elevation steps">
        <rc-stack gap="md">
          <rc-typography class="primitive-glossary-lede" variant="body" color="secondary" as="p">
            Light mode leans on border + shadow; dark mode leans on surface color steps. Elevated
            surfaces must pair with <code>shadow.raised</code> (or overlay for top chrome).
          </rc-typography>
          <rc-grid columns={3} gap="lg">
            {depthSteps.map((step) => (
              <rc-card key={step.name}>
                <rc-typography slot="header" variant="label" as="strong">
                  {step.name}
                </rc-typography>
                <rc-stack gap="sm">
                  <code>{step.recipe}</code>
                  <rc-typography variant="body-small" color="secondary" as="p">
                    {step.detail}
                  </rc-typography>
                </rc-stack>
              </rc-card>
            ))}
          </rc-grid>
        </rc-stack>
      </PreviewPanel>

      <PreviewPanel meta="Semantic roles" title="What product tokens mean" badge="Contract">
        <rc-stack gap="md">
          <rc-typography class="primitive-glossary-lede" variant="body" color="secondary" as="p">
            Apps consume semantic roles; raw scales only build those roles. Prefer{' '}
            <code>control.*</code> / <code>surface.*</code> / <code>typography.*</code> over
            primitives. Themes remap values without renaming roles.
          </rc-typography>
          <rc-stack class="principles-glossary" gap="lg">
            {semanticGlossarySections.map((section) => (
              <rc-card key={section.title}>
                <rc-stack slot="header" gap="xs">
                  <rc-typography variant="subheading" as="h3">
                    {section.title}
                  </rc-typography>
                  <rc-typography variant="body-small" color="secondary" as="p">
                    {section.blurb}
                  </rc-typography>
                </rc-stack>
                <div className="principles-glossary-rows" role="list">
                  {section.entries.map((entry) => (
                    <div className="principles-glossary-row" role="listitem" key={entry.token}>
                      <code>{entry.token}</code>
                      <rc-typography variant="body-small" color="secondary" as="p">
                        {entry.meaning}
                      </rc-typography>
                    </div>
                  ))}
                </div>
              </rc-card>
            ))}
          </rc-stack>
        </rc-stack>
      </PreviewPanel>
    </rc-stack>
  );
}

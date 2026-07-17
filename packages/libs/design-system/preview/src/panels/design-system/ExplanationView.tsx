import { semanticGlossarySections } from '../../semanticGlossary';
import { PreviewPanel } from './PreviewPanel';

export function ExplanationView() {
  return (
    <div className="primitive-layout" role="tabpanel">
      <PreviewPanel meta="Semantic roles" title="What product tokens mean" badge="Contract">
        <rds-typography class="primitive-glossary-lede" variant="body" color="secondary" as="p">
          Apps consume semantic roles; raw scales only build those roles. Prefer{' '}
          <code>control.*</code> / <code>surface.*</code> / <code>typography.*</code> over
          primitives. Themes remap values without renaming roles.
        </rds-typography>
        <div className="primitive-glossary">
          {semanticGlossarySections.map((section) => (
            <section className="primitive-glossary-section" key={section.title}>
              <header>
                <rds-typography variant="subheading" as="h3">
                  {section.title}
                </rds-typography>
                <rds-typography variant="body-small" color="secondary" as="p">
                  {section.blurb}
                </rds-typography>
              </header>
              <dl>
                {section.entries.map((entry) => (
                  <div key={entry.token}>
                    <dt>
                      <code>{entry.token}</code>
                    </dt>
                    <dd>{entry.meaning}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </PreviewPanel>
    </div>
  );
}

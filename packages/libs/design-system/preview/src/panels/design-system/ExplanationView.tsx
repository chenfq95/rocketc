import { semanticGlossarySections } from '../../semanticGlossary';

export function ExplanationView() {
  return (
    <div className="primitive-layout" role="tabpanel">
      <article className="panel primitive-panel primitive-panel-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Semantic roles</p>
            <h2>What product tokens mean</h2>
          </div>
          <span className="badge">Contract</span>
        </div>
        <p className="primitive-glossary-lede">
          Apps consume semantic roles; raw scales only build those roles. Prefer{' '}
          <code>control.*</code> / <code>surface.*</code> / <code>typography.*</code> over
          primitives. Themes remap values without renaming roles.
        </p>
        <div className="primitive-glossary">
          {semanticGlossarySections.map((section) => (
            <section className="primitive-glossary-section" key={section.title}>
              <header>
                <h3>{section.title}</h3>
                <p>{section.blurb}</p>
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
      </article>
    </div>
  );
}

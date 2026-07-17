import { useEffect, useRef, useState } from 'react';

import type { DesignThemeName } from '../../previewModel';
import { ComponentView } from './ComponentView';
import { PrinciplesView } from './PrinciplesView';
import { PrimitiveView } from './PrimitiveView';
import { SemanticView } from './SemanticView';

type DesignSystemView = 'principles' | 'primitive' | 'semantic' | 'component';

const views = [
  ['principles', 'Principles'],
  ['primitive', 'Primitive'],
  ['semantic', 'Semantic'],
  ['component', 'Component'],
] as const satisfies ReadonlyArray<readonly [DesignSystemView, string]>;

export function DesignSystemPanel({ themeName }: { themeName: DesignThemeName }) {
  const [view, setView] = useState('principles' as DesignSystemView);
  const tabsRef = useRef<HTMLElementTagNameMap['rds-tabs']>(null);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const onChange = (event: Event) => {
      // Nested controls (e.g. rds-segment) also emit bubbling `change`.
      if (event.target !== el) return;
      const value = (event as CustomEvent<{ value: string }>).detail?.value;
      if (value) setView(value as DesignSystemView);
    };
    el.addEventListener('change', onChange);
    return () => el.removeEventListener('change', onChange);
  }, []);

  return (
    <div className="design-system-panel">
      <rds-tabs ref={tabsRef} value={view} aria-label="Design System views">
        {views.map(([value, label]) => (
          <rds-tab key={value} value={value}>
            {label}
          </rds-tab>
        ))}

        <div slot="panel" data-value="principles">
          {view === 'principles' ? <PrinciplesView /> : null}
        </div>
        <div slot="panel" data-value="primitive">
          {view === 'primitive' ? <PrimitiveView /> : null}
        </div>
        <div slot="panel" data-value="semantic">
          {view === 'semantic' ? <SemanticView themeName={themeName} /> : null}
        </div>
        <div slot="panel" data-value="component">
          {view === 'component' ? <ComponentView /> : null}
        </div>
      </rds-tabs>
    </div>
  );
}

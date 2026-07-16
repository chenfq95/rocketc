import { useState } from 'react';

import type { DesignThemeName } from '../../previewModel';
import { ComponentView } from './ComponentView';
import { ExplanationView } from './ExplanationView';
import { PrimitiveView } from './PrimitiveView';
import { SemanticView } from './SemanticView';

type DesignSystemView = 'primitive' | 'semantic' | 'component' | 'explanation';

const views = [
  ['primitive', 'Primitive'],
  ['semantic', 'Semantic'],
  ['component', 'Component'],
  ['explanation', 'Explanation'],
] as const satisfies ReadonlyArray<readonly [DesignSystemView, string]>;

export function DesignSystemPanel({ themeName }: { themeName: DesignThemeName }) {
  const [view, setView] = useState('primitive' as DesignSystemView);

  return (
    <div className="design-system-panel">
      <div className="subtabs" role="tablist" aria-label="Design System views">
        {views.map(([value, label]) => (
          <rds-button
            key={value}
            size="sm"
            type="button"
            variant={view === value ? 'solid' : 'ghost'}
            aria-selected={view === value}
            onClick={() => setView(value)}
          >
            {label}
          </rds-button>
        ))}
      </div>

      {view === 'primitive' ? <PrimitiveView /> : null}
      {view === 'semantic' ? <SemanticView themeName={themeName} /> : null}
      {view === 'component' ? <ComponentView /> : null}
      {view === 'explanation' ? <ExplanationView /> : null}
    </div>
  );
}

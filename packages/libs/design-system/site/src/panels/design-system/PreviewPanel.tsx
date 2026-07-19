import type { ReactNode } from 'react';

/** Shared token-panel chrome on `rc-panel`. */
export function PreviewPanel({
  meta,
  title,
  badge,
  className,
  children,
}: {
  meta: string;
  title: ReactNode;
  badge?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <rc-panel bordered padded class={['preview-panel', className].filter(Boolean).join(' ')}>
      <div className="panel-header" slot="header">
        <div>
          <rc-typography class="meta" variant="caption" as="p">
            {meta}
          </rc-typography>
          <rc-typography variant="heading" as="h2">
            {title}
          </rc-typography>
        </div>
        {badge ? <rc-badge variant="secondary">{badge}</rc-badge> : null}
      </div>
      {children}
    </rc-panel>
  );
}

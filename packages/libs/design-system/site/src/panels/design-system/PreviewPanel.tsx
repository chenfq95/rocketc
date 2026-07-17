import type { ReactNode } from 'react';

/** Shared token-panel chrome on `rds-panel`. */
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
    <rds-panel bordered padded class={['preview-panel', className].filter(Boolean).join(' ')}>
      <div className="panel-header" slot="header">
        <div>
          <rds-typography class="meta" variant="caption" as="p">
            {meta}
          </rds-typography>
          <rds-typography variant="heading" as="h2">
            {title}
          </rds-typography>
        </div>
        {badge ? <rds-badge variant="secondary">{badge}</rds-badge> : null}
      </div>
      {children}
    </rds-panel>
  );
}

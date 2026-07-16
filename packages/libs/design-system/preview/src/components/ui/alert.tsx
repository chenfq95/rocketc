import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cn } from '../../lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        // Status surfaces use DS soft fills (not solid /10 washes).
        destructive: 'border-danger-border bg-danger-soft text-danger-fg [&>svg]:text-danger-fg',
        success: 'border-success-border bg-success-soft text-success-fg [&>svg]:text-success-fg',
        warning: 'border-warning-border bg-warning-soft text-warning-fg [&>svg]:text-warning-fg',
        info: 'border-info-border bg-info-soft text-info-fg [&>svg]:text-info-fg',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export function Alert({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>) {
  return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

export function AlertTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5 className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
  );
}

export function AlertDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      className={cn('text-sm text-muted-foreground [&_p]:leading-relaxed', className)}
      {...props}
    />
  );
}

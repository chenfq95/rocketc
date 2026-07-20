import { ArrowRight, Ellipsis, Plus, Search, Settings, type LucideProps } from 'lucide-react';

const icons = {
  plus: Plus,
  'arrow-right': ArrowRight,
  setting: Settings,
  search: Search,
  ellipsis: Ellipsis,
} as const;

export type LucideIconName = keyof typeof icons;

type LucideIconProps = LucideProps & {
  name: LucideIconName;
};

/** Lucide icon for site previews (not a product dependency of web-components). */
export function LucideIcon({ name, ...rest }: LucideIconProps) {
  const Icon = icons[name];
  return <Icon width="1em" height="1em" aria-hidden focusable="false" {...rest} />;
}

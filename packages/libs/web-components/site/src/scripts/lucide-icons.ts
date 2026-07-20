import {
  ArrowRight,
  Download,
  Ellipsis,
  Plus,
  RefreshCw,
  Search,
  Settings,
  X,
  createIcons,
} from 'lucide';

/** Icons used by component demos — import only what demos need (tree-shakeable). */
const demoIcons = {
  ArrowRight,
  Download,
  Ellipsis,
  Plus,
  RefreshCw,
  Search,
  Settings,
  X,
};

/** Official Lucide vanilla API: replace `[data-lucide]` with SVG. */
export function initLucideIcons(root: ParentNode = document) {
  createIcons({
    icons: demoIcons,
    root: root as Document | HTMLElement,
    attrs: {
      width: '1em',
      height: '1em',
      'aria-hidden': 'true',
    },
  });
}

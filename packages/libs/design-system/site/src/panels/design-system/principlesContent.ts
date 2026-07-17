/** Copy for the Design System Principles tab (product philosophy + contracts). */

export const principlesIntro = {
  meta: 'Design principles',
  title: 'Personal tool UI, token-first',
  lede: 'Quiet neutral chrome, brand on focus, dense when the task needs it—and one semantic contract that travels across CSS, MUI, Chakra, and Tailwind.',
};

export const packageScope = {
  title: 'Source of truth for look and feel',
  is: [
    'Design principles for personal tool UI',
    'DTCG tokens: primitive → semantic → theme',
    'Compiled bridges: CSS variables, JS maps, MUI, Chakra, Tailwind / shadcn',
  ],
  isNot: [
    'Not a React / Vue / Svelte component kit—recipes live in adapters and apps',
    'Not a Figma sync pipeline—tokens are code-first',
    'Not a second visual system per framework—adapters remap the same roles',
  ],
};

export const productDirection = {
  title: 'Product direction',
  blurb: 'Built for tools, dashboards, and dense settings—not marketing sites.',
  bullets: [
    'Switchable brand families: default (near-black) and sun (orange)',
    'Dense when the workflow needs it; readable type over cramped packing',
    'Portable across frameworks—tokens are the shared core',
    'Signature from brand + type hierarchy + three-step depth, not a multi-hue palette',
  ],
};

export const designGoals = [
  {
    title: 'Recognizable',
    body: 'Brand family plus clear hierarchy feels owned without noisy decoration.',
  },
  {
    title: 'Portable',
    body: 'One token source compiles to CSS variables, JS maps, MUI, Chakra, and Tailwind.',
  },
  {
    title: 'Semantic-first',
    body: 'Apps consume roles like control.primary.bg and shadow.raised—not raw neutrals.',
  },
  {
    title: 'Comparable',
    body: 'This site makes family, light/dark, and framework parity easy to check.',
  },
  {
    title: 'Thin shared core',
    body: 'Component recipes stay in adapters and apps; the design system stays token-shaped.',
  },
];

export const brandFamilies = [
  {
    family: 'default',
    character: 'Black / near-black neutral chrome',
    solid: 'neutral.950',
  },
  {
    family: 'sun',
    character: 'Orange brand focus',
    solid: 'orange.500 (#FF6900)',
  },
];

export const tokenLayers = [
  {
    layer: 'Primitive',
    path: 'tokens/primitive/',
    role: 'Raw scales—hues, space, type sizes, shadow steps.',
  },
  {
    layer: 'Semantic',
    path: 'tokens/semantic/',
    role: 'Product-facing roles—the contract apps should consume.',
  },
  {
    layer: 'Theme',
    path: 'tokens/theme/…',
    role: 'Remaps semantic values per default|sun × light|dark.',
  },
];

export type PrincipleCard = {
  title: string;
  intent: string;
  do: string[];
  dont: string[];
};

export const principleCards: PrincipleCard[] = [
  {
    title: 'Signature through brand and hierarchy',
    intent: 'Important surfaces feel owned without hurting scanability.',
    do: [
      'Use the active brand on primary actions, selection, and key emphasis',
      'Keep type roles distinct (display → caption)',
      'Keep elevation to three steps: panel / elevated / overlay',
    ],
    dont: [
      'Invent ad-hoc saturated hues outside default / sun',
      'Cover the UI in brand fill',
      'Invent elevation.1…n for tool density',
    ],
  },
  {
    title: 'Quiet by default, brand on focus',
    intent: 'Chrome stays calm; energy appears where the user acts.',
    do: [
      'Keep default surfaces, borders, and secondary actions neutral',
      'Reserve brand for primary CTAs, selection, and important focus',
      'Keep status colors in the status lane only',
    ],
    dont: ['Tint every card with brand soft', 'Use danger / success as decoration'],
  },
  {
    title: 'Dense when needed',
    intent: 'Tools need compact information, not cramped type.',
    do: [
      'Prefer a readable body size and a 4px spacing grid',
      'Tighten with spacing and hierarchy, not by dropping contrast',
      'Use layout tokens for header / toolbar / sidebar rhythm',
    ],
    dont: [
      'Shrink text below readable sizes to fit more',
      'Add cozy density modes without a proven product need',
    ],
  },
  {
    title: 'Color has meaning',
    intent: 'Roles are contracts—do not mix them casually.',
    do: [
      'Brand = identity + primary action',
      'Control primary / secondary = complete control recipes',
      'Success / warning / danger = status only; info = informational chrome',
    ],
    dont: [
      'Use brand for errors',
      'Use success green as a primary CTA',
      'Treat info as a second brand color',
    ],
  },
  {
    title: 'Motion should confirm',
    intent: 'Motion confirms change; it does not entertain.',
    do: [
      'Prefer duration.fast / normal (120–180ms) for hover, focus, toggles',
      'Use easing.enter / exit when showing or hiding layers',
      'Respect reduced-motion in applications',
    ],
    dont: [
      'Add ambient looping motion on tool chrome',
      'Use long decorative transitions on dense workflows',
    ],
  },
  {
    title: 'Portable by design',
    intent: 'Tokens travel; components can differ.',
    do: [
      'Change look in tokens/, then rebuild',
      'Prefer semantic tokens in apps and adapters',
      'Keep framework-specific recipes out of shared token JSON',
    ],
    dont: [
      'Hardcode hex when a semantic token exists',
      'Fork a second visual system without a migration plan',
    ],
  },
];

export const depthSteps = [
  {
    name: 'Panel',
    recipe: 'surface.panel + shadow.surface',
    detail: 'Resting content on the stage.',
  },
  {
    name: 'Elevated',
    recipe: 'surface.elevated + shadow.raised',
    detail: 'Floating UI—raised shadow required.',
  },
  {
    name: 'Overlay',
    recipe: 'surface.elevated + shadow.overlay',
    detail: 'Modal, menu, and top chrome.',
  },
];

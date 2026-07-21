import { rcStyleProperties } from '../../../src/internal/style-properties';
import {
  bilingualDemoDescription,
  bilingualDemoTitle,
  bilingualEventDescription,
  bilingualSlotDescription,
  bilingualSummary,
} from './bilingual';

export type ApiProp = {
  name: string;
  type: string;
  attribute?: string;
  reflect: boolean;
  defaultValue: string;
};

export type ApiSlot = {
  name: string;
  description: string;
};

export type ApiEvent = {
  name: string;
  description: string;
};

export type ApiPart = {
  name: string;
  description: string;
};

export type ApiMethod = {
  name: string;
  signature: string;
  description: string;
};

export type CommonStyleProp = {
  name: string;
  attribute: string;
  cssProperty: string;
};

export type ElementApi = {
  tag: string;
  file: string;
  summary: string;
  slots: ApiSlot[];
  events: ApiEvent[];
  props: ApiProp[];
  methods: ApiMethod[];
  parts: ApiPart[];
};

export type ComponentDemo = {
  id: string;
  title: string;
  description: string;
  html: string;
};

export type ComponentPage = {
  id: string;
  category: string;
  component: string;
  href: string;
  tags: string[];
  demos: ComponentDemo[];
  elements: ElementApi[];
};

export type CategoryGroup = {
  category: string;
  components: ComponentPage[];
};

const demoModules = import.meta.glob('../../../src/components/**/demo/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const sourceModules = import.meta.glob('../../../src/components/**/*.ts', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const commonStyleProps: CommonStyleProp[] = rcStyleProperties.map((definition) => ({
  name: definition.property,
  attribute: definition.attribute,
  cssProperty: definition.cssProperty,
}));

const partDescriptions: Record<string, string> = {
  container: '主要内部容器。 / Primary internal container.',
  control: '原生交互控件。 / Native interactive control.',
  item: '集合中的重复项。 / Repeated item in a collection.',
  label: '可见标签。 / Visible label.',
  title: '标题区域。 / Title region.',
  body: '主体内容区域。 / Main content region.',
  header: '头部区域。 / Header region.',
  footer: '底部区域。 / Footer region.',
  input: '文本输入控件。 / Text input control.',
  close: '关闭控件。 / Close control.',
  icon: '图标区域。 / Icon region.',
  root: '根布局容器。 / Root layout container.',
};

const formSubmitterProps: ApiProp[] = [
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    attribute: 'type',
    reflect: true,
    defaultValue: "'button'",
  },
  { name: 'name', type: 'string', attribute: 'name', reflect: true, defaultValue: "''" },
  { name: 'value', type: 'string', attribute: 'value', reflect: true, defaultValue: "''" },
  {
    name: 'disabled',
    type: 'boolean',
    attribute: 'disabled',
    reflect: true,
    defaultValue: 'false',
  },
  {
    name: 'formAction',
    type: 'string',
    attribute: 'formaction',
    reflect: true,
    defaultValue: "''",
  },
  {
    name: 'formEnctype',
    type: 'string',
    attribute: 'formenctype',
    reflect: true,
    defaultValue: "''",
  },
  {
    name: 'formMethod',
    type: 'string',
    attribute: 'formmethod',
    reflect: true,
    defaultValue: "''",
  },
  {
    name: 'formNoValidate',
    type: 'boolean',
    attribute: 'formnovalidate',
    reflect: true,
    defaultValue: 'false',
  },
  {
    name: 'formTarget',
    type: 'string',
    attribute: 'formtarget',
    reflect: true,
    defaultValue: "''",
  },
  { name: 'form', type: 'readonly HTMLFormElement | null', reflect: false, defaultValue: 'null' },
  { name: 'labels', type: 'readonly NodeList', reflect: false, defaultValue: '—' },
  { name: 'validity', type: 'readonly ValidityState', reflect: false, defaultValue: '—' },
  { name: 'validationMessage', type: 'readonly string', reflect: false, defaultValue: "''" },
  { name: 'willValidate', type: 'readonly boolean', reflect: false, defaultValue: '—' },
];

const iconButtonInheritedProps: ApiProp[] = [
  { name: 'size', type: 'RcButtonSize', attribute: 'size', reflect: true, defaultValue: "'md'" },
  { name: 'href', type: 'string', attribute: 'href', reflect: true, defaultValue: "''" },
  { name: 'target', type: 'string', attribute: 'target', reflect: true, defaultValue: "''" },
  { name: 'download', type: 'string', attribute: 'download', reflect: true, defaultValue: "''" },
  { name: 'command', type: 'string', attribute: 'command', reflect: true, defaultValue: "''" },
  {
    name: 'commandFor',
    type: 'string',
    attribute: 'commandfor',
    reflect: true,
    defaultValue: "''",
  },
  {
    name: 'popoverTarget',
    type: 'string',
    attribute: 'popovertarget',
    reflect: true,
    defaultValue: "''",
  },
  {
    name: 'popoverTargetAction',
    type: 'string',
    attribute: 'popovertargetaction',
    reflect: true,
    defaultValue: "''",
  },
  { name: 'loading', type: 'boolean', attribute: 'loading', reflect: true, defaultValue: 'false' },
  { name: 'icon', type: 'boolean', attribute: 'icon', reflect: true, defaultValue: 'true' },
  {
    name: 'autofocus',
    type: 'boolean',
    attribute: 'autofocus',
    reflect: true,
    defaultValue: 'false',
  },
];

const buttonMethods: ApiMethod[] = [
  {
    name: 'click',
    signature: 'click(): void',
    description: '激活内部原生控件。 / Activates the inner native control.',
  },
  {
    name: 'focus',
    signature: 'focus(options?: FocusOptions): void',
    description: '将焦点移入内部控件。 / Moves focus to the inner control.',
  },
  {
    name: 'blur',
    signature: 'blur(): void',
    description: '移除内部控件的焦点。 / Removes focus from the inner control.',
  },
  {
    name: 'checkValidity',
    signature: 'checkValidity(): boolean',
    description: '检查约束校验并可能派发 invalid。 / Checks constraints and may dispatch invalid.',
  },
  {
    name: 'reportValidity',
    signature: 'reportValidity(): boolean',
    description:
      '检查并向用户报告约束校验结果。 / Checks and reports constraint-validation results.',
  },
  {
    name: 'setCustomValidity',
    signature: 'setCustomValidity(error: string): void',
    description: '设置或清除自定义校验错误。 / Sets or clears a custom validation error.',
  },
];

function supplementalProps(tag: string): ApiProp[] {
  if (tag === 'rc-button') return formSubmitterProps;
  if (tag === 'rc-icon-button') return [...formSubmitterProps, ...iconButtonInheritedProps];
  return [];
}

function supplementalMethods(tag: string): ApiMethod[] {
  return tag === 'rc-button' || tag === 'rc-icon-button' ? buttonMethods : [];
}

function describePart(name: string) {
  return partDescriptions[name] ?? `内部 ${name} 节点。 / Internal ${name} node.`;
}

function normalizePath(filePath: string) {
  return filePath.replaceAll('\\', '/');
}

function parseFolder(filePath: string): { category: string; component: string } | null {
  const match = normalizePath(filePath).match(/src\/components\/([^/]+)\/([^/]+)\//);
  if (!match) return null;
  return { category: match[1], component: match[2] };
}

function stripHtmlComments(html: string) {
  return html.replace(/<!--[\s\S]*?-->/g, '').trim();
}

function parseDemo(filePath: string, source: string): ComponentDemo {
  const metadata = source.match(/<!--([\s\S]*?)-->/)?.[1] ?? '';
  const title = metadata.match(/^\s*title:\s*(.+)$/m)?.[1]?.trim();
  const description = metadata.match(/^\s*description:\s*(.+)$/m)?.[1]?.trim();

  if (!title || !description) {
    throw new Error(`Demo ${filePath} must declare title and description metadata`);
  }

  return {
    id:
      normalizePath(filePath)
        .split('/')
        .pop()
        ?.replace(/\.html$/, '') ?? title,
    title: bilingualDemoTitle(title),
    description: bilingualDemoDescription(description),
    html: stripHtmlComments(source),
  };
}

function extractSummary(block: string) {
  return block
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, '').trim())
    .filter((line) => line && !line.startsWith('@'))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseElementApi(filePath: string, source: string): ElementApi | null {
  const tagMatch = source.match(/@element\s+(rc-[\w-]+)/);
  if (!tagMatch) return null;

  const tag = tagMatch[1];
  const docMatch = source.match(/\/\*\*([\s\S]*?)\*\//);
  const doc = docMatch?.[1] ?? '';

  const slots = [...doc.matchAll(/@slot\s+([^\s-]+)?\s*-?\s*(.*)$/gm)].map((match) => ({
    name: (match[1] && match[1] !== '-' ? match[1] : 'default').trim(),
    description: bilingualSlotDescription(
      (match[2] || '').trim(),
      (match[1] && match[1] !== '-' ? match[1] : 'default').trim(),
    ),
  }));

  const events = [...doc.matchAll(/@fires?\s+(\S+)\s*-?\s*(.*)$/gm)].map((match) => ({
    name: match[1].trim(),
    description: bilingualEventDescription((match[2] || '').trim(), match[1].trim()),
  }));

  const props: ApiProp[] = [];
  const propRegex =
    /@property\((\{[\s\S]*?\})\)\s*\n\s*accessor\s+([A-Za-z0-9_]+)\s*:\s*([^=\n]+?)(?:\s*=\s*([^;]+))?;/g;

  for (const match of source.matchAll(propRegex)) {
    const options = match[1];
    const name = match[2];
    const type = match[3].replace(/\s+/g, ' ').trim();
    const defaultValue = (match[4] ?? '').trim();
    const attributeMatch = options.match(/attribute\s*:\s*['"]([^'"]+)['"]/);
    const reflect = /reflect\s*:\s*true/.test(options);
    props.push({
      name,
      type,
      attribute: attributeMatch?.[1] ?? (reflect ? name : undefined),
      reflect,
      defaultValue: defaultValue || '—',
    });
  }

  for (const prop of supplementalProps(tag)) {
    if (!props.some((candidate) => candidate.name === prop.name)) props.push(prop);
  }

  const parts = [
    ...new Set(
      [
        ...source.matchAll(/\bpart=["']([^"']+)["']/g),
        ...source.matchAll(/setAttribute\(["']part["'],\s*["']([^"']+)["']\)/g),
      ].flatMap((match) => match[1].split(/\s+/).filter(Boolean)),
    ),
  ]
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ({ name, description: describePart(name) }));

  return {
    tag,
    file: normalizePath(filePath).split('/').pop() ?? filePath,
    summary: bilingualSummary(extractSummary(doc), tag),
    slots,
    events,
    props,
    methods: supplementalMethods(tag),
    parts,
  };
}

type FolderBucket = {
  category: string;
  component: string;
  demos: ComponentDemo[];
  elements: ElementApi[];
};

const folders = new Map<string, FolderBucket>();

function ensureFolder(category: string, component: string) {
  const id = `${category}/${component}`;
  let bucket = folders.get(id);
  if (!bucket) {
    bucket = { category, component, demos: [], elements: [] };
    folders.set(id, bucket);
  }
  return bucket;
}

for (const [filePath, html] of Object.entries(demoModules)) {
  const folder = parseFolder(filePath);
  if (!folder) continue;
  const demo = parseDemo(filePath, html);
  if (!demo.html) continue;
  ensureFolder(folder.category, folder.component).demos.push(demo);
}

for (const [filePath, source] of Object.entries(sourceModules)) {
  const normalized = normalizePath(filePath);
  if (normalized.includes('/demo/') || normalized.endsWith('/index.ts')) continue;
  const folder = parseFolder(normalized);
  if (!folder) continue;
  const api = parseElementApi(normalized, source);
  if (!api) continue;
  ensureFolder(folder.category, folder.component).elements.push(api);
}

export const components: ComponentPage[] = [...folders.values()]
  .map((bucket) => {
    const elements = bucket.elements.sort((a, b) => a.tag.localeCompare(b.tag));
    const fallbackTag = elements[0]?.tag ?? 'rc-box';
    const demos =
      bucket.demos.length > 0
        ? bucket.demos.sort((a, b) => a.id.localeCompare(b.id))
        : [
            {
              id: 'basic',
              title: '基础 / Basic',
              description: `展示默认的 ${fallbackTag} 元素。 / Shows the default ${fallbackTag} element.`,
              html: `<div class="rc-demo"><${fallbackTag}></${fallbackTag}></div>`,
            },
          ];

    return {
      id: `${bucket.category}/${bucket.component}`,
      category: bucket.category,
      component: bucket.component,
      href: `/${bucket.category}/${bucket.component}/`,
      tags: elements.map((element) => element.tag),
      demos,
      elements,
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

export function getComponent(category: string, component: string): ComponentPage | undefined {
  return components.find((entry) => entry.category === category && entry.component === component);
}

export function getNav(): CategoryGroup[] {
  const byCategory = new Map<string, ComponentPage[]>();
  for (const entry of components) {
    const list = byCategory.get(entry.category) ?? [];
    list.push(entry);
    byCategory.set(entry.category, list);
  }

  return [...byCategory.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, list]) => ({
      category,
      components: list.sort((a, b) => a.component.localeCompare(b.component)),
    }));
}

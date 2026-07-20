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
};

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

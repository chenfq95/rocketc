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

export type ElementApi = {
  tag: string;
  file: string;
  summary: string;
  slots: ApiSlot[];
  events: ApiEvent[];
  props: ApiProp[];
};

export type ComponentPage = {
  id: string;
  category: string;
  component: string;
  href: string;
  tags: string[];
  previewHtml: string;
  sourceCode: string;
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
  const tagMatch = source.match(/@element\s+(rds-[\w-]+)/);
  if (!tagMatch) return null;

  const tag = tagMatch[1];
  const docMatch = source.match(/\/\*\*([\s\S]*?)\*\//);
  const doc = docMatch?.[1] ?? '';

  const slots = [...doc.matchAll(/@slot\s+([^\s-]+)?\s*-?\s*(.*)$/gm)].map((match) => ({
    name: (match[1] && match[1] !== '-' ? match[1] : 'default').trim(),
    description: (match[2] || '').trim(),
  }));

  const events = [...doc.matchAll(/@fires?\s+(\S+)\s*-?\s*(.*)$/gm)].map((match) => ({
    name: match[1].trim(),
    description: (match[2] || '').trim(),
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

  return {
    tag,
    file: normalizePath(filePath).split('/').pop() ?? filePath,
    summary: extractSummary(doc),
    slots,
    events,
    props,
  };
}

type FolderBucket = {
  category: string;
  component: string;
  demos: string[];
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
  const body = stripHtmlComments(html);
  if (!body) continue;
  ensureFolder(folder.category, folder.component).demos.push(body);
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
    const fallbackTag = elements[0]?.tag ?? 'rds-box';
    const demos =
      bucket.demos.length > 0
        ? bucket.demos
        : [`<div class="rds-demo"><${fallbackTag}></${fallbackTag}></div>`];
    const previewHtml = `<div class="rds-demo-stack">${demos.join('\n')}</div>`;
    const sourceCode = demos.join('\n\n');

    return {
      id: `${bucket.category}/${bucket.component}`,
      category: bucket.category,
      component: bucket.component,
      href: `/${bucket.category}/${bucket.component}/`,
      tags: elements.map((element) => element.tag),
      previewHtml,
      sourceCode,
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

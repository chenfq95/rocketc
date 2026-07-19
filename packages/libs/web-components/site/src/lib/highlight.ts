import { format } from 'prettier';
import { codeToHtml, type BundledLanguage } from 'shiki';

export function highlightCode(source: string, lang: BundledLanguage): Promise<string> {
  return codeToHtml(source.trim(), {
    lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
  });
}

export async function formatAndHighlightHtml(source: string): Promise<string> {
  let formatted = source.trim();

  try {
    formatted = await format(formatted, {
      parser: 'html',
      printWidth: 88,
      tabWidth: 2,
      htmlWhitespaceSensitivity: 'ignore',
    });
  } catch {
    // 如果 Prettier 无法解析代码片段，则保留原始源码。 / Keep the original source if Prettier cannot parse the snippet.
  }

  return highlightCode(formatted.trimEnd(), 'html');
}

import { format } from 'prettier';
import { codeToHtml } from 'shiki';

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
    // Keep original source if Prettier cannot parse the snippet.
  }

  return codeToHtml(formatted.trimEnd(), {
    lang: 'html',
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
  });
}

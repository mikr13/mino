import type { SupportedLanguage } from '@/types';

/**
 * Format code using Prettier
 */
export const formatCode = async (
  code: string,
  language: SupportedLanguage
): Promise<string> => {
  try {
    // For JavaScript and TypeScript, we'll use Prettier
    if (language === 'javascript' || language === 'typescript') {
      // Dynamic import to avoid bundling issues
      const prettier = await import('prettier/standalone');
      const parserBabel = await import('prettier/parser-babel');
      const parserTypescript = await import('prettier/parser-typescript');

      const parser = language === 'javascript' ? 'babel' : 'typescript';

      const formatted = prettier.format(code, {
        parser,
        plugins: [parserBabel, parserTypescript],
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        printWidth: 80,
      });

      return formatted;
    }

    // For other languages, return original code
    return code;
  } catch {
    // Failed to format code, return original
    return code;
  }
};

/**
 * Check if a language supports formatting
 */
export const supportsFormatting = (language: SupportedLanguage): boolean => {
  return ['javascript', 'typescript'].includes(language);
};

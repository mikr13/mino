import type { LanguageConfig } from '@/types';

/**
 * Default code templates for different languages
 */
export const DEFAULT_CODE_TEMPLATES = {
    python: `# Python Solution
def solution():
    # Write your code here
    pass

# Test your solution
if __name__ == "__main__":
    print("Hello, World!")`,

    javascript: `// JavaScript Solution
function solution() {
    // Write your code here
    return null;
}

// Test your solution
console.log("Hello, World!");`,

    typescript: `// TypeScript Solution
function solution(): any {
    // Write your code here
    return null;
}

// Test your solution
console.log("Hello, World!");`,

    java: `// Java Solution
public class Solution {
    public static void main(String[] args) {
        // Write your code here
        System.out.println("Hello, World!");
    }
}`,

    cpp: `// C++ Solution
#include <iostream>
using namespace std;

int main() {
    // Write your code here
    cout << "Hello, World!" << endl;
    return 0;
}`,

    c: `// C Solution
#include <stdio.h>

int main() {
    // Write your code here
    printf("Hello, World!\\n");
    return 0;
}`,
};

/**
 * Language configuration mapping
 */
export const LANGUAGE_CONFIGS: Record<string, LanguageConfig> = {
    python: {
        id: 'python',
        label: 'Python',
        monacoLanguage: 'python',
        defaultCode: DEFAULT_CODE_TEMPLATES.python,
        fileExtension: 'py',
    },
    javascript: {
        id: 'javascript',
        label: 'JavaScript',
        monacoLanguage: 'javascript',
        defaultCode: DEFAULT_CODE_TEMPLATES.javascript,
        fileExtension: 'js',
    },
    typescript: {
        id: 'typescript',
        label: 'TypeScript',
        monacoLanguage: 'typescript',
        defaultCode: DEFAULT_CODE_TEMPLATES.typescript,
        fileExtension: 'ts',
    },
    java: {
        id: 'java',
        label: 'Java',
        monacoLanguage: 'java',
        defaultCode: DEFAULT_CODE_TEMPLATES.java,
        fileExtension: 'java',
    },
    cpp: {
        id: 'cpp',
        label: 'C++',
        monacoLanguage: 'cpp',
        defaultCode: DEFAULT_CODE_TEMPLATES.cpp,
        fileExtension: 'cpp',
    },
    c: {
        id: 'c',
        label: 'C',
        monacoLanguage: 'c',
        defaultCode: DEFAULT_CODE_TEMPLATES.c,
        fileExtension: 'c',
    },
};

/**
 * Get language configuration by ID
 */
export function getLanguageConfig(languageId: string): LanguageConfig {
    return LANGUAGE_CONFIGS[languageId] || LANGUAGE_CONFIGS.javascript;
}

/**
 * Get all supported languages
 */
export function getSupportedLanguages(): LanguageConfig[] {
    return Object.values(LANGUAGE_CONFIGS);
}

/**
 * Check if a language is supported
 */
export function isLanguageSupported(languageId: string): boolean {
    return languageId in LANGUAGE_CONFIGS;
} 

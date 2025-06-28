import { DEFAULT_CODE_TEMPLATES } from '@/config/languages';
import type { ReadonlyRange, SupportedLanguage } from '@/types';
import type { Story } from '@ladle/react';
import { useState } from 'react';
import { CodeEditor } from './code-editor';

// Basic story
export const Basic: Story = () => {
  const [code, setCode] = useState(DEFAULT_CODE_TEMPLATES.javascript);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <CodeEditor language="javascript" onChange={setCode} value={code} />
    </div>
  );
};

// Python example
export const Python: Story = () => {
  const [code, setCode] = useState(DEFAULT_CODE_TEMPLATES.python);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <CodeEditor language="python" onChange={setCode} value={code} />
    </div>
  );
};

// Dark theme
export const DarkTheme: Story = () => {
  const [code, setCode] = useState(DEFAULT_CODE_TEMPLATES.javascript);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <CodeEditor
        language="javascript"
        onChange={setCode}
        theme="dark"
        value={code}
      />
    </div>
  );
};

// With readonly ranges
export const WithReadonlyRanges: Story = () => {
  const [code, setCode] = useState(`// This is a protected header - DO NOT EDIT
function solutionTemplate() {
    // Write your solution here
    return null;
}

// This is also protected - DO NOT EDIT
console.log(solutionTemplate());`);

  const readonlyRanges: ReadonlyRange[] = [
    { startLine: 1, endLine: 2 }, // Header comment and function declaration
    { startLine: 6, endLine: 8 }, // Footer comment and console.log
  ];

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <CodeEditor
        language="javascript"
        onChange={setCode}
        readonlyRanges={readonlyRanges}
        value={code}
      />
    </div>
  );
};

// Custom options
export const CustomOptions: Story = () => {
  const [code, setCode] = useState(DEFAULT_CODE_TEMPLATES.javascript);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <CodeEditor
        language="javascript"
        onChange={setCode}
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          lineNumbers: 'off',
          wordWrap: 'on',
        }}
        value={code}
      />
    </div>
  );
};

// Language comparison
export const LanguageComparison: Story = () => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>('javascript');
  const [code, setCode] = useState(DEFAULT_CODE_TEMPLATES.javascript);

  const handleLanguageChange = (language: SupportedLanguage) => {
    setSelectedLanguage(language);
    setCode(DEFAULT_CODE_TEMPLATES[language]);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '600px',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {(Object.keys(DEFAULT_CODE_TEMPLATES) as SupportedLanguage[]).map(
          (lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                backgroundColor:
                  selectedLanguage === lang ? '#3182ce' : '#ffffff',
                color: selectedLanguage === lang ? '#ffffff' : '#1a202c',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
              type="button"
            >
              {lang}
            </button>
          )
        )}
      </div>

      <div style={{ height: '500px' }}>
        <CodeEditor
          language={selectedLanguage}
          onChange={setCode}
          value={code}
        />
      </div>
    </div>
  );
};

// LeetCode-style problem template
export const LeetCodeStyle: Story = () => {
  const [code, setCode] = useState(`class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        """
        Given an array of integers nums and an integer target, 
        return indices of the two numbers such that they add up to target.
        
        You may assume that each input would have exactly one solution, 
        and you may not use the same element twice.
        """
        # Write your solution here
        pass`);

  const readonlyRanges: ReadonlyRange[] = [
    { startLine: 1, endLine: 1 }, // Class declaration
    { startLine: 2, endLine: 9 }, // Function signature and docstring
  ];

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <CodeEditor
        language="python"
        onChange={setCode}
        options={{
          fontSize: 14,
          lineNumbers: 'on',
          minimap: { enabled: true },
          wordWrap: 'off',
        }}
        readonlyRanges={readonlyRanges}
        theme="light"
        value={code}
      />
    </div>
  );
};

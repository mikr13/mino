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

// Light theme
export const LightTheme: Story = () => {
  const [code, setCode] = useState(DEFAULT_CODE_TEMPLATES.javascript);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <CodeEditor
        language="javascript"
        onChange={setCode}
        theme="light"
        value={code}
      />
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

// Enhanced with toolbar
export const WithToolbar: Story = () => {
  const [code, setCode] = useState(DEFAULT_CODE_TEMPLATES.python);
  const [language, setLanguage] = useState<SupportedLanguage>('python');

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <CodeEditor
        defaultCode={DEFAULT_CODE_TEMPLATES}
        language={language}
        onChange={setCode}
        onLanguageChange={setLanguage}
        showToolbar={true}
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
          defaultCode={DEFAULT_CODE_TEMPLATES}
          language={selectedLanguage}
          onChange={setCode}
          onLanguageChange={setSelectedLanguage}
          showLanguageSwitcher={true}
          showToolbar={true}
          value={code}
        />
      </div>
    </div>
  );
};

// LeetCode-style problem template with action buttons
export const LeetcodeStyle: Story = () => {
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
  const [language, setLanguage] = useState<SupportedLanguage>('python');

  const handleRun = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert('Code executed!');
  };

  const handleSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert('Solution submitted!');
  };

  const readonlyRanges: ReadonlyRange[] = [
    { startLine: 1, endLine: 1 }, // Class declaration
    { startLine: 2, endLine: 9 }, // Function signature and docstring
  ];

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <CodeEditor
        defaultCode={DEFAULT_CODE_TEMPLATES}
        language={language}
        onChange={setCode}
        onLanguageChange={setLanguage}
        onRun={handleRun}
        onSubmit={handleSubmit}
        readonlyRanges={readonlyRanges}
        showActionButtons={true}
        showStatusBar={true}
        showToolbar={true}
        value={code}
      />
    </div>
  );
};

// Minimal toolbar
export const MinimalToolbar: Story = () => {
  const [code, setCode] = useState(DEFAULT_CODE_TEMPLATES.javascript);
  const [language, setLanguage] = useState<SupportedLanguage>('javascript');

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <CodeEditor
        defaultCode={DEFAULT_CODE_TEMPLATES}
        language={language}
        onChange={setCode}
        onLanguageChange={setLanguage}
        showAutoCorrectToggle={false}
        showFormatButton={true}
        showFullScreenButton={false}
        showLanguageSwitcher={true}
        showResetButton={false}
        showStatusBar={false}
        showToolbar={true}
        value={code}
      />
    </div>
  );
};

// Full screen demo
export const FullScreenDemo: Story = () => {
  const [code, setCode] = useState(DEFAULT_CODE_TEMPLATES.typescript);
  const [language, setLanguage] = useState<SupportedLanguage>('typescript');
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <CodeEditor
        defaultCode={DEFAULT_CODE_TEMPLATES}
        isFullScreen={isFullScreen}
        language={language}
        onChange={setCode}
        onFullScreenToggle={setIsFullScreen}
        onLanguageChange={setLanguage}
        showToolbar={true}
        theme="dark"
        value={code}
      />
    </div>
  );
};

// Custom icon components (using simple emoji for demo)
const CustomFormatIcon = () => <span>🎨</span>;
const CustomResetIcon = () => <span>🔄</span>;
const CustomRunIcon = () => <span>▶️</span>;
const CustomSubmitIcon = () => <span>📤</span>;

// Custom icons
export const CustomIcons: Story = () => {
  const [code, setCode] = useState(DEFAULT_CODE_TEMPLATES.java);
  const [language, setLanguage] = useState<SupportedLanguage>('java');

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <CodeEditor
        defaultCode={DEFAULT_CODE_TEMPLATES}
        icons={{
          format: CustomFormatIcon,
          reset: CustomResetIcon,
          run: CustomRunIcon,
          submit: CustomSubmitIcon,
        }}
        language={language}
        onChange={setCode}
        onLanguageChange={setLanguage}
        onRun={() => alert('Running with custom icon!')}
        onSubmit={() => alert('Submitting with custom icon!')}
        showActionButtons={true}
        showToolbar={true}
        value={code}
      />
    </div>
  );
};

// Theme switcher demo
export const ThemeSwitcher: Story = () => {
  const [code, setCode] = useState(DEFAULT_CODE_TEMPLATES.typescript);
  const [language, setLanguage] = useState<SupportedLanguage>('typescript');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <CodeEditor
        defaultCode={DEFAULT_CODE_TEMPLATES}
        language={language}
        onChange={setCode}
        onLanguageChange={setLanguage}
        onThemeChange={setTheme}
        showThemeSwitcher={true}
        showToolbar={true}
        theme={theme}
        value={code}
      />
    </div>
  );
};

// All features enabled
export const AllFeatures: Story = () => {
  const [code, setCode] = useState(DEFAULT_CODE_TEMPLATES.cpp);
  const [language, setLanguage] = useState<SupportedLanguage>('cpp');
  const [autoCorrect, setAutoCorrect] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleRun = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <CodeEditor
        autoCorrect={autoCorrect}
        defaultCode={DEFAULT_CODE_TEMPLATES}
        isFullScreen={isFullScreen}
        language={language}
        onAutoCorrectToggle={setAutoCorrect}
        onChange={setCode}
        onFullScreenToggle={setIsFullScreen}
        onLanguageChange={setLanguage}
        onRun={handleRun}
        onSubmit={handleSubmit}
        showActionButtons={true}
        showAutoCorrectToggle={true}
        showFormatButton={true}
        showFullScreenButton={true}
        showLanguageSwitcher={true}
        showResetButton={true}
        showResetConfirmation={true}
        showStatusBar={true}
        showToolbar={true}
        value={code}
      />
    </div>
  );
};

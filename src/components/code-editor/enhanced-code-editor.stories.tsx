import { DEFAULT_CODE_TEMPLATES } from '@/config/languages';
import type { SupportedLanguage } from '@/types';
import type { Story } from '@ladle/react';
import { useState } from 'react';
import { EnhancedCodeEditor } from './enhanced-code-editor';

// Basic enhanced editor
export const Enhanced: Story = () => {
  const [code, setCode] = useState(DEFAULT_CODE_TEMPLATES.python);
  const [language, setLanguage] = useState<SupportedLanguage>('python');

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <EnhancedCodeEditor
        defaultCode={DEFAULT_CODE_TEMPLATES}
        language={language}
        onChange={setCode}
        onLanguageChange={setLanguage}
        value={code}
      />
    </div>
  );
};

// LeetCode-style with action buttons
export const LeetCodeStyle: Story = () => {
  const [code, setCode] = useState(`class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        """
        Given an array of integers nums and an integer target, 
        return indices of the two numbers such that they add up to target.
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

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <EnhancedCodeEditor
        defaultCode={DEFAULT_CODE_TEMPLATES}
        language={language}
        onChange={setCode}
        onLanguageChange={setLanguage}
        onRun={handleRun}
        onSubmit={handleSubmit}
        readonlyRanges={[
          { startLine: 1, endLine: 1 }, // Class declaration
          { startLine: 2, endLine: 6 }, // Function signature and docstring
        ]}
        showActionButtons={true}
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
      <EnhancedCodeEditor
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
      <EnhancedCodeEditor
        defaultCode={DEFAULT_CODE_TEMPLATES}
        isFullScreen={isFullScreen}
        language={language}
        onChange={setCode}
        onFullScreenToggle={setIsFullScreen}
        onLanguageChange={setLanguage}
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
      <EnhancedCodeEditor
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
      <EnhancedCodeEditor
        autoCorrect={autoCorrect}
        defaultCode={DEFAULT_CODE_TEMPLATES}
        isFullScreen={isFullScreen}
        language={language}
        // Toolbar features
        onAutoCorrectToggle={setAutoCorrect}
        onChange={setCode}
        onFullScreenToggle={setIsFullScreen}
        onLanguageChange={setLanguage}
        onRun={handleRun}
        onSubmit={handleSubmit}
        // Status bar
        showActionButtons={true}
        // Action buttons
        showAutoCorrectToggle={true}
        showFormatButton={true}
        showFullScreenButton={true}
        // State
        showLanguageSwitcher={true}
        showResetButton={true}
        showResetConfirmation={true}
        showStatusBar={true}
        // Configuration
        showToolbar={true}
        value={code}
      />
    </div>
  );
};

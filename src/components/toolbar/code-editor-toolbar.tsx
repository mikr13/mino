import type { EditorIcons, SupportedLanguage } from '@/types';
import { AutoCorrectToggle } from './auto-correct-toggle';
import { FormatButton } from './format-button';
import { FullScreenToggle } from './full-screen-toggle';
import { LanguageSwitcher } from './language-switcher';
import { ResetButton } from './reset-button';

type CodeEditorToolbarProps = {
  // Language switcher
  currentLanguage: SupportedLanguage;
  onLanguageChange?: (language: SupportedLanguage) => void;
  showLanguageSwitcher?: boolean;
  availableLanguages?: SupportedLanguage[];

  // Format button
  onFormat?: () => void;
  showFormatButton?: boolean;
  isFormatting?: boolean;

  // Reset button
  onReset?: () => void;
  showResetButton?: boolean;
  showResetConfirmation?: boolean;

  // Auto correct toggle
  autoCorrect?: boolean;
  onAutoCorrectToggle?: (enabled: boolean) => void;
  showAutoCorrectToggle?: boolean;

  // Full screen toggle
  isFullScreen?: boolean;
  onFullScreenToggle?: (isFullScreen: boolean) => void;
  showFullScreenButton?: boolean;

  // General
  disabled?: boolean;
  icons: Required<EditorIcons>;
};

export const CodeEditorToolbar: React.FC<CodeEditorToolbarProps> = ({
  // Language switcher
  currentLanguage,
  onLanguageChange,
  showLanguageSwitcher = true,
  availableLanguages,

  // Format button
  onFormat,
  showFormatButton = true,
  isFormatting = false,

  // Reset button
  onReset,
  showResetButton = true,
  showResetConfirmation = true,

  // Auto correct toggle
  autoCorrect = true,
  onAutoCorrectToggle,
  showAutoCorrectToggle = true,

  // Full screen toggle
  isFullScreen = false,
  onFullScreenToggle,
  showFullScreenButton = true,

  // General
  disabled = false,
  icons,
}) => {
  return (
    <div className="mino-toolbar">
      <div className="mino-toolbar-left">
        {showLanguageSwitcher && onLanguageChange && (
          <LanguageSwitcher
            currentLanguage={currentLanguage}
            disabled={disabled}
            icons={{
              language: icons.language,
              chevronDown: icons.chevronDown,
            }}
            languages={availableLanguages}
            onLanguageChange={onLanguageChange}
          />
        )}

        {showAutoCorrectToggle && onAutoCorrectToggle && (
          <AutoCorrectToggle
            disabled={disabled}
            enabled={autoCorrect}
            icon={icons.autoCorrect}
            onToggle={onAutoCorrectToggle}
          />
        )}
      </div>

      <div className="mino-toolbar-right">
        {showFormatButton && onFormat && (
          <FormatButton
            disabled={disabled}
            icon={icons.format}
            isFormatting={isFormatting}
            onFormat={onFormat}
          />
        )}

        {showResetButton && onReset && (
          <ResetButton
            disabled={disabled}
            icon={icons.reset}
            onReset={onReset}
            showConfirmation={showResetConfirmation}
          />
        )}

        {showFullScreenButton && onFullScreenToggle && (
          <FullScreenToggle
            disabled={disabled}
            icons={{
              fullScreen: icons.fullScreen,
              exitFullScreen: icons.exitFullScreen,
            }}
            isFullScreen={isFullScreen}
            onToggle={onFullScreenToggle}
          />
        )}
      </div>
    </div>
  );
};

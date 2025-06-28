import { getLanguageConfig } from '@/config/languages';
import type { CursorPosition, SupportedLanguage } from '@/types';

type StatusBarProps = {
  position: CursorPosition;
  language: SupportedLanguage;
  isDirty?: boolean;
  isReadOnly?: boolean;
  totalLines?: number;
};

export const StatusBar: React.FC<StatusBarProps> = ({
  position,
  language,
  isDirty = false,
  isReadOnly = false,
  totalLines,
}) => {
  const languageConfig = getLanguageConfig(language);

  const formatPosition = () => {
    const line = `Ln ${position.lineNumber}`;
    const col = `Col ${position.column}`;
    return `${line}, ${col}`;
  };

  const getStatus = () => {
    if (isReadOnly) {
      return 'Read-only';
    }
    return isDirty ? 'Modified' : 'Saved';
  };

  return (
    <div className="mino-status-bar">
      <div className="flex items-center gap-4">
        <span>{formatPosition()}</span>
        {totalLines && (
          <span className="text-gray-500 dark:text-gray-400">
            {totalLines} lines
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`${isDirty ? 'text-orange-600 dark:text-orange-400' : ''}`}
        >
          {getStatus()}
        </span>
        <span className="font-medium">{languageConfig.label}</span>
      </div>
    </div>
  );
};

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
      <div className="mino-status-section">
        <span>{formatPosition()}</span>
        {totalLines && (
          <span className="mino-status-text">
            {totalLines} lines
          </span>
        )}
      </div>

      <div className="mino-status-section">
        <span
          className={`mino-status-indicator ${isDirty ? 'modified' : ''}`}
        >
          {getStatus()}
        </span>
        <span className="mino-status-language">{languageConfig.label}</span>
      </div>
    </div>
  );
};

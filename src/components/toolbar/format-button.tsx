import type { IconComponent } from '@/types';

type FormatButtonProps = {
  onFormat: () => void;
  disabled?: boolean;
  isFormatting?: boolean;
  icon: IconComponent;
};

export const FormatButton: React.FC<FormatButtonProps> = ({
  onFormat,
  disabled = false,
  isFormatting = false,
  icon: FormatIcon,
}) => {
  const handleClick = () => {
    if (!(disabled || isFormatting)) {
      onFormat();
    }
  };

  return (
    <button
      aria-label="Format code"
      className="mino-button mino-button-secondary"
      disabled={disabled || isFormatting}
      onClick={handleClick}
      title="Format code"
      type="button"
    >
      <FormatIcon className={`mino-toolbar-icon ${isFormatting ? 'mino-spin' : ''}`} />
      <span className="mino-toolbar-text">
        {isFormatting ? 'Formatting...' : 'Format'}
      </span>
    </button>
  );
};

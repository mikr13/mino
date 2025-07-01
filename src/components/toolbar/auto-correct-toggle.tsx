import type { IconComponent } from '@/types';

type AutoCorrectToggleProps = {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  disabled?: boolean;
  icon: IconComponent;
};

export const AutoCorrectToggle: React.FC<AutoCorrectToggleProps> = ({
  enabled,
  onToggle,
  disabled = false,
  icon: AutoCorrectIcon,
}) => {
  const handleToggle = () => {
    if (!disabled) {
      onToggle(!enabled);
    }
  };

  return (
    <div className="mino-toolbar-item">
      <AutoCorrectIcon className="mino-toolbar-icon" />
      <span className="mino-toolbar-text">
        Auto
      </span>
      <button
        aria-checked={enabled}
        aria-label={`${enabled ? 'Disable' : 'Enable'} auto correct`}
        className={`mino-toggle ${enabled ? 'checked' : ''}`}
        disabled={disabled}
        onClick={handleToggle}
        role="switch"
        type="button"
      >
        <span className="mino-toggle-thumb" />
      </button>
    </div>
  );
};

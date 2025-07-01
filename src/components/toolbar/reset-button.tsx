import type { IconComponent } from '@/types';
import { useState } from 'react';

type ResetButtonProps = {
  onReset: () => void;
  disabled?: boolean;
  showConfirmation?: boolean;
  icon: IconComponent;
};

export const ResetButton: React.FC<ResetButtonProps> = ({
  onReset,
  disabled = false,
  showConfirmation = true,
  icon: ResetIcon,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    if (disabled) {
      return;
    }

    if (showConfirmation) {
      setShowConfirm(true);
    } else {
      onReset();
    }
  };

  const handleConfirm = () => {
    onReset();
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="mino-toolbar-item">
        <span className="mino-reset-confirm-text">Reset code?</span>
        <button
          className="mino-button mino-button-primary mino-button-small"
          onClick={handleConfirm}
          type="button"
        >
          Yes
        </button>
        <button
          className="mino-button mino-button-secondary mino-button-small"
          onClick={handleCancel}
          type="button"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      aria-label="Reset to default code"
      className="mino-button mino-button-secondary"
      disabled={disabled}
      onClick={handleClick}
      title="Reset to default code"
      type="button"
    >
      <ResetIcon className="mino-toolbar-icon" />
      <span className="mino-toolbar-text">Reset</span>
    </button>
  );
};

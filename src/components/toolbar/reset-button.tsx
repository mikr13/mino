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
      <div className="flex items-center gap-2">
        <span className="text-gray-600 text-sm dark:text-gray-400">
          Reset code?
        </span>
        <button
          className="mino-button mino-button-primary px-2 py-1 text-xs"
          onClick={handleConfirm}
          type="button"
        >
          Yes
        </button>
        <button
          className="mino-button mino-button-secondary px-2 py-1 text-xs"
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
      <ResetIcon className="h-4 w-4" />
      <span className="hidden sm:inline">Reset</span>
    </button>
  );
};

import type { IconComponent } from '@/types';

type ActionButtonsProps = {
  onRun?: () => void;
  onSubmit?: () => void;
  disabled?: boolean;
  isRunning?: boolean;
  isSubmitting?: boolean;
  showRunButton?: boolean;
  showSubmitButton?: boolean;
  icons: {
    run: IconComponent;
    submit: IconComponent;
  };
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onRun,
  onSubmit,
  disabled = false,
  isRunning = false,
  isSubmitting = false,
  showRunButton = true,
  showSubmitButton = true,
  icons,
}) => {
  const RunIcon = icons.run;
  const SubmitIcon = icons.submit;

  return (
    <div className="mino-action-buttons">
      {showRunButton && onRun && (
        <button
          aria-label="Run code"
          className="mino-button mino-action-run"
          disabled={disabled || isRunning || isSubmitting}
          onClick={onRun}
          type="button"
        >
          <RunIcon className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Running...' : 'Run'}</span>
        </button>
      )}

      {showSubmitButton && onSubmit && (
        <button
          aria-label="Submit solution"
          className="mino-button mino-action-submit"
          disabled={disabled || isRunning || isSubmitting}
          onClick={onSubmit}
          type="button"
        >
          <SubmitIcon
            className={`h-4 w-4 ${isSubmitting ? 'animate-pulse' : ''}`}
          />
          <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
        </button>
      )}
    </div>
  );
};

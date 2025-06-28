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
        <div className="flex items-center gap-2">
            <AutoCorrectIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="hidden text-gray-700 text-sm sm:inline dark:text-gray-300">
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

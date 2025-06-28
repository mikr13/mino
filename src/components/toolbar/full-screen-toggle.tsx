import type { IconComponent } from '@/types';
import { useEffect } from 'react';

type FullScreenToggleProps = {
    isFullScreen: boolean;
    onToggle: (isFullScreen: boolean) => void;
    disabled?: boolean;
    icons: {
        fullScreen: IconComponent;
        exitFullScreen: IconComponent;
    };
};

export const FullScreenToggle: React.FC<FullScreenToggleProps> = ({
    isFullScreen,
    onToggle,
    disabled = false,
    icons,
}) => {
    const Icon = isFullScreen ? icons.exitFullScreen : icons.fullScreen;

    // Handle escape key to exit full screen
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isFullScreen) {
                onToggle(false);
            }
        };

        if (isFullScreen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isFullScreen, onToggle]);

    const handleToggle = () => {
        if (!disabled) {
            onToggle(!isFullScreen);
        }
    };

    return (
        <button
            aria-label={isFullScreen ? 'Exit full screen' : 'Enter full screen'}
            className="mino-button mino-button-secondary"
            disabled={disabled}
            onClick={handleToggle}
            title={isFullScreen ? 'Exit full screen (Esc)' : 'Enter full screen'}
            type="button"
        >
            <Icon className="h-4 w-4" />
        </button>
    );
};

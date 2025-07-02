import type { EditorTheme, IconComponent } from '@/types';
import { useEffect, useRef, useState } from 'react';

type ThemeSwitcherProps = {
    currentTheme: EditorTheme;
    onThemeChange: (theme: EditorTheme) => void;
    disabled?: boolean;
    icons: {
        theme: IconComponent;
        chevronDown: IconComponent;
    };
};

const THEME_OPTIONS: EditorTheme[] = ['light', 'dark', 'auto'];

const THEME_LABELS: Record<EditorTheme, string> = {
    light: 'Light',
    dark: 'Dark',
    auto: 'System',
};

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
    currentTheme,
    onThemeChange,
    disabled = false,
    icons,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const ThemeIcon = icons.theme;
    const ChevronIcon = icons.chevronDown;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close dropdown on escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen]);

    const handleThemeSelect = (theme: EditorTheme) => {
        onThemeChange(theme);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className="mino-dropdown" ref={dropdownRef}>
            <button
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label="Select theme"
                className="mino-button mino-button-secondary mino-dropdown-trigger"
                disabled={disabled}
                onClick={toggleDropdown}
                type="button"
            >
                <ThemeIcon className="mino-toolbar-icon" />
                <span className="mino-toolbar-text">{THEME_LABELS[currentTheme]}</span>
                <ChevronIcon
                    className={`mino-toolbar-icon mino-transition-transform ${isOpen ? 'mino-rotate-180' : ''
                        }`}
                />
            </button>

            {isOpen && (
                <div className="mino-dropdown-content">
                    {THEME_OPTIONS.map((theme) => {
                        const isSelected = theme === currentTheme;

                        return (
                            <button
                                className={`mino-dropdown-item ${isSelected ? 'font-medium' : ''}`}
                                key={theme}
                                onClick={() => handleThemeSelect(theme)}
                                type="button"
                            >
                                {THEME_LABELS[theme]}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

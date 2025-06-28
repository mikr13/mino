import { getLanguageConfig } from '@/config/languages';
import type { IconComponent, SupportedLanguage } from '@/types';
import { useEffect, useRef, useState } from 'react';

type LanguageSwitcherProps = {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
  languages?: SupportedLanguage[];
  disabled?: boolean;
  icons: {
    language: IconComponent;
    chevronDown: IconComponent;
  };
};

const DEFAULT_LANGUAGES: SupportedLanguage[] = [
  'python',
  'javascript',
  'typescript',
  'java',
  'cpp',
  'c',
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
  languages = DEFAULT_LANGUAGES,
  disabled = false,
  icons,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const LanguageIcon = icons.language;
  const ChevronIcon = icons.chevronDown;

  const currentConfig = getLanguageConfig(currentLanguage);

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

  const handleLanguageSelect = (language: SupportedLanguage) => {
    onLanguageChange(language);
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
        aria-label="Select programming language"
        className="mino-button mino-button-secondary mino-dropdown-trigger"
        disabled={disabled}
        onClick={toggleDropdown}
        type="button"
      >
        <LanguageIcon className="h-4 w-4" />
        <span className="hidden sm:inline">{currentConfig.label}</span>
        <ChevronIcon
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="mino-dropdown-content">
          {languages.map((language) => {
            const config = getLanguageConfig(language);
            const isSelected = language === currentLanguage;

            return (
              <button
                className={`mino-dropdown-item ${
                  isSelected ? 'font-medium' : ''
                }`}
                key={language}
                onClick={() => handleLanguageSelect(language)}
                type="button"
              >
                {config.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

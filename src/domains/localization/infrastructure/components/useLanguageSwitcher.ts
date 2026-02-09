/**
 * Language Switcher Hook
 * Manages the logic for the LanguageSwitcher component
 */

import { useMemo, useCallback } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { languageRepository } from '../repository/LanguageRepository';
import type { Language } from '../storage/types/Language';

export interface UseLanguageSwitcherProps {
    onPress?: () => void;
    disabled?: boolean;
}

export const useLanguageSwitcher = ({ onPress, disabled }: UseLanguageSwitcherProps) => {
    const { currentLanguage } = useLocalization();

    const currentLang = useMemo((): Language => {
        // Double fallback to ensure we always have a valid language
        const lang = languageRepository.getLanguageByCode(currentLanguage)
            || languageRepository.getDefaultLanguage()
            || languageRepository.getLanguages()[0]; // Final fallback

        if (!lang) {
            // This should never happen if repository is set up correctly
            // Return a minimal fallback language object
            return {
                code: 'en',
                name: 'English',
                nativeName: 'English',
                flag: '🇺🇸',
            };
        }

        return lang;
    }, [currentLanguage]);

    const handlePress = useCallback(() => {
        if (disabled) {
            return;
        }
        onPress?.();
    }, [disabled, onPress]);

    return {
        currentLang,
        handlePress,
    };
};

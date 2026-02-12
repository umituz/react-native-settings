/**
 * Language Selection Hook
 * Manages language selection state and filtering
 */

import { useState, useMemo } from 'react';
import { useLocalization } from './useLocalization';
import { searchLanguages } from '../config/LanguageQuery';
import { devError } from '../../../../utils/devUtils';

export const useLanguageSelection = () => {
    const { currentLanguage, setLanguage } = useLocalization();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCode, setSelectedCode] = useState(currentLanguage);

    const filteredLanguages = useMemo(() => {
        return searchLanguages(searchQuery);
    }, [searchQuery]);

    const handleLanguageSelect = async (code: string, onComplete?: () => void) => {
        try {
            setSelectedCode(code);
            await setLanguage(code);
            onComplete?.();
        } catch (error) {
            // Revert selection on error
            setSelectedCode(currentLanguage);
            devError('[useLanguageSelection] Failed to set language:', error);
            // Re-throw for caller to handle
            throw error;
        }
    };

    return {
        searchQuery,
        setSearchQuery,
        selectedCode,
        filteredLanguages,
        handleLanguageSelect,
    };
};

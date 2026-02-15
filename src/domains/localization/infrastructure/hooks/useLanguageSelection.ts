/**
 * Language Selection Hook
 * Manages language selection state and filtering with debounce
 */

import { useState, useMemo, useEffect } from 'react';
import { useLocalization } from './useLocalization';
import { searchLanguages } from '../config/LanguageQuery';
import { devError } from '../../../../utils/devUtils';

const SEARCH_DEBOUNCE_MS = 300;

export const useLanguageSelection = () => {
    const { currentLanguage, setLanguage } = useLocalization();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [selectedCode, setSelectedCode] = useState(currentLanguage);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, SEARCH_DEBOUNCE_MS);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const filteredLanguages = useMemo(() => {
        return searchLanguages(debouncedQuery);
    }, [debouncedQuery]);

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

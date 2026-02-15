/**
 * FAQ Search Hook
 * Handles FAQ search state and filtering with debounce
 */

import { useState, useMemo, useEffect } from 'react';
import { FAQCategory } from '../../domain/entities/FAQEntity';
import { FAQSearchService } from '../../domain/services/FAQSearchService';

const SEARCH_DEBOUNCE_MS = 300;

export interface UseFAQSearchResult {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredCategories: FAQCategory[];
    hasResults: boolean;
}

export function useFAQSearch(categories: FAQCategory[]): UseFAQSearchResult {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, SEARCH_DEBOUNCE_MS);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const filteredCategories = useMemo(
        () => FAQSearchService.searchCategories(debouncedQuery, categories),
        [debouncedQuery, categories]
    );

    const hasResults = filteredCategories.length > 0 || !debouncedQuery.trim();

    return {
        searchQuery,
        setSearchQuery,
        filteredCategories,
        hasResults,
    };
}

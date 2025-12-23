/**
 * FAQ Search Hook
 * Handles FAQ search state and filtering
 */

import { useState, useMemo } from 'react';
import { FAQCategory } from '../../domain/entities/FAQEntity';
import { FAQSearchService } from '../../domain/services/FAQSearchService';

export interface UseFAQSearchResult {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredCategories: FAQCategory[];
    hasResults: boolean;
}

export function useFAQSearch(categories: FAQCategory[]): UseFAQSearchResult {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCategories = useMemo(
        () => FAQSearchService.searchCategories(searchQuery, categories),
        [searchQuery, categories]
    );

    const hasResults = filteredCategories.length > 0 || !searchQuery.trim();

    return {
        searchQuery,
        setSearchQuery,
        filteredCategories,
        hasResults,
    };
}

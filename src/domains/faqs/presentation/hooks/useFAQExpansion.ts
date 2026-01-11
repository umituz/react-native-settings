/**
 * FAQ Expansion Hook
 * Manages FAQ item expansion state
 */

import { useState, useCallback } from 'react';

export interface UseFAQExpansionResult {
    expandedItems: Set<string>;
    isExpanded: (itemId: string) => boolean;
    toggleExpansion: (itemId: string) => void;
    expandAll: (itemIds: string[]) => void;
    collapseAll: () => void;
}

export function useFAQExpansion(): UseFAQExpansionResult {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const isExpanded = useCallback(
        (itemId: string) => expandedItems.has(itemId),
        [expandedItems]
    );

    const toggleExpansion = useCallback((itemId: string) => {
        setExpandedItems(prev => {
            if (prev.has(itemId)) {
                return new Set();
            } else {
                return new Set([itemId]);
            }
        });
    }, []);

    const expandAll = useCallback((itemIds: string[]) => {
        setExpandedItems(new Set(itemIds));
    }, []);

    const collapseAll = useCallback(() => {
        setExpandedItems(new Set());
    }, []);

    return {
        expandedItems,
        isExpanded,
        toggleExpansion,
        expandAll,
        collapseAll,
    };
}

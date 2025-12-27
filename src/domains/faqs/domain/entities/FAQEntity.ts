/**
 * FAQ Entity Definitions
 */

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    categoryId?: string;
    tags?: readonly string[];
    featured?: boolean;
    order?: number;
    metadata?: Record<string, unknown>;
}

export interface FAQCategory {
    id: string;
    title: string;
    items: FAQItem[];
    description?: string;
    icon?: string;
    order?: number;
}

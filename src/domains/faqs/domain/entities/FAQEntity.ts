/**
 * FAQ Entity Definitions
 */

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    categoryId?: string;
}

export interface FAQCategory {
    id: string;
    title: string;
    items: FAQItem[];
}

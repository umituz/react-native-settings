/**
 * FAQ Search Service
 * Handles searching FAQ items
 */

import { FAQItem, FAQCategory } from "../entities/FAQEntity";

export class FAQSearchService {
  static searchItems(query: string, items: FAQItem[]): FAQItem[] {
    if (!query.trim()) return items;

    const normalizedQuery = query.toLowerCase().trim();
    
    return items.filter(item => 
      item.question.toLowerCase().includes(normalizedQuery) ||
      item.answer.toLowerCase().includes(normalizedQuery)
    );
  }

  static searchCategories(query: string, categories: FAQCategory[]): FAQCategory[] {
    if (!query.trim()) return categories;

    const normalizedQuery = query.toLowerCase().trim();
    
    return categories
      .map(category => ({
        ...category,
        items: category.items.filter(item => 
          item.question.toLowerCase().includes(normalizedQuery) ||
          item.answer.toLowerCase().includes(normalizedQuery) ||
          category.title.toLowerCase().includes(normalizedQuery)
        )
      }))
      .filter(category => category.items.length > 0);
  }
}
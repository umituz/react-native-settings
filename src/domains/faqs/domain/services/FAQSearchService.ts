/**
 * FAQ Search Service
 * Handles searching FAQ items with advanced features
 */

import { FAQItem, FAQCategory } from "../entities/FAQEntity";

export class FAQSearchService {
  static searchItems(query: string, items: FAQItem[]): FAQItem[] {
    if (!query.trim()) return items;

    const normalizedQuery = query.toLowerCase().trim();
    
    return items.filter(item => {
      const questionMatch = item.question.toLowerCase().includes(normalizedQuery);
      const answerMatch = item.answer.toLowerCase().includes(normalizedQuery);
      const tagMatch = item.tags?.some(tag => 
        tag.toLowerCase().includes(normalizedQuery)
      ) || false;
      
      return questionMatch || answerMatch || tagMatch;
    });
  }

  static searchCategories(query: string, categories: FAQCategory[]): FAQCategory[] {
    if (!query.trim()) return categories;

    const normalizedQuery = query.toLowerCase().trim();
    
    return categories
      .map(category => ({
        ...category,
        items: category.items.filter(item => {
          const questionMatch = item.question.toLowerCase().includes(normalizedQuery);
          const answerMatch = item.answer.toLowerCase().includes(normalizedQuery);
          const categoryMatch = category.title.toLowerCase().includes(normalizedQuery);
          const categoryDescMatch = category.description?.toLowerCase().includes(normalizedQuery) || false;
          const tagMatch = item.tags?.some(tag => 
            tag.toLowerCase().includes(normalizedQuery)
          ) || false;
          
          return questionMatch || answerMatch || categoryMatch || categoryDescMatch || tagMatch;
        })
      }))
      .filter(category => category.items.length > 0);
  }

  static getFeaturedItems(items: FAQItem[]): FAQItem[] {
    return items.filter(item => item.featured === true);
  }

  static sortByOrder(items: FAQItem[]): FAQItem[] {
    return [...items].sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  static sortCategoriesByOrder(categories: FAQCategory[]): FAQCategory[] {
    return [...categories].sort((a, b) => (a.order || 0) - (b.order || 0));
  }
}
/**
 * FAQ Translation Utility
 * Handles translation of FAQ data
 */

import type { TranslationFunction } from "./config-creators/types";
import type { FAQData } from "../navigation/types";
import type { AppInfo } from "../navigation/types";

/**
 * Translates FAQ data using the provided translation function
 */
export const translateFAQData = (
  faqData: FAQData | undefined,
  t: TranslationFunction,
  _appInfo: AppInfo
): FAQData | undefined => {
  if (!faqData) return undefined;

  const interpolationValues = { appName: _appInfo.appName || _appInfo.name };
  
  return {
    categories: faqData.categories.map((category) => ({
      id: category.id,
      title: t(category.title, interpolationValues),
      items: category.items.map((item) => ({
        id: item.id,
        question: t(item.question, interpolationValues),
        answer: t(item.answer, interpolationValues),
      })),
    })),
  };
};

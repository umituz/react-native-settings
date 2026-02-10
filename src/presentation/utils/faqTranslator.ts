/**
 * FAQ Translation Utility
 * Handles translation of FAQ data
 */


import type { FAQData } from "../navigation/types";
import type { AppInfo } from "../navigation/types";

/**
 * Utility for handling FAQ data
 * Ensures data is in consistent format
 */
export const translateFAQData = (
  faqData: FAQData | undefined,
  _t: (key: string, params?: any) => string,
  _appInfo: AppInfo
): FAQData | undefined => {
  return faqData;
};

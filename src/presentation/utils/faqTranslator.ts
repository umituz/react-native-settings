/**
 * FAQ Translation Utility
 * Handles translation of FAQ data
 */


import type { FAQData } from "../navigation/types";
import type { AppInfo } from "../navigation/types";
import type { TranslationOptions } from "./config-creators/types";

/**
 * Utility for handling FAQ data
 * Ensures data is in consistent format
 */
export const translateFAQData = (
  faqData: FAQData | undefined,
  _t: (key: string, params?: TranslationOptions) => string,
  _appInfo: AppInfo
): FAQData | undefined => {
  return faqData;
};

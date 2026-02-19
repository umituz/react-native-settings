/**
 * FAQ Translation Utility
 * App sends pre-translated FAQ data - this function passes it through unchanged.
 */

import type { FAQData } from "../navigation/types";
import type { AppInfo } from "../navigation/types";

/**
 * Passes FAQ data through unchanged.
 * The main app is responsible for translating FAQ keys before passing them here.
 */
export const translateFAQData = (
  faqData: FAQData | undefined,
  _appInfo: AppInfo
): FAQData | undefined => {
  return faqData;
};

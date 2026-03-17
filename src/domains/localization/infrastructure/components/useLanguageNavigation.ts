import { useLocalization } from '../hooks/useLocalization';
import { languageRepository } from '../repository/LanguageRepository';
import { useSettingsNavigation } from '../../../../presentation/navigation/hooks/useSettingsNavigation';
import { createRouteOrPressHandler } from '../../../../presentation/navigation/utils/navigationHelpers';


export const useLanguageNavigation = (navigationScreen: string) => {
  const navigation = useSettingsNavigation();
  const { currentLanguage } = useLocalization();
  const currentLang = languageRepository.getLanguageByCode(currentLanguage) || languageRepository.getDefaultLanguage();

  const navigateToLanguageSelection = createRouteOrPressHandler(navigation.navigate, {
    route: navigationScreen,
  });

  return { currentLang, navigateToLanguageSelection };
};


import { useLocalization } from '../hooks/useLocalization';
import { languageRepository } from '../repository/LanguageRepository';
import { useSettingsNavigation } from '../../../../presentation/navigation/hooks/useSettingsNavigation';


export const useLanguageNavigation = (navigationScreen: string) => {
  const navigation = useSettingsNavigation();
  const { currentLanguage } = useLocalization();
  const currentLang = languageRepository.getLanguageByCode(currentLanguage) || languageRepository.getDefaultLanguage();

  const navigateToLanguageSelection = () => {
    if (navigation && navigationScreen) {
      navigation.navigate(navigationScreen as 'LanguageSelection');
    }
  };

  return { currentLang, navigateToLanguageSelection };
};


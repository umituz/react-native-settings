/**
 * Language Section Component
 * Single Responsibility: Render language settings section
 */
import React from "react";
import { Languages } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalization, getLanguageByCode } from "@umituz/react-native-localization";
import { SettingItem } from "../../components/SettingItem";
import { SettingsSection } from "../../components/SettingsSection";
export const LanguageSection = ({ config, }) => {
    const navigation = useNavigation();
    const { t, currentLanguage } = useLocalization();
    const route = config?.route || "LanguageSelection";
    const title = config?.title || t("settings.language");
    const description = config?.description || "";
    const currentLang = getLanguageByCode(currentLanguage);
    const languageDisplay = currentLang
        ? `${currentLang.flag} ${currentLang.nativeName}`
        : "English";
    return (<SettingsSection title={t("settings.sections.app.title")}>
      <SettingItem icon={Languages} title={title} value={languageDisplay} onPress={() => navigation.navigate(route)}/>
    </SettingsSection>);
};
//# sourceMappingURL=LanguageSection.js.map
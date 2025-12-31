import React, { useMemo } from "react";
import { SettingsSection } from "../../../components/SettingsSection";
import { SettingsItemCard } from "../../../components/SettingsItemCard";
import type { CustomSettingsSection } from "../../types";

interface CustomSettingsListProps {
    customSections?: CustomSettingsSection[];
}

export const CustomSettingsList: React.FC<CustomSettingsListProps> = ({
    customSections = [],
}) => {
    const sortedSections = useMemo(() => {
        return Array.from(customSections)
            .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    }, [customSections]);

    if (!sortedSections.length) return null;

    return (
        <>
            {sortedSections.map((section, index) => (
                <SettingsSection
                    key={section.id || `custom-${index}`}
                    title={section.title}
                >
                    {section.content}
                    {!section.content && section.items?.map((item) => (
                        <SettingsItemCard
                            key={item.id}
                            title={item.title}
                            description={item.subtitle}
                            icon={item.icon}
                            onPress={item.onPress}
                            rightIcon={item.rightIcon}
                            iconBgColor={item.iconBgColor}
                            iconColor={item.iconColor}
                        />
                    ))}
                </SettingsSection>
            ))}
        </>
    );
};

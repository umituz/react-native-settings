import React, { useMemo } from "react";
import { SettingsSection } from "../../../components/SettingsSection";
import { SettingsItemCard } from "../../../components/SettingsItemCard";
import type { CustomSettingsSection } from "../../types";
import { createSinglePropComparator } from "../../../../infrastructure/utils/memoComparisonUtils";

interface CustomSettingsListProps {
    customSections?: CustomSettingsSection[];
}

export const CustomSettingsList: React.FC<CustomSettingsListProps> = ({ customSections = [] }) => {
    const sortedSections = useMemo(() => {
        return Array.from(customSections)
            .sort((a: CustomSettingsSection, b: CustomSettingsSection) => (a.order ?? 999) - (b.order ?? 999));
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
                    {!section.content && section.items && section.items.length > 0 && section.items.map((item, itemIndex) => (
                        <SettingsItemCard
                            key={item.id || `item-${itemIndex}`}
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

CustomSettingsList.displayName = "CustomSettingsList";

export const MemoizedCustomSettingsList = React.memo(
    CustomSettingsList,
    createSinglePropComparator("customSections")
);
MemoizedCustomSettingsList.displayName = "MemoizedCustomSettingsList";

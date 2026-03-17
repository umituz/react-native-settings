import React, { useMemo } from "react";
import { SettingsSection } from "../../../components/SettingsSection";
import { SettingsItemCard } from "../../../components/SettingsItemCard";
import type { CustomSettingsSection } from "../../types";

interface CustomSettingsListProps {
    customSections?: CustomSettingsSection[];
    navigation?: any;
}

const EMPTY_SECTIONS: CustomSettingsSection[] = [];

// Extract to separate memoized component to prevent unnecessary re-renders when other sections change
const SettingsItemsList: React.FC<{ items: CustomSettingsSection['items'] }> = React.memo(({ items }) => (
    <>
        {items?.map((item, itemIndex) => (
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
    </>
));

SettingsItemsList.displayName = "SettingsItemsList";

export const CustomSettingsList: React.FC<CustomSettingsListProps> = ({ customSections = EMPTY_SECTIONS }) => {
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
                    {!section.content && section.items && section.items.length > 0 && (
                        <SettingsItemsList items={section.items} />
                    )}
                </SettingsSection>
            ))}
        </>
    );
};

CustomSettingsList.displayName = "CustomSettingsList";

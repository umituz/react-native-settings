import React from "react";
import { AtomicIcon, AtomicSwitch, type IconName } from "@umituz/react-native-design-system";

export interface SettingsItemCardRightElementProps {
  showSwitch: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  disabled?: boolean;
  shouldShowChevron: boolean;
  rightIcon: IconName;
}

export const SettingsItemCardRightElement: React.FC<SettingsItemCardRightElementProps> = React.memo(({
  showSwitch,
  switchValue,
  onSwitchChange,
  disabled,
  shouldShowChevron,
  rightIcon,
}) => {
  const handleSwitchChange = React.useCallback((value: boolean) => {
    if (onSwitchChange) {
      onSwitchChange(value);
    }
  }, [onSwitchChange]);

  if (showSwitch) {
    return (
      <AtomicSwitch
        value={!!switchValue}
        onValueChange={handleSwitchChange}
        disabled={disabled}
      />
    );
  }
  if (shouldShowChevron) {
    return <AtomicIcon name={rightIcon} size="sm" color="textSecondary" />;
  }
  return null;
});

SettingsItemCardRightElement.displayName = "SettingsItemCardRightElement";

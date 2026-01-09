/**
 * GamificationScreen Header Component
 */

import React from "react";
import { View, type ViewStyle, type TextStyle } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system";
import { styles } from "./styles";

export interface HeaderProps {
  title: string;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  textColor: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  headerStyle,
  titleStyle,
  textColor,
}) => {
  return (
    <View style={[styles.header, headerStyle]}>
      <AtomicText style={[styles.title, { color: textColor }, titleStyle]}>
        {title}
      </AtomicText>
    </View>
  );
};

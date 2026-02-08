/**
 * Rating Prompt Modal
 * 2-step rating prompt: Custom modal → Native review prompt
 */

import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicButton,
  AtomicIcon,
  useAppDesignTokens,
  useResponsive,
} from "@umituz/react-native-design-system";
import type { RatingTranslations } from "../../domain/entities/RatingConfig";

export interface RatingPromptModalProps {
  visible: boolean;
  onPositive: () => void;
  onNegative: () => void;
  onLater: () => void;
  onDismiss: () => void;
  translations?: RatingTranslations;
  appName?: string;
}

export const RatingPromptModal: React.FC<RatingPromptModalProps> = ({
  visible,
  onPositive,
  onNegative,
  onLater,
  onDismiss,
  translations,
  appName = "this app",
}) => {
  const tokens = useAppDesignTokens();
  const responsive = useResponsive();

  const defaultTranslations: RatingTranslations = {
    title: translations?.title ?? "Enjoying the app?",
    message:
      translations?.message ??
      `If you love using ${appName}, would you mind taking a moment to rate it?`,
    positiveButton: translations?.positiveButton ?? "Yes, I love it!",
    negativeButton: translations?.negativeButton ?? "Not really",
    laterButton: translations?.laterButton ?? "Maybe later",
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <View
        style={[
          styles.overlay,
          { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        ]}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: tokens.colors.surface,
              borderRadius: tokens.borders.radius.xl,
              padding: tokens.spacing.lg,
              maxWidth: responsive.maxContentWidth * 0.85,
              width: "90%",
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <AtomicIcon name="star" size="xl" color="primary" />
          </View>

          <AtomicText
            type="headlineMedium"
            color="onSurface"
            style={[
              styles.title,
              { marginBottom: tokens.spacing.sm },
            ]}
          >
            {defaultTranslations.title}
          </AtomicText>

          <AtomicText
            type="bodyMedium"
            color="onSurfaceVariant"
            style={[
              styles.message,
              { marginBottom: tokens.spacing.lg },
            ]}
          >
            {defaultTranslations.message}
          </AtomicText>

          <View style={[styles.buttonContainer, { gap: tokens.spacing.sm }]}>
            <AtomicButton
              variant="primary"
              onPress={onPositive}
              style={styles.button}
            >
              {defaultTranslations.positiveButton}
            </AtomicButton>

            <AtomicButton
              variant="outline"
              onPress={onNegative}
              style={styles.button}
            >
              {defaultTranslations.negativeButton}
            </AtomicButton>

            <AtomicButton
              variant="text"
              onPress={onLater}
              style={styles.button}
            >
              {defaultTranslations.laterButton}
            </AtomicButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
  },
  message: {
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    width: "100%",
  },
});

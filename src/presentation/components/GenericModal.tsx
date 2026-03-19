/**
 * GenericModal Component
 *
 * Universal modal component that works with ModalConfig.
 * Replaces all custom modal implementations.
 *
 * @example
 * ```ts
 * const modal = useModalState();
 *
 * return (
 *   <>
 *     <Button onPress={() => modal.show(ModalPresets.confirm(...))} />
 *     <GenericModal state={modal} />
 *   </>
 * );
 * ```
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseModal } from '@umituz/react-native-design-system/molecules';
import { AtomicText, AtomicButton, AtomicIcon } from '@umituz/react-native-design-system/atoms';
import { useAppDesignTokens } from '@umituz/react-native-design-system/theme';
import { useResponsive } from '@umituz/react-native-design-system/responsive';
import type { ModalState } from '../../core/patterns/Modal/ModalConfig';

export interface GenericModalProps {
  /**
   * Modal state from useModalState hook
   */
  state: ModalState;

  /**
   * Custom container style
   */
  containerStyle?: object;

  /**
   * Test ID for E2E testing
   */
  testID?: string;
}

export const GenericModal: React.FC<GenericModalProps> = ({
  state,
  containerStyle,
  testID = 'generic-modal',
}) => {
  const tokens = useAppDesignTokens();
  const responsive = useResponsive();
  const { visible, config } = state;

  const styles = useMemo(() => getStyles(tokens), [tokens]);

  if (!config) {
    return null;
  }

  const {
    title,
    subtitle,
    message,
    icon,
    iconColor,
    header,
    body,
    footer,
    actions = [],
    dismissible = true,
    maxWidth,
  } = config;

  const handleDismiss = () => {
    if (dismissible) {
      state.hide();
    }
  };

  const modalWidth = maxWidth ?? responsive.maxContentWidth * 0.9;

  return (
    <BaseModal
      visible={visible}
      onClose={handleDismiss}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: tokens.colors.surface,
            borderRadius: tokens.borders.radius.xl,
            padding: tokens.spacing.lg,
            maxWidth: modalWidth,
            width: '90%',
          },
          containerStyle,
        ]}
        testID={testID}
      >
        {/* Custom Header */}
        {header ? (
          header
        ) : (
          <>
            {/* Icon */}
            {icon && (
              <View style={styles.iconContainer}>
                <AtomicIcon
                  name={icon}
                  size="xl"
                  color={iconColor as any || 'primary'}
                />
              </View>
            )}

            {/* Title and Subtitle */}
            {title && (
              <AtomicText
                type="headlineMedium"
                color="onSurface"
                style={[styles.title, { marginBottom: subtitle ? tokens.spacing.xs : tokens.spacing.md }]}
              >
                {title}
              </AtomicText>
            )}

            {subtitle && (
              <AtomicText
                type="bodyMedium"
                color="onSurfaceVariant"
                style={[styles.subtitle, { marginBottom: tokens.spacing.md }]}
              >
                {subtitle}
              </AtomicText>
            )}
          </>
        )}

        {/* Custom Body or Message */}
        {body ? (
          body
        ) : message && (
          <AtomicText
            type="bodyMedium"
            color="onSurfaceVariant"
            style={[styles.message, { marginBottom: actions.length > 0 ? tokens.spacing.lg : 0 }]}
          >
            {message}
          </AtomicText>
        )}

        {/* Custom Footer or Actions */}
        {footer ? (
          footer
        ) : actions.length > 0 && (
          <View style={[styles.buttonContainer, { gap: tokens.spacing.sm }]}>
            {actions.map((action, index) => (
              <AtomicButton
                key={index}
                variant={action.variant || 'primary'}
                onPress={async () => {
                  await action.onPress();
                  if (dismissible) {
                    state.hide();
                  }
                }}
                disabled={action.disabled}
                loading={action.loading}
                style={styles.button}
                testID={action.testID}
              >
                {action.label}
              </AtomicButton>
            ))}
          </View>
        )}
      </View>
    </BaseModal>
  );
};

const getStyles = (_tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    iconContainer: {
      marginBottom: 16,
    },
    title: {
      textAlign: 'center',
    },
    subtitle: {
      textAlign: 'center',
    },
    message: {
      textAlign: 'center',
      lineHeight: 24,
    },
    buttonContainer: {
      width: '100%',
      marginTop: 16,
    },
    button: {
      width: '100%',
    },
  });

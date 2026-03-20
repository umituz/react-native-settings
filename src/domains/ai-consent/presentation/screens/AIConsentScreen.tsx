/**
 * AI Consent Screen
 *
 * Full screen for displaying AI technology disclosure and consent.
 * Required by Apple App Store Guidelines 5.1.1(i) & 5.1.2(i)
 *
 * Features:
 * - Lists all AI providers and their purposes
 * - Explains data sharing practices
 * - Provides privacy policy links
 * - Accept/Decline buttons
 * - Scrollable content
 */

import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  ScreenLayout,
} from '@umituz/react-native-design-system/layouts';
import {
  AtomicText,
  AtomicButton,
  AtomicSpinner,
} from '@umituz/react-native-design-system/atoms';
import {
  NavigationHeader,
  useAppNavigation,
} from '@umituz/react-native-design-system/molecules';
import { useAppDesignTokens } from '@umituz/react-native-design-system/theme';

export interface AIProvider {
  name: string;
  purpose: string;
  privacyUrl: string;
}

export interface AIConsentScreenParams {
  providers?: AIProvider[];
  customMessage?: string;
  onAccept?: () => void;
  onDecline?: () => void;
  [key: string]: unknown;
}

export interface AIConsentScreenProps {
  route?: {
    params?: AIConsentScreenParams;
  };
  providers?: AIProvider[];
  customMessage?: string;
  onAccept?: () => void;
  onDecline?: () => void;
  standalone?: boolean;
}

const DEFAULT_PROVIDERS: AIProvider[] = [
  {
    name: 'Pruna AI',
    purpose: 'Image generation & editing',
    privacyUrl: 'https://pruna.ai/privacy',
  },
  {
    name: 'FAL AI',
    purpose: 'Video generation infrastructure',
    privacyUrl: 'https://fal.ai/privacy',
  },
  {
    name: 'Groq AI',
    purpose: 'Text processing & prompts',
    privacyUrl: 'https://groq.com/privacy',
  },
];

export const AIConsentScreen: React.FC<AIConsentScreenProps> = memo(({
  route,
  providers = DEFAULT_PROVIDERS,
  customMessage,
  onAccept,
  onDecline,
  standalone = false,
}) => {
  const navigation = useAppNavigation();
  const tokens = useAppDesignTokens();
  const [loading, setLoading] = React.useState(false);

  // Get params from route or use props
  const params = route?.params || {};
  const finalProviders = params.providers || providers;
  const finalMessage = params.customMessage || customMessage;
  const finalOnAccept = params.onAccept || onAccept;
  const finalOnDecline = params.onDecline || onDecline;

  const handleAccept = async () => {
    if (finalOnAccept) {
      setLoading(true);
      try {
        await finalOnAccept();
      } catch (error) {
        console.error('[AIConsentScreen] Accept error:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!standalone) {
      navigation.goBack();
    }
  };

  const handleDecline = () => {
    if (finalOnDecline) {
      finalOnDecline();
    }

    if (!standalone) {
      navigation.goBack();
    }
  };

  const handleLinkPress = (url: string) => {
    // TODO: Implement Linking.openURL
    console.log('[AIConsentScreen] Open URL:', url);
  };

  return (
    <ScreenLayout
      scrollable={true}
      edges={['top', 'bottom', 'left', 'right']}
      hideScrollIndicator={false}
    >
      {!standalone && (
        <NavigationHeader
          title="AI Technology Disclosure"
          onBackPress={() => navigation.goBack()}
        />
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {finalMessage && (
          <AtomicText style={styles.introText}>
            {finalMessage}
          </AtomicText>
        )}

        <AtomicText style={styles.introText}>
          Vivoim uses multiple AI services to generate content. Before using
          our AI features, please review how your data is processed.
        </AtomicText>

        <View style={styles.section}>
          <AtomicText style={styles.sectionTitle}>
            🤖 AI Services We Use
          </AtomicText>
          <View style={styles.providerList}>
            {finalProviders.map((provider, index) => (
              <View key={index} style={styles.providerItem}>
                <View style={styles.providerHeader}>
                  <AtomicText style={styles.providerName}>
                    {provider.name}
                  </AtomicText>
                  <TouchableOpacity
                    onPress={() => handleLinkPress(provider.privacyUrl)}
                  >
                    <AtomicText style={styles.privacyLink}>
                      Privacy Policy
                    </AtomicText>
                  </TouchableOpacity>
                </View>
                <AtomicText style={styles.providerPurpose}>
                  {provider.purpose}
                </AtomicText>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <AtomicText style={styles.sectionTitle}>
            📸 What We Send to AI Services
          </AtomicText>
          <AtomicText style={styles.bullet}>
            • Photos you select from your gallery
          </AtomicText>
          <AtomicText style={styles.bullet}>
            • Text prompts you enter
          </AtomicText>
          <AtomicText style={styles.bullet}>
            • Generation instructions and settings
          </AtomicText>
          <AtomicText style={styles.note}>
            Note: Your photos are processed to generate content and are NOT
            stored permanently by us or AI providers after processing
            completes.
          </AtomicText>
        </View>

        <View style={styles.section}>
          <AtomicText style={styles.sectionTitle}>
            🔒 Data Privacy
          </AtomicText>
          <AtomicText style={styles.bullet}>
            • Original photos are deleted after processing
          </AtomicText>
          <AtomicText style={styles.bullet}>
            • Generated content is stored in your account only
          </AtomicText>
          <AtomicText style={styles.bullet}>
            • You can delete any content at any time
          </AtomicText>
          <AtomicText style={styles.bullet}>
            • Face data is used for generation only
          </AtomicText>
          <AtomicText style={styles.bullet}>
            • No biometric authentication or tracking
          </AtomicText>
        </View>

        <View style={styles.section}>
          <AtomicText style={styles.sectionTitle}>
            📄 Legal Documents
          </AtomicText>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => handleLinkPress('https://umituz.com/projects/ai-technology/vivoim/privacy')}
          >
            <AtomicText style={styles.linkText}>
              Privacy Policy →
            </AtomicText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => handleLinkPress('https://umituz.com/projects/ai-technology/vivoim/terms')}
          >
            <AtomicText style={styles.linkText}>
              Terms of Use →
            </AtomicText>
          </TouchableOpacity>
        </View>

        <View style={styles.declarationSection}>
          <View style={styles.checkbox}>
            <View style={styles.checkboxInner}>
              <AtomicText style={styles.checkmark}>✓</AtomicText>
            </View>
          </View>
          <AtomicText style={styles.declarationText}>
            I have read and agree to the Privacy Policy and Terms of Use. I
            understand that my photos will be processed by third-party AI
            services to generate content.
          </AtomicText>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AtomicButton
          variant="secondary"
          onPress={handleDecline}
          style={styles.declineButton}
          fullWidth
        >
          Decline
        </AtomicButton>
        <AtomicButton
          variant="primary"
          onPress={handleAccept}
          disabled={loading}
          style={styles.acceptButton}
          fullWidth
        >
          {loading ? (
            <AtomicSpinner size="sm" color="background" />
          ) : (
            'I Accept'
          )}
        </AtomicButton>
      </View>
    </ScreenLayout>
  );
});

AIConsentScreen.displayName = 'AIConsentScreen';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
    color: '#374151',
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  providerList: {
    gap: 12,
  },
  providerItem: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  providerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  privacyLink: {
    fontSize: 13,
    color: '#3B82F6',
  },
  providerPurpose: {
    fontSize: 14,
    color: '#6B7280',
  },
  bullet: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginLeft: 8,
  },
  note: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
    marginLeft: 8,
    marginTop: 4,
  },
  linkButton: {
    paddingVertical: 8,
    marginTop: 8,
  },
  linkText: {
    fontSize: 15,
    color: '#3B82F6',
    fontWeight: '500',
  },
  declarationSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    padding: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 12,
    marginTop: 2,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  declarationText: {
    flex: 1,
    fontSize: 14,
    color: '#1E3A8A',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  declineButton: {
    flex: 1,
  },
  acceptButton: {
    flex: 1,
  },
});

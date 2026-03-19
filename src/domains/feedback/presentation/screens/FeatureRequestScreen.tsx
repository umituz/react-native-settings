import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  AtomicText,
  AtomicIcon,
} from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useAppNavigation } from "@umituz/react-native-design-system/molecules";
import { devWarn } from "../../../../utils/devUtils";
import { ScreenLayout } from "@umituz/react-native-design-system/layouts";
import { ICON_PATHS } from "../../../../utils/iconPaths";
import { useFeatureRequests } from "../../infrastructure/useFeatureRequests";
import type { FeedbackType } from "../../domain/entities/FeedbackEntity";
import type { FeatureRequestItem } from "../../domain/entities/FeatureRequestEntity";
import type { FeedbackFormTexts } from "../components/FeedbackFormProps";

interface FeatureRequestScreenProps {
  config?: {
    translations?: Record<string, any>;
  };
  texts?: FeedbackFormTexts & { title?: string };
}

export const FeatureRequestScreen: React.FC<FeatureRequestScreenProps> = ({ config, texts }) => {
  const tokens = useAppDesignTokens();
  const navigation = useAppNavigation();
  const { requests, userVotes, isLoading, vote, submitRequest, userId } = useFeatureRequests();

  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'roadmap'>('all');

  const t = config?.translations || {};
  const screenTitle = t.screen_title || "Feedback & Features";
  const trendingTitle = t.trending || "Trending Requests";
  const bannerTitle = t.banner?.title || "Community Active";
  const bannerSub = t.banner?.subtitle || `${requests.length} feature requests`;
  const newIdeaLabel = t.new_idea || "NEW IDEA?";

  const tabLabels = {
    all: t.tabs?.all || "All Requests",
    my: t.tabs?.my || "My Feedback",
    roadmap: t.tabs?.roadmap || "Roadmap",
  };

  const statusLabels: Record<string, string> = {
    planned: t.status?.planned || "Planned",
    review: t.status?.review || "Under Review",
    completed: t.status?.completed || "Completed",
    pending: t.status?.pending || "Pending",
    dismissed: t.status?.dismissed || "Dismissed",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return '#3b82f6';
      case 'review': return '#f59e0b';
      case 'completed': return '#10b981';
      case 'pending': return '#8b5cf6';
      case 'dismissed': return '#ef4444';
      default: return tokens.colors.textSecondary;
    }
  };

  const filteredRequests = useMemo(() => {
    switch (activeTab) {
      case 'my':
        return requests.filter(r => r.createdBy === userId);
      case 'roadmap':
        return requests.filter(r => ['planned', 'completed', 'review'].includes(r.status));
      default:
        return requests;
    }
  }, [requests, activeTab, userId]);

  const renderRequestCard = useCallback(({ item }: { item: FeatureRequestItem }) => {
    const voted = userVotes[item.id] || null;

    return (
      <View key={item.id} style={[styles.card, { backgroundColor: tokens.colors.surfaceSecondary, borderColor: tokens.colors.borderLight }]}>
        <View style={styles.voteColumn}>
          <TouchableOpacity onPress={() => vote(item.id, 'up')}>
            <AtomicIcon
              svgPath={ICON_PATHS['chevron-up']}
              customSize={20}
              customColor={voted === 'up' ? tokens.colors.primary : tokens.colors.textSecondary}
            />
          </TouchableOpacity>
          <AtomicText style={[styles.voteCount, { color: voted === 'up' ? tokens.colors.primary : tokens.colors.textPrimary }]}>
            {item.votes}
          </AtomicText>
          <TouchableOpacity onPress={() => vote(item.id, 'down')}>
            <AtomicIcon
              svgPath={ICON_PATHS['chevron-down']}
              customSize={20}
              customColor={voted === 'down' ? tokens.colors.primary : tokens.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <AtomicText style={styles.cardTitle}>{item.title}</AtomicText>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20', borderColor: getStatusColor(item.status) + '40' }]}>
              <AtomicText style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                {(statusLabels[item.status] || item.status).toUpperCase()}
              </AtomicText>
            </View>
          </View>

          <AtomicText style={[styles.cardDescription, { color: tokens.colors.textSecondary }]}>
            {item.description}
          </AtomicText>

          <View style={styles.cardFooter}>
            <AtomicText style={[styles.platformText, { color: tokens.colors.textTertiary }]}>
              {item.platform.toUpperCase()}
            </AtomicText>
            <AtomicText style={[styles.commentCount, { color: tokens.colors.textTertiary }]}>
              {item.commentCount} {t.comment_count?.replace('{{count}}', '') || 'comments'}
            </AtomicText>
          </View>
        </View>
      </View>
    );
  }, [userVotes, vote, tokens.colors, getStatusColor, statusLabels, t]);

  const tabs = useMemo(() => (['all', 'my', 'roadmap'] as const), []);

  const header = useMemo(() => (
    <View style={styles.header}>
      <AtomicText style={styles.headerTitle}>{screenTitle}</AtomicText>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: tokens.colors.primary }]}
        onPress={() => navigation.push('Feedback' as never, {
          initialType: 'feature_request' as FeedbackType,
          title: texts?.title,
          texts: texts,
        })}
      >
        <AtomicIcon
          svgPath={ICON_PATHS['plus']}
          customSize={16}
          customColor={tokens.colors.onPrimary}
        />
      </TouchableOpacity>
    </View>
  ), [screenTitle, tokens.colors.primary, tokens.colors.onPrimary]);

  if (isLoading) {
    return (
      <ScreenLayout header={header} edges={['top', 'bottom', 'left', 'right']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={tokens.colors.primary} />
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout header={header} edges={['top', 'bottom']}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && { borderBottomColor: tokens.colors.primary }]}
          >
            <AtomicText style={[styles.tabLabel, activeTab === tab && { color: tokens.colors.primary, fontWeight: '700' }]}>
              {tabLabels[tab]}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredRequests}
        renderItem={renderRequestCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.container}>
            <View style={[styles.banner, { backgroundColor: tokens.colors.primary + '10', borderColor: tokens.colors.primary + '20' }]}>
              <View style={styles.bannerIconContainer}>
                <AtomicIcon
                  svgPath={ICON_PATHS['users']}
                  customSize={24}
                  customColor={tokens.colors.primary}
                />
                <View style={styles.pulseDot} />
              </View>
              <View>
                <AtomicText style={styles.bannerTitle}>{bannerTitle}</AtomicText>
                <AtomicText style={[styles.bannerSub, { color: tokens.colors.textSecondary }]}>
                  {bannerSub}
                </AtomicText>
              </View>
            </View>

            <AtomicText style={styles.sectionTitle}>{trendingTitle}</AtomicText>
          </View>
        }
        ListEmptyComponent={
          <View style={[styles.emptyState, { paddingHorizontal: tokens.spacing.md }]}>
            <AtomicIcon
              svgPath={ICON_PATHS['chatbubble-outline']}
              customSize={32}
              customColor={tokens.colors.textTertiary}
            />
            <AtomicText style={[styles.emptyText, { color: tokens.colors.textTertiary }]}>
              {t.empty || "No requests yet. Be the first!"}
            </AtomicText>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
      />

      <View style={styles.floatingHint}>
        <TouchableOpacity
          style={[styles.hintBadge, { backgroundColor: tokens.colors.primary }]}
          onPress={() => navigation.push('Feedback' as never, {
            initialType: 'feature_request' as FeedbackType,
            title: texts?.title,
            texts: texts,
          })}
        >
          <AtomicText style={styles.hintText}>{newIdeaLabel}</AtomicText>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontSize: 20, fontWeight: '800' },
  addButton: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tabsContainer: { flexDirection: 'row', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  tab: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabLabel: { fontSize: 14, fontWeight: '600', color: 'rgba(255,255,255,0.5)' },
  banner: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, borderWidth: 1, gap: 12, marginBottom: 20 },
  bannerIconContainer: { position: 'relative' },
  pulseDot: { position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: 4, backgroundColor: '#10b981' },
  bannerTitle: { fontSize: 14, fontWeight: '700' },
  bannerSub: { fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  listContent: { gap: 12, paddingBottom: 40 },
  card: { flexDirection: 'row', padding: 16, borderRadius: 16, borderWidth: 1, gap: 12 },
  voteColumn: { alignItems: 'center', gap: 4, width: 40 },
  voteCount: { fontSize: 13, fontWeight: '800' },
  cardContent: { flex: 1, gap: 8 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  cardTitle: { fontSize: 15, fontWeight: '700', flex: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, borderWidth: 1 },
  statusText: { fontSize: 9, fontWeight: '900' },
  cardDescription: { fontSize: 13, lineHeight: 18 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  platformText: { fontSize: 10, fontWeight: '600' },
  commentCount: { fontSize: 11 },
  floatingHint: { position: 'absolute', bottom: 40, right: 16, zIndex: 100 },
  hintBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 8 },
  hintText: { color: '#fff', fontSize: 10, fontWeight: '900', textTransform: 'uppercase' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60, gap: 12 },
  emptyText: { fontSize: 14, fontWeight: '500' },
});

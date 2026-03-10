import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import {
  AtomicText,
  AtomicIcon,
  AtomicButton,
} from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { ScreenLayout } from "@umituz/react-native-design-system/layouts";
import { FeedbackModal } from "../components/FeedbackModal";
import type { FeedbackType, FeedbackRating } from "../../domain/entities/FeedbackEntity";

interface FeatureRequest {
  id: string;
  title: string;
  description: string;
  votes: number;
  status: 'planned' | 'review' | 'completed';
  comments: number;
  userAvatars: string[];
  voted: 'up' | 'down' | null;
}

const MOCK_REQUESTS: FeatureRequest[] = [
  {
    id: "1",
    title: "AI Music Generation",
    description: "Add the ability to generate background tracks for videos using simple text prompts or mood selectors.",
    votes: 1250,
    status: 'planned',
    comments: 24,
    userAvatars: ["https://i.pravatar.cc/100?u=1", "https://i.pravatar.cc/100?u=2"],
    voted: null,
  },
  {
    id: "2",
    title: "Couple Video Templates",
    description: "Specific cinematic transition templates designed for couples' vlogs and anniversary montages.",
    votes: 842,
    status: 'review',
    comments: 8,
    userAvatars: ["https://i.pravatar.cc/100?u=3"],
    voted: null,
  },
  {
    id: "3",
    title: "4K Export Support",
    description: "Allow users to export generated AI videos in high-quality 4K resolution.",
    votes: 2100,
    status: 'completed',
    comments: 42,
    userAvatars: ["https://i.pravatar.cc/100?u=4", "https://i.pravatar.cc/100?u=5"],
    voted: null,
  },
  {
    id: "4",
    title: "Dark Mode Editor",
    description: "Make the entire editing interface dark for better focus during late-night creative sessions.",
    votes: 156,
    status: 'planned',
    comments: 5,
    userAvatars: ["https://i.pravatar.cc/100?u=6"],
    voted: null,
  }
];

export const FeatureRequestScreen: React.FC<any> = ({ config, texts }) => {
  const tokens = useAppDesignTokens();
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'roadmap'>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Use passed translations if available
  const t = config?.translations || {};
  const screenTitle = t.screen_title || "Feedback & Features";
  const trendingTitle = t.trending || "Trending Requests";
  const bannerTitle = t.banner?.title || "Community Active";
  const bannerSub = t.banner?.subtitle || "1.2k users voting right now";
  const newIdeaLabel = t.new_idea || "NEW IDEA?";
  
  const tabLabels = {
    all: t.tabs?.all || "All Requests",
    my: t.tabs?.my || "My Feedback",
    roadmap: t.tabs?.roadmap || "Roadmap",
  };

  const statusLabels = {
    planned: t.status?.planned || "Planned",
    review: t.status?.review || "Under Review",
    completed: t.status?.completed || "Completed",
  };

  const handleVote = (id: string, type: 'up' | 'down') => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        // Simplified voting logic for mock
        let newVotes = req.votes;
        if (req.voted === type) {
          newVotes -= type === 'up' ? 1 : -1;
          return { ...req, votes: newVotes, voted: null };
        } else {
          if (req.voted !== null) {
            newVotes += type === 'up' ? 2 : -2;
          } else {
            newVotes += type === 'up' ? 1 : -1;
          }
          return { ...req, votes: newVotes, voted: type };
        }
      }
      return req;
    }));
  };

  const getStatusColor = (status: FeatureRequest['status']) => {
    switch (status) {
      case 'planned': return '#3b82f6';
      case 'review': return '#f59e0b';
      case 'completed': return '#10b981';
      default: return tokens.colors.textSecondary;
    }
  };

  const renderRequestItem = ({ item }: { item: FeatureRequest }) => (
    <View style={[styles.card, { backgroundColor: tokens.colors.surfaceSecondary, borderColor: tokens.colors.borderLight }]}>
      <View style={styles.voteColumn}>
        <TouchableOpacity onPress={() => handleVote(item.id, 'up')}>
          <AtomicIcon 
            name="expand-less" 
            size="md" 
            color={item.voted === 'up' ? "primary" : "textSecondary" as any} 
          />
        </TouchableOpacity>
        <AtomicText style={[styles.voteCount, { color: item.voted === 'up' ? tokens.colors.primary : tokens.colors.textPrimary }]}>
          {item.votes}
        </AtomicText>
        <TouchableOpacity onPress={() => handleVote(item.id, 'down')}>
          <AtomicIcon 
            name="expand-more" 
            size="md" 
            color={item.voted === 'down' ? "primary" : "textSecondary" as any} 
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
          <View style={styles.avatarGroup}>
            {item.userAvatars.map((url, i) => (
              <Image key={i} source={{ uri: url }} style={[styles.avatar, { borderColor: tokens.colors.surfaceSecondary }]} />
            ))}
            {item.comments > 5 && (
              <View style={[styles.avatarMore, { backgroundColor: tokens.colors.surfaceVariant }]}>
                <AtomicText style={styles.avatarMoreText}>+{item.comments}</AtomicText>
              </View>
            )}
          </View>
          <AtomicText style={[styles.commentCount, { color: tokens.colors.textTertiary }]}>
            {item.comments} {t.comment_count?.replace('{{count}}', '') || 'comments'}
          </AtomicText>
        </View>
      </View>
    </View>
  );

  const header = (
    <View style={styles.header}>
      <AtomicText style={styles.headerTitle}>{screenTitle}</AtomicText>
      <TouchableOpacity 
        style={[styles.addButton, { backgroundColor: tokens.colors.primary }]}
        onPress={() => setIsModalVisible(true)}
      >
        <AtomicIcon name="plus" size="sm" color="onPrimary" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenLayout header={header} edges={['top', 'bottom']}>
      <View style={styles.tabsContainer}>
        {(['all', 'my', 'roadmap'] as const).map((tab) => (
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

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.banner, { backgroundColor: tokens.colors.primary + '10', borderColor: tokens.colors.primary + '20' }]}>
          <View style={styles.bannerIconContainer}>
            <AtomicIcon name="users" size="lg" color="primary" />
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

        <FlatList
          data={requests}
          renderItem={renderRequestItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      </ScrollView>

      {isModalVisible && (
        <FeedbackModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={async (data: any) => {
            console.log("Submitted:", data);
            setIsModalVisible(false);
            // Add to mock list for "live" feel
            const newReq: FeatureRequest = {
              id: Date.now().toString(),
              title: data.title || "New Request",
              description: data.description,
              votes: 1,
              status: 'review',
              comments: 0,
              userAvatars: ["https://i.pravatar.cc/100?u=me"],
              voted: 'up',
            };
            setRequests(prev => [newReq, ...prev]);
          }}
          texts={texts}
          initialType="feature_request"
        />
      )}

      <View style={styles.floatingHint}>
        <View style={[styles.hintBadge, { backgroundColor: tokens.colors.primary }]}>
          <AtomicText style={styles.hintText}>{newIdeaLabel}</AtomicText>
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    marginBottom: 20,
  },
  bannerIconContainer: {
    position: 'relative',
  },
  pulseDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  bannerSub: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  listContent: {
    gap: 12,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  voteColumn: {
    alignItems: 'center',
    gap: 4,
    width: 40,
  },
  voteCount: {
    fontSize: 13,
    fontWeight: '800',
  },
  cardContent: {
    flex: 1,
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '900',
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginLeft: -8,
  },
  avatarMore: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarMoreText: {
    fontSize: 8,
    fontWeight: '800',
  },
  commentCount: {
    fontSize: 11,
  },
  floatingHint: {
    position: 'absolute',
    bottom: 40,
    right: 16,
    zIndex: 100,
  },
  hintBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  hintText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  }
});

/**
 * Video Tutorials Domain
 *
 * Props-based component - pass tutorials data from app config
 *
 * Usage:
 *   import { VideoTutorialsScreen, VideoTutorialCard, VideoTutorial } from '@umituz/react-native-settings';
 *
 *   <VideoTutorialsScreen
 *     tutorials={myTutorials}
 *     featuredTutorials={myFeaturedTutorials}
 *     onTutorialPress={(tutorial) => Linking.openURL(tutorial.videoUrl)}
 *   />
 */

export * from "./types";
export * from "./presentation/screens/VideoTutorialsScreen";
export * from "./presentation/components/VideoTutorialCard";
export * from "./presentation/components/VideoTutorialSection";

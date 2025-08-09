import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Button, Chip, ProgressBar, Avatar } from 'react-native-paper';
import ResponsiveLayout from '../components/ResponsiveLayout';
import PCHomeScreen from '../components/PCHomeScreen';
import { theme } from '../constants/theme';
import { LEARNING_TOPICS, LEARNING_STATS, PORTFOLIO_ITEMS } from '../data/dummyData';
import { getDeviceInfo, responsiveStyle, getGridColumns, shouldUsePCLayout } from '../utils/responsive';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  onNavigate?: (route: string) => void;
  userType?: 'student' | 'teacher';
}

export default function HomeScreen({ onNavigate, userType = 'student' }: HomeScreenProps) {
  const { isDesktop, isTablet } = getDeviceInfo();
  const featureGridColumns = getGridColumns(250);
  const usePCLayout = shouldUsePCLayout();

  // PC専用レイアウトを使用
  if (usePCLayout && onNavigate) {
    return <PCHomeScreen onNavigate={onNavigate} userType={userType} />;
  }

  // モバイル・タブレット向けレイアウト
  return (
    <ResponsiveLayout
      title="ホーム"
      activeRoute="Home"
      onNavigate={onNavigate || (() => {})}
      userType={userType}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={isDesktop ? styles.desktopScrollContent : undefined}>
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <View style={styles.welcomeHeader}>
              <View style={styles.logoContainer}>
                <Avatar.Text size={64} label="4976" style={styles.avatar} labelStyle={styles.avatarText} />
              </View>
              <Title style={styles.title}>4976エデュケーション</Title>
              <Paragraph style={styles.subtitle}>探究学習で未来を創造する</Paragraph>
            </View>
            <Paragraph style={styles.description}>
              AI支援による個別最適化学習で、あなたの可能性を最大限に引き出します。
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.featureCard}>
          <Card.Content>
            <Title style={styles.featureTitle}>主な機能</Title>
            <View style={[styles.featureGrid, isDesktop && styles.featureGridDesktop]}>
              <View style={[styles.featureItem, isDesktop && styles.featureItemDesktop]}>
                <View style={styles.featureIcon}>
                  <Title style={styles.featureIconText}>🎯</Title>
                </View>
                <Paragraph style={styles.featureText}>探究テーマ発見</Paragraph>
              </View>
              <View style={[styles.featureItem, isDesktop && styles.featureItemDesktop]}>
                <View style={styles.featureIcon}>
                  <Title style={styles.featureIconText}>🤖</Title>
                </View>
                <Paragraph style={styles.featureText}>AI学習支援</Paragraph>
              </View>
              <View style={[styles.featureItem, isDesktop && styles.featureItemDesktop]}>
                <View style={styles.featureIcon}>
                  <Title style={styles.featureIconText}>📊</Title>
                </View>
                <Paragraph style={styles.featureText}>ポートフォリオ</Paragraph>
              </View>
              <View style={[styles.featureItem, isDesktop && styles.featureItemDesktop]}>
                <View style={styles.featureIcon}>
                  <Title style={styles.featureIconText}>✍️</Title>
                </View>
                <Paragraph style={styles.featureText}>志望理由書添削</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.actionCard}>
          <Card.Content>
            <Title style={styles.featureTitle}>おすすめの探究テーマ</Title>
            <View style={styles.recommendedTopic}>
              <Title style={styles.topicTitle}>{LEARNING_TOPICS[0].title}</Title>
              <Paragraph style={styles.topicDescription}>{LEARNING_TOPICS[0].description}</Paragraph>
              <View style={styles.topicInfo}>
                <Chip style={styles.difficultyChip}>{LEARNING_TOPICS[0].difficulty}</Chip>
                <Chip style={styles.categoryChip}>{LEARNING_TOPICS[0].category}</Chip>
                <Chip style={styles.timeChip}>{LEARNING_TOPICS[0].estimatedTime}</Chip>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" style={styles.actionButton}>
              探究を始める
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.progressCard}>
          <Card.Content>
            <Title style={styles.featureTitle}>あなたの学習統計</Title>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Title style={styles.statNumber}>{LEARNING_STATS.currentStreak}</Title>
                <Paragraph style={styles.statLabel}>連続学習日数</Paragraph>
              </View>
              <View style={styles.statCard}>
                <Title style={styles.statNumber}>{LEARNING_STATS.completedProjects}</Title>
                <Paragraph style={styles.statLabel}>完了プロジェクト</Paragraph>
              </View>
            </View>
            <View style={styles.progressSection}>
              <View style={styles.progressItem}>
                <Paragraph style={styles.progressLabel}>総学習時間: {LEARNING_STATS.totalStudyTime}時間</Paragraph>
                <ProgressBar 
                  progress={LEARNING_STATS.totalStudyTime / 200} 
                  color={theme.colors.primary} 
                  style={styles.progressBar}
                />
              </View>
              <View style={styles.progressItem}>
                <Paragraph style={styles.progressLabel}>作成中の作品: {PORTFOLIO_ITEMS.filter(item => item.status === '作成中').length}件</Paragraph>
                <ProgressBar 
                  progress={0.6} 
                  color={theme.colors.secondary} 
                  style={styles.progressBar}
                />
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </ResponsiveLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
    padding: theme.spacing.md,
  },
  desktopScrollContent: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  welcomeCard: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
  },
  welcomeHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  logoContainer: {
    marginBottom: theme.spacing.md,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  avatarText: {
    color: theme.colors.textInverse,
    fontWeight: 'bold',
    fontSize: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
  },
  featureCard: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureGridDesktop: {
    justifyContent: 'space-around',
  },
  featureItem: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundTertiary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  featureItemDesktop: {
    width: '22%',
    minWidth: 200,
    padding: theme.spacing.lg,
  },
  featureIcon: {
    marginBottom: theme.spacing.sm,
  },
  featureIconText: {
    fontSize: 28,
    margin: 0,
  },
  featureText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
  },
  actionCard: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  recommendedTopic: {
    backgroundColor: theme.colors.backgroundTertiary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  topicDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  topicInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  difficultyChip: {
    backgroundColor: theme.colors.info,
  },
  categoryChip: {
    backgroundColor: theme.colors.accent,
  },
  timeChip: {
    backgroundColor: theme.colors.success,
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  progressCard: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundTertiary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    minWidth: width * 0.35,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    margin: 0,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  progressSection: {
    gap: theme.spacing.md,
  },
  progressItem: {
    marginBottom: theme.spacing.sm,
  },
  progressLabel: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.backgroundTertiary,
  },
});
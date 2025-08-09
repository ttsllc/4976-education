import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Button, Chip, ProgressBar, Avatar, DataTable, List } from 'react-native-paper';
import ResponsiveLayout from './ResponsiveLayout';
import ActivityGrassChart from './ActivityGrassChart';
import { theme } from '../constants/theme';
import { LEARNING_TOPICS, LEARNING_STATS, PORTFOLIO_ITEMS, ACTIVITY_DATA, LEARNING_MATERIALS, ACHIEVEMENTS } from '../data/dummyData';

const { width } = Dimensions.get('window');

interface PCHomeScreenProps {
  onNavigate: (route: string) => void;
  userType: 'student' | 'teacher';
}

export default function PCHomeScreen({ onNavigate, userType }: PCHomeScreenProps) {
  const recentPortfolioItems = PORTFOLIO_ITEMS.slice(0, 4);
  const recommendedMaterials = LEARNING_MATERIALS.slice(0, 3);
  const recentAchievements = ACHIEVEMENTS.slice(0, 3);

  return (
    <ResponsiveLayout
      title="ダッシュボード"
      activeRoute="Home"
      onNavigate={onNavigate}
      userType={userType}
    >
      <ScrollView style={styles.container}>
        {/* ウェルカムセクション */}
        <View style={styles.welcomeSection}>
          <Card style={styles.welcomeCard}>
            <Card.Content style={styles.welcomeContent}>
              <View style={styles.welcomeLeft}>
                <Title style={styles.welcomeTitle}>
                  おかえりなさい、{userType === 'student' ? '学習者' : '指導者'}さん！
                </Title>
                <Paragraph style={styles.welcomeSubtitle}>
                  4976エデュケーションで今日も探究学習を進めていきましょう
                </Paragraph>
                <View style={styles.welcomeActions}>
                  <Button 
                    mode="contained" 
                    style={styles.primaryButton}
                    onPress={() => onNavigate('Explore')}
                  >
                    新しいテーマを探す
                  </Button>
                  <Button 
                    mode="outlined" 
                    style={styles.secondaryButton}
                    onPress={() => onNavigate('AIAssistant')}
                  >
                    AI支援を受ける
                  </Button>
                </View>
              </View>
              <View style={styles.welcomeRight}>
                <Avatar.Text 
                  size={100} 
                  label="4976" 
                  style={styles.avatar} 
                  labelStyle={styles.avatarText}
                />
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* メインダッシュボード - 3カラムレイアウト */}
        <View style={styles.dashboardGrid}>
          {/* 左カラム - 学習統計 & アクティビティ */}
          <View style={styles.leftColumn}>
            {/* 学習統計カード */}
            <Card style={styles.statsCard}>
              <Card.Content>
                <Title style={styles.cardTitle}>学習統計</Title>
                <View style={styles.statsGrid}>
                  <View style={styles.statBox}>
                    <Title style={styles.statNumber}>{LEARNING_STATS.currentStreak}</Title>
                    <Paragraph style={styles.statLabel}>連続学習日数</Paragraph>
                  </View>
                  <View style={styles.statBox}>
                    <Title style={styles.statNumber}>{LEARNING_STATS.totalStudyTime}h</Title>
                    <Paragraph style={styles.statLabel}>総学習時間</Paragraph>
                  </View>
                  <View style={styles.statBox}>
                    <Title style={styles.statNumber}>{LEARNING_STATS.completedProjects}</Title>
                    <Paragraph style={styles.statLabel}>完了プロジェクト</Paragraph>
                  </View>
                  <View style={styles.statBox}>
                    <Title style={styles.statNumber}>{LEARNING_STATS.activeDays}</Title>
                    <Paragraph style={styles.statLabel}>アクティブ日数</Paragraph>
                  </View>
                </View>
              </Card.Content>
            </Card>

            {/* アクティビティチャート */}
            <Card style={styles.activityCard}>
              <Card.Content>
                <ActivityGrassChart data={ACTIVITY_DATA} />
              </Card.Content>
            </Card>

            {/* 学習カテゴリ分布 */}
            <Card style={styles.categoryCard}>
              <Card.Content>
                <Title style={styles.cardTitle}>学習カテゴリ分布</Title>
                {LEARNING_STATS.topCategories.map((category, index) => (
                  <View key={index} style={styles.categoryItem}>
                    <View style={styles.categoryInfo}>
                      <Paragraph style={styles.categoryName}>{category.name}</Paragraph>
                      <Paragraph style={styles.categoryHours}>{category.hours}時間 ({category.percentage}%)</Paragraph>
                    </View>
                    <ProgressBar 
                      progress={category.percentage / 100} 
                      color={theme.colors.primary} 
                      style={styles.categoryProgress}
                    />
                  </View>
                ))}
              </Card.Content>
            </Card>
          </View>

          {/* 中央カラム - 推奨コンテンツ & 最近の活動 */}
          <View style={styles.centerColumn}>
            {/* 今日の推奨テーマ */}
            <Card style={styles.recommendedCard}>
              <Card.Content>
                <Title style={styles.cardTitle}>今日の推奨テーマ</Title>
                <View style={styles.topicCard}>
                  <Title style={styles.topicTitle}>{LEARNING_TOPICS[0].title}</Title>
                  <Paragraph style={styles.topicDescription}>{LEARNING_TOPICS[0].description}</Paragraph>
                  <View style={styles.topicMeta}>
                    <Chip style={styles.difficultyChip}>{LEARNING_TOPICS[0].difficulty}</Chip>
                    <Chip style={styles.categoryChip}>{LEARNING_TOPICS[0].category}</Chip>
                    <Chip style={styles.timeChip}>{LEARNING_TOPICS[0].estimatedTime}</Chip>
                  </View>
                  <Button 
                    mode="contained" 
                    style={styles.topicButton}
                    onPress={() => onNavigate('Explore')}
                  >
                    詳細を見る
                  </Button>
                </View>
              </Card.Content>
            </Card>

            {/* 推奨学習教材 */}
            <Card style={styles.materialsCard}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Title style={styles.cardTitle}>推奨学習教材</Title>
                  <Button mode="text" onPress={() => onNavigate('Explore')}>すべて見る</Button>
                </View>
                {recommendedMaterials.map((material) => (
                  <List.Item
                    key={material.id}
                    title={material.title}
                    description={`${material.duration} | 評価: ${material.rating.toFixed(1)} | ${material.completedBy}人完了`}
                    left={() => (
                      <View style={styles.materialIcon}>
                        <Title style={styles.materialEmoji}>{material.thumbnail}</Title>
                      </View>
                    )}
                    right={() => (
                      <Chip style={styles.materialChip}>{material.difficulty}</Chip>
                    )}
                    onPress={() => console.log('教材選択:', material.id)}
                    style={styles.materialItem}
                  />
                ))}
              </Card.Content>
            </Card>

            {/* 最近の成果 */}
            <Card style={styles.achievementsCard}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Title style={styles.cardTitle}>最近の成果</Title>
                  <Button mode="text" onPress={() => onNavigate('Portfolio')}>すべて見る</Button>
                </View>
                {recentAchievements.map((achievement, index) => (
                  <List.Item
                    key={index}
                    title={achievement.title}
                    description={achievement.date}
                    left={() => (
                      <View style={styles.achievementIcon}>
                        <Title style={styles.achievementEmoji}>{achievement.icon}</Title>
                      </View>
                    )}
                    right={() => (
                      <Chip style={styles.achievementChip}>{achievement.type}</Chip>
                    )}
                    style={styles.achievementItem}
                  />
                ))}
              </Card.Content>
            </Card>
          </View>

          {/* 右カラム - 最近のポートフォリオ & クイックアクション */}
          <View style={styles.rightColumn}>
            {/* 最近のポートフォリオ */}
            <Card style={styles.portfolioCard}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Title style={styles.cardTitle}>最近の作品</Title>
                  <Button mode="text" onPress={() => onNavigate('Portfolio')}>すべて見る</Button>
                </View>
                {recentPortfolioItems.map((item) => (
                  <View key={item.id} style={styles.portfolioItem}>
                    <View style={styles.portfolioHeader}>
                      <Title style={styles.portfolioTitle}>{item.title}</Title>
                      <Chip 
                        style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) }]}
                        textStyle={styles.statusText}
                      >
                        {item.status}
                      </Chip>
                    </View>
                    <Paragraph style={styles.portfolioCategory}>{item.category}</Paragraph>
                    <Paragraph style={styles.portfolioDate}>{item.date}</Paragraph>
                    {item.progress < 1 && (
                      <View style={styles.progressSection}>
                        <Paragraph style={styles.progressLabel}>進捗: {Math.round(item.progress * 100)}%</Paragraph>
                        <ProgressBar progress={item.progress} color={theme.colors.primary} style={styles.progressBar} />
                      </View>
                    )}
                  </View>
                ))}
              </Card.Content>
            </Card>

            {/* クイックアクション */}
            <Card style={styles.actionsCard}>
              <Card.Content>
                <Title style={styles.cardTitle}>クイックアクション</Title>
                <View style={styles.actionButtons}>
                  <Button 
                    mode="contained" 
                    icon="plus" 
                    style={styles.actionButton}
                    onPress={() => onNavigate('Portfolio')}
                  >
                    新しい作品を作成
                  </Button>
                  <Button 
                    mode="outlined" 
                    icon="robot" 
                    style={styles.actionButton}
                    onPress={() => onNavigate('AIAssistant')}
                  >
                    AI支援を受ける
                  </Button>
                  <Button 
                    mode="outlined" 
                    icon="school" 
                    style={styles.actionButton}
                    onPress={() => console.log('志望理由書')}
                  >
                    志望理由書を書く
                  </Button>
                  <Button 
                    mode="outlined" 
                    icon="chart-line" 
                    style={styles.actionButton}
                    onPress={() => onNavigate('Portfolio')}
                  >
                    学習進捗を確認
                  </Button>
                </View>
              </Card.Content>
            </Card>

            {/* 今日のヒント */}
            <Card style={styles.tipCard}>
              <Card.Content>
                <Title style={styles.cardTitle}>💡 今日のヒント</Title>
                <Paragraph style={styles.tipText}>
                  探究学習では「なぜ？」という疑問を大切にしましょう。小さな疑問から大きな発見が生まれることがあります。
                </Paragraph>
              </Card.Content>
            </Card>
          </View>
        </View>
      </ScrollView>
    </ResponsiveLayout>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case '完成': return theme.colors.success;
    case '作成中': return theme.colors.warning;
    case '下書き': return theme.colors.disabled;
    case '提出済み': return theme.colors.info;
    default: return theme.colors.primary;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  welcomeSection: {
    marginBottom: theme.spacing.xl,
  },
  welcomeCard: {
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
  },
  welcomeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  welcomeLeft: {
    flex: 1,
    marginRight: theme.spacing.xl,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    lineHeight: 24,
  },
  welcomeActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  welcomeRight: {
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  avatarText: {
    color: theme.colors.textInverse,
    fontWeight: 'bold',
    fontSize: 32,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  secondaryButton: {
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  dashboardGrid: {
    flexDirection: 'row',
    gap: theme.spacing.xl,
    alignItems: 'flex-start',
  },
  leftColumn: {
    flex: 1,
    gap: theme.spacing.lg,
  },
  centerColumn: {
    flex: 1.2,
    gap: theme.spacing.lg,
  },
  rightColumn: {
    flex: 1,
    gap: theme.spacing.lg,
  },
  statsCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  statBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: theme.colors.backgroundTertiary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
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
  activityCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  categoryCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  categoryItem: {
    marginBottom: theme.spacing.md,
  },
  categoryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  categoryName: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  categoryHours: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  categoryProgress: {
    height: 6,
    borderRadius: 3,
  },
  recommendedCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  topicCard: {
    backgroundColor: theme.colors.backgroundTertiary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
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
  topicMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
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
  topicButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
  },
  materialsCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  materialItem: {
    backgroundColor: theme.colors.backgroundTertiary,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  materialIcon: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  materialEmoji: {
    fontSize: 20,
    margin: 0,
  },
  materialChip: {
    backgroundColor: theme.colors.backgroundSecondary,
    height: 24,
  },
  achievementsCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  achievementItem: {
    backgroundColor: theme.colors.backgroundTertiary,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  achievementIcon: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementEmoji: {
    fontSize: 20,
    margin: 0,
  },
  achievementChip: {
    backgroundColor: theme.colors.backgroundSecondary,
    height: 24,
  },
  portfolioCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  portfolioItem: {
    backgroundColor: theme.colors.backgroundTertiary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  portfolioTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  statusChip: {
    height: 24,
  },
  statusText: {
    color: theme.colors.textInverse,
    fontSize: 11,
    fontWeight: '500',
  },
  portfolioCategory: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  portfolioDate: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  progressSection: {
    marginTop: theme.spacing.sm,
  },
  progressLabel: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  actionsCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  actionButtons: {
    gap: theme.spacing.sm,
  },
  actionButton: {
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.xs,
  },
  tipCard: {
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primaryLight + '20',
    ...theme.shadows.sm,
  },
  tipText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
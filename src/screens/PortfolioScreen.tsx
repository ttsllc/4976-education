import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button, FAB, List, Chip, ProgressBar, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityGrassChart from '../components/ActivityGrassChart';
import PCPortfolioScreen from '../components/PCPortfolioScreen';
import { PORTFOLIO_ITEMS, ACHIEVEMENTS, ACTIVITY_DATA, LEARNING_STATS } from '../data/dummyData';
import { theme } from '../constants/theme';
import { shouldUsePCLayout } from '../utils/responsive';


interface PortfolioScreenProps {
  onNavigate?: (route: string) => void;
  userType?: 'student' | 'teacher';
}

export default function PortfolioScreen({ onNavigate, userType = 'student' }: PortfolioScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState('すべて');
  const [fabOpen, setFabOpen] = useState(false);
  const usePCLayout = shouldUsePCLayout();

  // PC専用レイアウトを使用
  if (usePCLayout && onNavigate) {
    return <PCPortfolioScreen onNavigate={onNavigate} userType={userType} />;
  }

  const filters = ['すべて', '完成', '作成中', '下書き'];

  const getFilteredItems = () => {
    if (selectedFilter === 'すべて') {
      return PORTFOLIO_ITEMS;
    }
    return PORTFOLIO_ITEMS.filter(item => item.status === selectedFilter);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '完成': return '#4CAF50';
      case '作成中': return '#FF9800';
      case '下書き': return '#9E9E9E';
      default: return '#2196F3';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'report': return 'file-document';
      case 'presentation': return 'presentation';
      case 'essay': return 'text-box';
      case 'document': return 'folder';
      default: return 'file';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title style={styles.title}>ポートフォリオ</Title>
            <Paragraph style={styles.description}>
              あなたの学習成果と成長記録を管理します
            </Paragraph>
          </Card.Content>
        </Card>

        <View style={styles.activitySection}>
          <ActivityGrassChart data={ACTIVITY_DATA} />
        </View>

        <Card style={styles.statsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>学習統計</Title>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Title style={styles.statNumber}>{PORTFOLIO_ITEMS.length}</Title>
                <Paragraph style={styles.statLabel}>総作品数</Paragraph>
              </View>
              <View style={styles.statItem}>
                <Title style={styles.statNumber}>{LEARNING_STATS.completedProjects}</Title>
                <Paragraph style={styles.statLabel}>完成プロジェクト</Paragraph>
              </View>
              <View style={styles.statItem}>
                <Title style={styles.statNumber}>{LEARNING_STATS.currentStreak}</Title>
                <Paragraph style={styles.statLabel}>連続学習日数</Paragraph>
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Title style={styles.statNumber}>{LEARNING_STATS.totalStudyTime}h</Title>
                <Paragraph style={styles.statLabel}>総学習時間</Paragraph>
              </View>
              <View style={styles.statItem}>
                <Title style={styles.statNumber}>{LEARNING_STATS.activeDays}</Title>
                <Paragraph style={styles.statLabel}>アクティブ日数</Paragraph>
              </View>
              <View style={styles.statItem}>
                <Title style={styles.statNumber}>{LEARNING_STATS.averageSessionTime}分</Title>
                <Paragraph style={styles.statLabel}>平均学習時間</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.filterCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>フィルター</Title>
            <View style={styles.filterChips}>
              {filters.map((filter) => (
                <Chip
                  key={filter}
                  selected={selectedFilter === filter}
                  onPress={() => setSelectedFilter(filter)}
                  style={[
                    styles.filterChip,
                    selectedFilter === filter && styles.selectedFilterChip
                  ]}
                >
                  {filter}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.itemsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>作品一覧</Title>
            {getFilteredItems().map((item, index) => (
              <View key={item.id}>
                <List.Item
                  title={item.title}
                  description={`${item.category} | ${item.date}`}
                  left={(props) => <List.Icon {...props} icon={getTypeIcon(item.type)} />}
                  right={() => (
                    <View style={styles.itemRight}>
                      <Chip 
                        style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) }]}
                        textStyle={styles.statusText}
                      >
                        {item.status}
                      </Chip>
                    </View>
                  )}
                  onPress={() => console.log('アイテム選択:', item.id)}
                />
                {item.progress < 1.0 && (
                  <View style={styles.progressContainer}>
                    <Paragraph style={styles.progressLabel}>
                      進捗: {Math.round(item.progress * 100)}%
                    </Paragraph>
                    <ProgressBar progress={item.progress} color="#2196F3" style={styles.progressBar} />
                  </View>
                )}
                {index < getFilteredItems().length - 1 && <Divider />}
              </View>
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.achievementsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>成果・表彰</Title>
            {ACHIEVEMENTS.map((achievement, index) => (
              <View key={index}>
                <List.Item
                  title={achievement.title}
                  description={achievement.date}
                  left={(props) => <List.Icon {...props} icon="trophy" color="#FFD700" />}
                  right={() => (
                    <View style={styles.achievementRight}>
                      <Paragraph style={styles.achievementIcon}>{achievement.icon}</Paragraph>
                      <Chip style={styles.achievementChip}>
                        {achievement.type}
                      </Chip>
                    </View>
                  )}
                />
                {index < ACHIEVEMENTS.length - 1 && <Divider />}
              </View>
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.exportCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>ポートフォリオエクスポート</Title>
            <Paragraph style={styles.exportDescription}>
              あなたのポートフォリオをPDFや他の形式で書き出すことができます
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined" icon="download">
              PDF出力
            </Button>
            <Button mode="outlined" icon="share">
              共有
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>

      <FAB.Group
        open={fabOpen}
        visible
        icon={fabOpen ? 'close' : 'plus'}
        actions={[
          {
            icon: 'file-document',
            label: 'レポート作成',
            onPress: () => console.log('レポート作成'),
          },
          {
            icon: 'presentation',
            label: '発表資料',
            onPress: () => console.log('発表資料作成'),
          },
          {
            icon: 'text-box',
            label: '志望理由書',
            onPress: () => console.log('志望理由書作成'),
          },
          {
            icon: 'camera',
            label: '作品撮影',
            onPress: () => console.log('作品撮影'),
          },
        ]}
        onStateChange={({ open }) => setFabOpen(open)}
        onPress={() => {
          if (fabOpen) {
            // do something if the speed dial is open
          }
        }}
      />
    </SafeAreaView>
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
    paddingBottom: 100, // FABのスペース
  },
  headerCard: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  activitySection: {
    marginBottom: theme.spacing.md,
  },
  statsCard: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  filterCard: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  filterChip: {
    marginBottom: theme.spacing.sm,
  },
  selectedFilterChip: {
    backgroundColor: theme.colors.primary,
  },
  itemsCard: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  itemRight: {
    justifyContent: 'center',
  },
  statusChip: {
    height: 28,
  },
  statusText: {
    color: theme.colors.textInverse,
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  progressLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  achievementsCard: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  achievementRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  achievementIcon: {
    fontSize: 20,
    margin: 0,
  },
  achievementChip: {
    backgroundColor: theme.colors.backgroundTertiary,
  },
  exportCard: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  exportDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
});
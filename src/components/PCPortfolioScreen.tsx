import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Button, Chip, ProgressBar, DataTable, Searchbar, Menu } from 'react-native-paper';
import ResponsiveLayout from './ResponsiveLayout';
import ActivityGrassChart from './ActivityGrassChart';
import { theme } from '../constants/theme';
import { PORTFOLIO_ITEMS, ACHIEVEMENTS, ACTIVITY_DATA, LEARNING_STATS } from '../data/dummyData';

const { width } = Dimensions.get('window');

interface PCPortfolioScreenProps {
  onNavigate: (route: string) => void;
  userType: 'student' | 'teacher';
}

export default function PCPortfolioScreen({ onNavigate, userType }: PCPortfolioScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState('すべて');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [menuVisible, setMenuVisible] = useState(false);

  const filters = ['すべて', '完成', '作成中', '下書き', '提出済み'];
  const sortOptions = [
    { value: 'date', label: '更新日順' },
    { value: 'title', label: 'タイトル順' },
    { value: 'progress', label: '進捗順' },
    { value: 'category', label: 'カテゴリ順' },
  ];

  const getFilteredAndSortedItems = () => {
    let items = PORTFOLIO_ITEMS;

    // フィルター適用
    if (selectedFilter !== 'すべて') {
      items = items.filter(item => item.status === selectedFilter);
    }

    // 検索適用
    if (searchQuery) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // ソート適用
    items.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'progress':
          return b.progress - a.progress;
        case 'category':
          return a.category.localeCompare(b.category);
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return items;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '完成': return theme.colors.success;
      case '作成中': return theme.colors.warning;
      case '下書き': return theme.colors.disabled;
      case '提出済み': return theme.colors.info;
      default: return theme.colors.primary;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'report': return '📄';
      case 'presentation': return '📊';
      case 'essay': return '✍️';
      case 'project': return '🚀';
      case 'video': return '🎥';
      default: return '📁';
    }
  };

  return (
    <ResponsiveLayout
      title="ポートフォリオ"
      activeRoute="Portfolio"
      onNavigate={onNavigate}
      userType={userType}
    >
      <ScrollView style={styles.container}>
        {/* ヘッダーセクション */}
        <View style={styles.headerSection}>
          <Card style={styles.overviewCard}>
            <Card.Content style={styles.overviewContent}>
              <View style={styles.overviewLeft}>
                <Title style={styles.overviewTitle}>ポートフォリオ概要</Title>
                <View style={styles.statsRow}>
                  <View style={styles.statBox}>
                    <Title style={styles.statNumber}>{PORTFOLIO_ITEMS.length}</Title>
                    <Paragraph style={styles.statLabel}>総作品数</Paragraph>
                  </View>
                  <View style={styles.statBox}>
                    <Title style={styles.statNumber}>{LEARNING_STATS.completedProjects}</Title>
                    <Paragraph style={styles.statLabel}>完成作品</Paragraph>
                  </View>
                  <View style={styles.statBox}>
                    <Title style={styles.statNumber}>{PORTFOLIO_ITEMS.filter(item => item.status === '作成中').length}</Title>
                    <Paragraph style={styles.statLabel}>作成中</Paragraph>
                  </View>
                  <View style={styles.statBox}>
                    <Title style={styles.statNumber}>{Math.round(PORTFOLIO_ITEMS.filter(item => item.progress === 1).length / PORTFOLIO_ITEMS.length * 100)}%</Title>
                    <Paragraph style={styles.statLabel}>完成率</Paragraph>
                  </View>
                </View>
              </View>
              <View style={styles.overviewActions}>
                <Button 
                  mode="contained" 
                  icon="plus"
                  style={styles.createButton}
                  onPress={() => console.log('新規作成')}
                >
                  新しい作品を作成
                </Button>
                <Button 
                  mode="outlined" 
                  icon="download"
                  style={styles.exportButton}
                  onPress={() => console.log('エクスポート')}
                >
                  PDF出力
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* メインコンテンツ - 2カラムレイアウト */}
        <View style={styles.mainContent}>
          {/* 左カラム - 作品リスト */}
          <View style={styles.leftColumn}>
            {/* 検索・フィルターセクション */}
            <Card style={styles.controlsCard}>
              <Card.Content>
                <View style={styles.controlsRow}>
                  <View style={styles.searchSection}>
                    <Searchbar
                      placeholder="作品を検索..."
                      onChangeText={setSearchQuery}
                      value={searchQuery}
                      style={styles.searchBar}
                    />
                  </View>
                  <View style={styles.filterSection}>
                    <Menu
                      visible={menuVisible}
                      onDismiss={() => setMenuVisible(false)}
                      anchor={
                        <Button 
                          mode="outlined" 
                          onPress={() => setMenuVisible(true)}
                          icon="sort"
                        >
                          {sortOptions.find(opt => opt.value === sortBy)?.label}
                        </Button>
                      }
                    >
                      {sortOptions.map((option) => (
                        <Menu.Item
                          key={option.value}
                          onPress={() => {
                            setSortBy(option.value);
                            setMenuVisible(false);
                          }}
                          title={option.label}
                        />
                      ))}
                    </Menu>
                  </View>
                </View>
                <View style={styles.filtersRow}>
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

            {/* 作品テーブル */}
            <Card style={styles.tableCard}>
              <Card.Content>
                <Title style={styles.cardTitle}>作品一覧 ({getFilteredAndSortedItems().length}件)</Title>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title style={styles.typeColumn}>種類</DataTable.Title>
                    <DataTable.Title style={styles.titleColumn}>タイトル</DataTable.Title>
                    <DataTable.Title style={styles.categoryColumn}>カテゴリ</DataTable.Title>
                    <DataTable.Title style={styles.statusColumn}>ステータス</DataTable.Title>
                    <DataTable.Title style={styles.progressColumn}>進捗</DataTable.Title>
                    <DataTable.Title style={styles.dateColumn}>更新日</DataTable.Title>
                    <DataTable.Title style={styles.actionsColumn}>アクション</DataTable.Title>
                  </DataTable.Header>

                  {getFilteredAndSortedItems().map((item) => (
                    <DataTable.Row key={item.id} style={styles.tableRow}>
                      <DataTable.Cell style={styles.typeColumn}>
                        <Title style={styles.typeIcon}>{getTypeIcon(item.type)}</Title>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.titleColumn}>
                        <View>
                          <Paragraph style={styles.itemTitle}>{item.title}</Paragraph>
                          <Paragraph style={styles.itemDescription}>{item.description}</Paragraph>
                        </View>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.categoryColumn}>
                        <Chip style={styles.categoryChip}>{item.category}</Chip>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.statusColumn}>
                        <Chip 
                          style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) }]}
                          textStyle={styles.statusText}
                        >
                          {item.status}
                        </Chip>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.progressColumn}>
                        <View style={styles.progressCell}>
                          <Paragraph style={styles.progressText}>
                            {Math.round(item.progress * 100)}%
                          </Paragraph>
                          <ProgressBar 
                            progress={item.progress} 
                            color={theme.colors.primary} 
                            style={styles.progressBar}
                          />
                        </View>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.dateColumn}>
                        <Paragraph style={styles.dateText}>{item.date}</Paragraph>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.actionsColumn}>
                        <Button 
                          mode="text" 
                          compact
                          onPress={() => console.log('編集:', item.id)}
                        >
                          編集
                        </Button>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </Card.Content>
            </Card>
          </View>

          {/* 右カラム - アクティビティ & 成果 */}
          <View style={styles.rightColumn}>
            {/* 学習アクティビティ */}
            <Card style={styles.activityCard}>
              <Card.Content>
                <ActivityGrassChart data={ACTIVITY_DATA} />
              </Card.Content>
            </Card>

            {/* 成果・表彰 */}
            <Card style={styles.achievementsCard}>
              <Card.Content>
                <Title style={styles.cardTitle}>成果・表彰</Title>
                {ACHIEVEMENTS.map((achievement, index) => (
                  <View key={index} style={styles.achievementItem}>
                    <View style={styles.achievementHeader}>
                      <Title style={styles.achievementIcon}>{achievement.icon}</Title>
                      <View style={styles.achievementInfo}>
                        <Paragraph style={styles.achievementTitle}>{achievement.title}</Paragraph>
                        <Paragraph style={styles.achievementDate}>{achievement.date}</Paragraph>
                      </View>
                      <Chip style={styles.achievementChip}>{achievement.type}</Chip>
                    </View>
                  </View>
                ))}
              </Card.Content>
            </Card>

            {/* カテゴリ別統計 */}
            <Card style={styles.categoryStatsCard}>
              <Card.Content>
                <Title style={styles.cardTitle}>カテゴリ別作品数</Title>
                {LEARNING_STATS.topCategories.map((category, index) => {
                  const count = PORTFOLIO_ITEMS.filter(item => 
                    item.category.includes(category.name) || 
                    item.tags?.some(tag => tag.includes(category.name))
                  ).length;
                  return (
                    <View key={index} style={styles.categoryStatItem}>
                      <View style={styles.categoryStatInfo}>
                        <Paragraph style={styles.categoryStatName}>{category.name}</Paragraph>
                        <Paragraph style={styles.categoryStatCount}>{count}件</Paragraph>
                      </View>
                      <ProgressBar 
                        progress={count / PORTFOLIO_ITEMS.length} 
                        color={theme.colors.primary} 
                        style={styles.categoryStatBar}
                      />
                    </View>
                  );
                })}
              </Card.Content>
            </Card>
          </View>
        </View>
      </ScrollView>
    </ResponsiveLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  headerSection: {
    marginBottom: theme.spacing.xl,
  },
  overviewCard: {
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
  },
  overviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.xl,
  },
  overviewLeft: {
    flex: 1,
  },
  overviewTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundTertiary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    minWidth: 100,
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
  overviewActions: {
    gap: theme.spacing.md,
  },
  createButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  exportButton: {
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  mainContent: {
    flexDirection: 'row',
    gap: theme.spacing.xl,
    alignItems: 'flex-start',
  },
  leftColumn: {
    flex: 2,
    gap: theme.spacing.lg,
  },
  rightColumn: {
    flex: 1,
    gap: theme.spacing.lg,
  },
  controlsCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  searchSection: {
    flex: 1,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: theme.colors.backgroundTertiary,
  },
  filterSection: {
    minWidth: 150,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  filterChip: {
    marginBottom: theme.spacing.xs,
  },
  selectedFilterChip: {
    backgroundColor: theme.colors.primary,
  },
  tableCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  typeColumn: {
    flex: 0.5,
  },
  titleColumn: {
    flex: 3,
  },
  categoryColumn: {
    flex: 1.2,
  },
  statusColumn: {
    flex: 1,
  },
  progressColumn: {
    flex: 1,
  },
  dateColumn: {
    flex: 1,
  },
  actionsColumn: {
    flex: 0.8,
  },
  typeIcon: {
    fontSize: 20,
    margin: 0,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  itemDescription: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    lineHeight: 16,
  },
  categoryChip: {
    backgroundColor: theme.colors.backgroundTertiary,
    height: 24,
  },
  statusChip: {
    height: 24,
  },
  statusText: {
    color: theme.colors.textInverse,
    fontSize: 11,
    fontWeight: '500',
  },
  progressCell: {
    alignItems: 'flex-start',
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    width: '100%',
  },
  dateText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  activityCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  achievementsCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  achievementItem: {
    backgroundColor: theme.colors.backgroundTertiary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  achievementIcon: {
    fontSize: 20,
    margin: 0,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  achievementDate: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  achievementChip: {
    backgroundColor: theme.colors.backgroundSecondary,
    height: 24,
  },
  categoryStatsCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  categoryStatItem: {
    marginBottom: theme.spacing.md,
  },
  categoryStatInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  categoryStatName: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  categoryStatCount: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  categoryStatBar: {
    height: 6,
    borderRadius: 3,
  },
});
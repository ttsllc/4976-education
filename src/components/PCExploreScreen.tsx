import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Button, Chip, Searchbar, List, Avatar, ProgressBar } from 'react-native-paper';
import ResponsiveLayout from './ResponsiveLayout';
import { theme } from '../constants/theme';
import { LEARNING_TOPICS, LEARNING_MATERIALS, LEARNING_STATS } from '../data/dummyData';

const { width } = Dimensions.get('window');

interface PCExploreScreenProps {
  onNavigate: (route: string) => void;
  userType: 'student' | 'teacher';
}

export default function PCExploreScreen({ onNavigate, userType }: PCExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [selectedDifficulty, setSelectedDifficulty] = useState('すべて');
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const categories = ['すべて', '社会科学', 'テクノロジー', '地域研究', '生活科学', '科学技術', '芸術・表現'];
  const difficulties = ['すべて', '初級', '中級', '上級'];

  const getFilteredTopics = () => {
    return LEARNING_TOPICS.filter(topic => {
      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           topic.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'すべて' || topic.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'すべて' || topic.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  };

  const getFilteredMaterials = () => {
    if (!selectedTopic) return [];
    return LEARNING_MATERIALS.filter(material => 
      material.category === 'スキル' || 
      material.category === '導入' ||
      Math.random() > 0.5 // ダミーデータのため適当にフィルター
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '初級': return theme.colors.success;
      case '中級': return theme.colors.warning;
      case '上級': return theme.colors.error;
      default: return theme.colors.primary;
    }
  };

  return (
    <ResponsiveLayout
      title="探究学習"
      activeRoute="Explore"
      onNavigate={onNavigate}
      userType={userType}
    >
      <ScrollView style={styles.container}>
        {/* ヘッダーセクション */}
        <View style={styles.headerSection}>
          <Card style={styles.headerCard}>
            <Card.Content style={styles.headerContent}>
              <View style={styles.headerLeft}>
                <Title style={styles.headerTitle}>探究テーマを発見しよう</Title>
                <Paragraph style={styles.headerSubtitle}>
                  あなたの興味に合った探究テーマを見つけて、深い学びを始めましょう
                </Paragraph>
                <View style={styles.quickStats}>
                  <View style={styles.statItem}>
                    <Title style={styles.statNumber}>{LEARNING_TOPICS.length}</Title>
                    <Paragraph style={styles.statLabel}>利用可能テーマ</Paragraph>
                  </View>
                  <View style={styles.statItem}>
                    <Title style={styles.statNumber}>{LEARNING_MATERIALS.length}</Title>
                    <Paragraph style={styles.statLabel}>学習教材</Paragraph>
                  </View>
                  <View style={styles.statItem}>
                    <Title style={styles.statNumber}>{categories.length - 1}</Title>
                    <Paragraph style={styles.statLabel}>カテゴリ</Paragraph>
                  </View>
                </View>
              </View>
              <View style={styles.headerRight}>
                <Avatar.Text 
                  size={80} 
                  label="🔍" 
                  style={styles.searchAvatar}
                  labelStyle={styles.searchAvatarText}
                />
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* メインコンテンツ - 2カラムレイアウト */}
        <View style={styles.mainContent}>
          {/* 左カラム - 検索・フィルター・テーマ一覧 */}
          <View style={styles.leftColumn}>
            {/* 検索・フィルターセクション */}
            <Card style={styles.filtersCard}>
              <Card.Content>
                <Title style={styles.cardTitle}>テーマを探す</Title>
                
                {/* 検索バー */}
                <Searchbar
                  placeholder="テーマを検索..."
                  onChangeText={setSearchQuery}
                  value={searchQuery}
                  style={styles.searchBar}
                />

                {/* カテゴリフィルター */}
                <View style={styles.filterSection}>
                  <Paragraph style={styles.filterLabel}>カテゴリ</Paragraph>
                  <View style={styles.filterChips}>
                    {categories.map((category) => (
                      <Chip
                        key={category}
                        selected={selectedCategory === category}
                        onPress={() => setSelectedCategory(category)}
                        style={[
                          styles.filterChip,
                          selectedCategory === category && styles.selectedFilterChip
                        ]}
                      >
                        {category}
                      </Chip>
                    ))}
                  </View>
                </View>

                {/* 難易度フィルター */}
                <View style={styles.filterSection}>
                  <Paragraph style={styles.filterLabel}>難易度</Paragraph>
                  <View style={styles.filterChips}>
                    {difficulties.map((difficulty) => (
                      <Chip
                        key={difficulty}
                        selected={selectedDifficulty === difficulty}
                        onPress={() => setSelectedDifficulty(difficulty)}
                        style={[
                          styles.filterChip,
                          selectedDifficulty === difficulty && styles.selectedFilterChip
                        ]}
                      >
                        {difficulty}
                      </Chip>
                    ))}
                  </View>
                </View>
              </Card.Content>
            </Card>

            {/* テーマ一覧 */}
            <Card style={styles.topicsCard}>
              <Card.Content>
                <Title style={styles.cardTitle}>
                  探究テーマ一覧 ({getFilteredTopics().length}件)
                </Title>
                <View style={styles.topicsList}>
                  {getFilteredTopics().map((topic) => (
                    <Card 
                      key={topic.id} 
                      style={[
                        styles.topicCard,
                        selectedTopic === topic.id && styles.selectedTopicCard
                      ]}
                      onPress={() => setSelectedTopic(topic.id)}
                    >
                      <Card.Content style={styles.topicContent}>
                        <View style={styles.topicHeader}>
                          <Title style={styles.topicTitle}>{topic.title}</Title>
                          <View style={styles.topicMeta}>
                            <Chip 
                              style={[
                                styles.difficultyChip,
                                { backgroundColor: getDifficultyColor(topic.difficulty) + '20' }
                              ]}
                              textStyle={{ color: getDifficultyColor(topic.difficulty) }}
                            >
                              {topic.difficulty}
                            </Chip>
                            <Chip style={styles.categoryChip}>{topic.category}</Chip>
                          </View>
                        </View>
                        <Paragraph style={styles.topicDescription}>{topic.description}</Paragraph>
                        <View style={styles.topicDetails}>
                          <View style={styles.topicInfo}>
                            <Paragraph style={styles.infoLabel}>予想期間:</Paragraph>
                            <Paragraph style={styles.infoValue}>{topic.estimatedTime}</Paragraph>
                          </View>
                          <View style={styles.topicTags}>
                            {topic.tags.slice(0, 3).map((tag, index) => (
                              <Chip key={index} style={styles.tagChip}>{tag}</Chip>
                            ))}
                          </View>
                        </View>
                        <Button 
                          mode="contained" 
                          style={styles.startButton}
                          onPress={() => console.log('テーマ開始:', topic.id)}
                        >
                          このテーマを始める
                        </Button>
                      </Card.Content>
                    </Card>
                  ))}
                </View>
              </Card.Content>
            </Card>
          </View>

          {/* 右カラム - 詳細情報・推奨教材 */}
          <View style={styles.rightColumn}>
            {selectedTopic ? (
              // テーマが選択されている場合の詳細表示
              <>
                {/* テーマ詳細 */}
                <Card style={styles.detailCard}>
                  <Card.Content>
                    {(() => {
                      const topic = LEARNING_TOPICS.find(t => t.id === selectedTopic);
                      if (!topic) return null;
                      
                      return (
                        <>
                          <Title style={styles.cardTitle}>テーマ詳細</Title>
                          <Title style={styles.detailTitle}>{topic.title}</Title>
                          <Paragraph style={styles.detailDescription}>{topic.description}</Paragraph>
                          
                          <View style={styles.detailSection}>
                            <Paragraph style={styles.sectionTitle}>学習目標</Paragraph>
                            {topic.objectives.map((objective, index) => (
                              <View key={index} style={styles.objectiveItem}>
                                <Paragraph style={styles.objectiveBullet}>•</Paragraph>
                                <Paragraph style={styles.objectiveText}>{objective}</Paragraph>
                              </View>
                            ))}
                          </View>

                          <View style={styles.detailSection}>
                            <Paragraph style={styles.sectionTitle}>必要な教材</Paragraph>
                            {topic.materials.map((material, index) => (
                              <View key={index} style={styles.materialItem}>
                                <Paragraph style={styles.materialBullet}>📚</Paragraph>
                                <Paragraph style={styles.materialText}>{material}</Paragraph>
                              </View>
                            ))}
                          </View>

                          <View style={styles.actionSection}>
                            <Button 
                              mode="contained" 
                              style={styles.primaryAction}
                              onPress={() => console.log('テーマ開始:', selectedTopic)}
                            >
                              学習を開始する
                            </Button>
                            <Button 
                              mode="outlined" 
                              style={styles.secondaryAction}
                              onPress={() => onNavigate('AIAssistant')}
                            >
                              AI支援を受ける
                            </Button>
                          </View>
                        </>
                      );
                    })()}
                  </Card.Content>
                </Card>

                {/* 関連教材 */}
                <Card style={styles.materialsCard}>
                  <Card.Content>
                    <Title style={styles.cardTitle}>推奨学習教材</Title>
                    {getFilteredMaterials().map((material) => (
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
                          <View style={styles.materialRight}>
                            <Chip style={styles.materialDifficultyChip}>{material.difficulty}</Chip>
                            <ProgressBar 
                              progress={material.rating / 5} 
                              color={theme.colors.warning} 
                              style={styles.ratingBar}
                            />
                          </View>
                        )}
                        onPress={() => console.log('教材選択:', material.id)}
                        style={styles.materialListItem}
                      />
                    ))}
                  </Card.Content>
                </Card>
              </>
            ) : (
              // テーマが選択されていない場合の初期表示
              <>
                {/* 人気テーマ */}
                <Card style={styles.popularCard}>
                  <Card.Content>
                    <Title style={styles.cardTitle}>人気のテーマ</Title>
                    {LEARNING_TOPICS.slice(0, 3).map((topic, index) => (
                      <View key={topic.id} style={styles.popularItem}>
                        <View style={styles.popularRank}>
                          <Title style={styles.rankNumber}>{index + 1}</Title>
                        </View>
                        <View style={styles.popularContent}>
                          <Paragraph style={styles.popularTitle}>{topic.title}</Paragraph>
                          <Paragraph style={styles.popularCategory}>{topic.category}</Paragraph>
                        </View>
                        <Chip 
                          style={[
                            styles.popularDifficulty,
                            { backgroundColor: getDifficultyColor(topic.difficulty) + '20' }
                          ]}
                          textStyle={{ color: getDifficultyColor(topic.difficulty) }}
                        >
                          {topic.difficulty}
                        </Chip>
                      </View>
                    ))}
                  </Card.Content>
                </Card>

                {/* カテゴリ統計 */}
                <Card style={styles.categoryStatsCard}>
                  <Card.Content>
                    <Title style={styles.cardTitle}>カテゴリ別テーマ数</Title>
                    {categories.slice(1).map((category) => {
                      const count = LEARNING_TOPICS.filter(t => t.category === category).length;
                      const percentage = count / LEARNING_TOPICS.length;
                      
                      return (
                        <View key={category} style={styles.categoryStatItem}>
                          <View style={styles.categoryStatInfo}>
                            <Paragraph style={styles.categoryStatName}>{category}</Paragraph>
                            <Paragraph style={styles.categoryStatCount}>{count}件</Paragraph>
                          </View>
                          <ProgressBar 
                            progress={percentage} 
                            color={theme.colors.primary} 
                            style={styles.categoryStatBar}
                          />
                        </View>
                      );
                    })}
                  </Card.Content>
                </Card>

                {/* 学習ヒント */}
                <Card style={styles.tipsCard}>
                  <Card.Content>
                    <Title style={styles.cardTitle}>💡 探究学習のコツ</Title>
                    <View style={styles.tipsList}>
                      <View style={styles.tipItem}>
                        <Paragraph style={styles.tipIcon}>🎯</Paragraph>
                        <Paragraph style={styles.tipText}>興味のあるテーマから始めましょう</Paragraph>
                      </View>
                      <View style={styles.tipItem}>
                        <Paragraph style={styles.tipIcon}>❓</Paragraph>
                        <Paragraph style={styles.tipText}>「なぜ？」の疑問を大切にする</Paragraph>
                      </View>
                      <View style={styles.tipItem}>
                        <Paragraph style={styles.tipIcon}>📚</Paragraph>
                        <Paragraph style={styles.tipText}>複数の資料から情報を収集する</Paragraph>
                      </View>
                      <View style={styles.tipItem}>
                        <Paragraph style={styles.tipIcon}>🤝</Paragraph>
                        <Paragraph style={styles.tipText}>他の人の意見も聞いてみる</Paragraph>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              </>
            )}
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
  headerCard: {
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  headerLeft: {
    flex: 1,
    marginRight: theme.spacing.xl,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  headerSubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    lineHeight: 24,
  },
  quickStats: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundTertiary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    minWidth: 80,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    margin: 0,
  },
  statLabel: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  headerRight: {
    alignItems: 'center',
  },
  searchAvatar: {
    backgroundColor: theme.colors.primary + '20',
  },
  searchAvatarText: {
    fontSize: 32,
  },
  mainContent: {
    flexDirection: 'row',
    gap: theme.spacing.xl,
    alignItems: 'flex-start',
  },
  leftColumn: {
    flex: 1.5,
    gap: theme.spacing.lg,
  },
  rightColumn: {
    flex: 1,
    gap: theme.spacing.lg,
  },
  filtersCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: theme.colors.backgroundTertiary,
    marginBottom: theme.spacing.lg,
  },
  filterSection: {
    marginBottom: theme.spacing.lg,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  filterChips: {
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
  topicsCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  topicsList: {
    gap: theme.spacing.md,
  },
  topicCard: {
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    ...theme.shadows.sm,
  },
  selectedTopicCard: {
    borderColor: theme.colors.primary,
  },
  topicContent: {
    padding: theme.spacing.md,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  topicMeta: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  difficultyChip: {
    height: 24,
  },
  categoryChip: {
    backgroundColor: theme.colors.backgroundTertiary,
    height: 24,
  },
  topicDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  topicDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  topicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  infoLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  infoValue: {
    fontSize: 12,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  topicTags: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  tagChip: {
    backgroundColor: theme.colors.backgroundSecondary,
    height: 20,
  },
  startButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
  },
  detailCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  detailDescription: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
    lineHeight: 24,
  },
  detailSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  objectiveBullet: {
    fontSize: 14,
    color: theme.colors.primary,
    marginRight: theme.spacing.sm,
    marginTop: 2,
  },
  objectiveText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  materialBullet: {
    fontSize: 14,
    marginRight: theme.spacing.sm,
    marginTop: 2,
  },
  materialText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  actionSection: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  primaryAction: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    flex: 1,
  },
  secondaryAction: {
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    flex: 1,
  },
  materialsCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  materialListItem: {
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
  materialRight: {
    alignItems: 'flex-end',
    gap: theme.spacing.xs,
  },
  materialDifficultyChip: {
    backgroundColor: theme.colors.backgroundSecondary,
    height: 20,
  },
  ratingBar: {
    height: 4,
    borderRadius: 2,
    width: 60,
  },
  popularCard: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundTertiary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  popularRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textInverse,
    margin: 0,
  },
  popularContent: {
    flex: 1,
  },
  popularTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  popularCategory: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  popularDifficulty: {
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
  tipsCard: {
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primaryLight + '10',
    ...theme.shadows.sm,
  },
  tipsList: {
    gap: theme.spacing.md,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipIcon: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
    marginTop: 2,
  },
  tipText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
});
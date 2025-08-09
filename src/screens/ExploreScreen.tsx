import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar, List, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import PCExploreScreen from '../components/PCExploreScreen';
import { shouldUsePCLayout } from '../utils/responsive';

const EXPLORE_TOPICS = [
  {
    id: 1,
    title: '環境問題と持続可能な社会',
    category: '社会科学',
    description: '地球環境の現状と未来への取り組みを探究',
    difficulty: '中級',
  },
  {
    id: 2,
    title: 'AI と人間社会の共生',
    category: '情報科学',
    description: '人工知能が社会に与える影響を考察',
    difficulty: '上級',
  },
  {
    id: 3,
    title: '地域活性化と観光',
    category: '地域研究',
    description: '地方創生のための観光戦略を研究',
    difficulty: '初級',
  },
  {
    id: 4,
    title: '食文化と健康',
    category: '生活科学',
    description: '日本の食文化と健康との関係を探る',
    difficulty: '中級',
  },
];

interface ExploreScreenProps {
  onNavigate?: (route: string) => void;
  userType?: 'student' | 'teacher';
}

export default function ExploreScreen({ onNavigate, userType = 'student' }: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTopics, setFilteredTopics] = useState(EXPLORE_TOPICS);
  const usePCLayout = shouldUsePCLayout();

  // PC専用レイアウトを使用
  if (usePCLayout && onNavigate) {
    return <PCExploreScreen onNavigate={onNavigate} userType={userType} />;
  }

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = EXPLORE_TOPICS.filter(topic => 
      topic.title.toLowerCase().includes(query.toLowerCase()) ||
      topic.category.toLowerCase().includes(query.toLowerCase()) ||
      topic.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTopics(filtered);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '初級': return '#4CAF50';
      case '中級': return '#FF9800';
      case '上級': return '#F44336';
      default: return '#2196F3';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title style={styles.title}>探究学習テーマ</Title>
            <Paragraph style={styles.description}>
              あなたの興味に合った探究テーマを見つけましょう
            </Paragraph>
          </Card.Content>
        </Card>

        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="テーマを検索..."
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
          />
        </View>

        <Card style={styles.guideCard}>
          <Card.Content>
            <Title style={styles.guideTitle}>探究学習ガイド</Title>
            <Paragraph>1. テーマを選択</Paragraph>
            <Paragraph>2. 問いを立てる</Paragraph>
            <Paragraph>3. 情報収集・調査</Paragraph>
            <Paragraph>4. 分析・考察</Paragraph>
            <Paragraph>5. 発表・共有</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined">詳細ガイド</Button>
          </Card.Actions>
        </Card>

        {filteredTopics.map((topic) => (
          <Card key={topic.id} style={styles.topicCard}>
            <Card.Content>
              <View style={styles.topicHeader}>
                <Title style={styles.topicTitle}>{topic.title}</Title>
                <Chip 
                  style={[styles.difficultyChip, { backgroundColor: getDifficultyColor(topic.difficulty) }]}
                  textStyle={styles.difficultyText}
                >
                  {topic.difficulty}
                </Chip>
              </View>
              <Chip icon="tag" style={styles.categoryChip}>
                {topic.category}
              </Chip>
              <Paragraph style={styles.topicDescription}>
                {topic.description}
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button mode="outlined" onPress={() => console.log('詳細表示', topic.id)}>
                詳細
              </Button>
              <Button mode="contained" onPress={() => console.log('テーマ選択', topic.id)}>
                このテーマで探究
              </Button>
            </Card.Actions>
          </Card>
        ))}

        <Card style={styles.customCard}>
          <Card.Content>
            <Title style={styles.customTitle}>オリジナルテーマ</Title>
            <Paragraph>
              自分だけの探究テーマを作成することもできます
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" style={styles.customButton}>
              テーマを作成
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  headerCard: {
    marginBottom: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    elevation: 4,
  },
  guideCard: {
    marginBottom: 16,
    elevation: 4,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 12,
  },
  topicCard: {
    marginBottom: 16,
    elevation: 4,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  difficultyChip: {
    height: 24,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  topicDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  customCard: {
    marginBottom: 16,
    elevation: 4,
  },
  customTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  customButton: {
    backgroundColor: '#4CAF50',
  },
});
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Chip, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const AI_FEATURES = [
  {
    id: 1,
    title: '志望理由書添削',
    description: 'AIが志望理由書の構成や内容をチェックし、改善提案を行います',
    icon: 'school',
    color: '#2196F3',
  },
  {
    id: 2,
    title: '小論文フィードバック',
    description: '論理構成、論拠の妥当性、表現力を総合的に評価します',
    icon: 'text',
    color: '#9C27B0',
  },
  {
    id: 3,
    title: '探究テーマ相談',
    description: 'あなたの興味や関心に基づいて、適切なテーマを提案します',
    icon: 'lightbulb',
    color: '#FF9800',
  },
  {
    id: 4,
    title: '学習アドバイス',
    description: '個別の学習進捗に応じて、次のステップをアドバイスします',
    icon: 'account-supervisor',
    color: '#4CAF50',
  },
];

export default function AIAssistantScreen() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFeatureSelect = (featureId: number) => {
    setSelectedFeature(featureId);
    setInputText('');
  };

  const handleAIAnalysis = async () => {
    if (!inputText.trim()) {
      Alert.alert('入力エラー', 'テキストを入力してください');
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      const feature = AI_FEATURES.find(f => f.id === selectedFeature);
      Alert.alert(
        'AI分析結果',
        `${feature?.title}の分析が完了しました。\n\n詳細な分析結果とアドバイスが表示されます。`,
        [
          { text: 'OK', onPress: () => {} }
        ]
      );
    }, 3000);
  };

  const getSelectedFeature = () => {
    return AI_FEATURES.find(f => f.id === selectedFeature);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title style={styles.title}>AI学習支援</Title>
            <Paragraph style={styles.description}>
              最新のAI技術を活用して、あなたの学習をサポートします
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.featuresCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>AI機能一覧</Title>
            {AI_FEATURES.map((feature) => (
              <View key={feature.id}>
                <Card 
                  style={[
                    styles.featureItem,
                    selectedFeature === feature.id && styles.selectedFeature
                  ]}
                  onPress={() => handleFeatureSelect(feature.id)}
                >
                  <Card.Content style={styles.featureContent}>
                    <View style={styles.featureHeader}>
                      <Title style={[styles.featureTitle, { color: feature.color }]}>
                        {feature.title}
                      </Title>
                      {selectedFeature === feature.id && (
                        <Chip icon="check" style={[styles.selectedChip, { backgroundColor: feature.color }]}>
                          選択中
                        </Chip>
                      )}
                    </View>
                    <Paragraph style={styles.featureDescription}>
                      {feature.description}
                    </Paragraph>
                  </Card.Content>
                </Card>
                {feature.id < AI_FEATURES.length && <Divider style={styles.divider} />}
              </View>
            ))}
          </Card.Content>
        </Card>

        {selectedFeature && (
          <Card style={styles.inputCard}>
            <Card.Content>
              <Title style={styles.sectionTitle}>
                {getSelectedFeature()?.title}
              </Title>
              <TextInput
                label="テキストを入力してください"
                value={inputText}
                onChangeText={setInputText}
                multiline
                numberOfLines={6}
                mode="outlined"
                style={styles.textInput}
                placeholder={`${getSelectedFeature()?.title}のためのテキストを入力してください...`}
              />
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="outlined" 
                onPress={() => setSelectedFeature(null)}
                disabled={isProcessing}
              >
                キャンセル
              </Button>
              <Button 
                mode="contained" 
                onPress={handleAIAnalysis}
                loading={isProcessing}
                disabled={isProcessing}
                style={[styles.analyzeButton, { backgroundColor: getSelectedFeature()?.color }]}
              >
                {isProcessing ? 'AI分析中...' : 'AI分析開始'}
              </Button>
            </Card.Actions>
          </Card>
        )}

        <Card style={styles.tipsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>AI活用のコツ</Title>
            <View style={styles.tipsList}>
              <Paragraph style={styles.tip}>• 具体的で詳細な文章を入力する</Paragraph>
              <Paragraph style={styles.tip}>• 複数回に分けて段階的に改善する</Paragraph>
              <Paragraph style={styles.tip}>• AIの提案を参考に自分なりに考える</Paragraph>
              <Paragraph style={styles.tip}>• 定期的に利用して継続的に向上させる</Paragraph>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.historyCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>利用履歴</Title>
            <Paragraph style={styles.historyText}>
              今週の利用回数: 5回
            </Paragraph>
            <Paragraph style={styles.historyText}>
              最新の利用: 志望理由書添削 (昨日)
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined">
              詳細履歴を見る
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
  featuresCard: {
    marginBottom: 16,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  featureItem: {
    marginBottom: 8,
    elevation: 2,
  },
  selectedFeature: {
    elevation: 6,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  featureContent: {
    paddingVertical: 8,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  selectedChip: {
    height: 28,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  divider: {
    marginVertical: 8,
  },
  inputCard: {
    marginBottom: 16,
    elevation: 4,
  },
  textInput: {
    marginBottom: 16,
  },
  analyzeButton: {
    marginLeft: 8,
  },
  tipsCard: {
    marginBottom: 16,
    elevation: 4,
  },
  tipsList: {
    paddingLeft: 8,
  },
  tip: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  historyCard: {
    marginBottom: 16,
    elevation: 4,
  },
  historyText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  List, 
  Switch, 
  Avatar, 
  Divider,
  Dialog,
  Portal,
  TextInput 
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ProfileScreenProps {
  onLogout?: () => void;
  userType?: 'student' | 'teacher';
}

export default function ProfileScreen({ onLogout, userType = 'student' }: ProfileScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(true);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [userName, setUserName] = useState(userType === 'teacher' ? '田中先生' : '山田太郎');
  const [userSchool, setUserSchool] = useState('○○高等学校');
  const [userGrade, setUserGrade] = useState(userType === 'teacher' ? '数学科教師' : '2年生');

  const handleLogout = () => {
    Alert.alert(
      'ログアウト',
      'ログアウトしますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: 'ログアウト', style: 'destructive', onPress: () => onLogout?.() }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'アカウント削除',
      'アカウントを削除すると、すべてのデータが失われます。この操作は取り消せません。',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: '削除', style: 'destructive', onPress: () => console.log('アカウント削除実行') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.profileCard}>
          <Card.Content>
            <View style={styles.profileHeader}>
              <Avatar.Text size={80} label="山田" style={styles.avatar} />
              <View style={styles.profileInfo}>
                <Title style={styles.userName}>{userName}</Title>
                <Paragraph style={styles.userDetails}>{userSchool}</Paragraph>
                <Paragraph style={styles.userDetails}>{userGrade}</Paragraph>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined" onPress={() => setEditDialogVisible(true)}>
              プロフィール編集
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.statsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>学習統計</Title>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Title style={styles.statNumber}>32</Title>
                <Paragraph style={styles.statLabel}>ログイン日数</Paragraph>
              </View>
              <View style={styles.statItem}>
                <Title style={styles.statNumber}>12</Title>
                <Paragraph style={styles.statLabel}>作成作品</Paragraph>
              </View>
              <View style={styles.statItem}>
                <Title style={styles.statNumber}>8</Title>
                <Paragraph style={styles.statLabel}>AI利用回数</Paragraph>
              </View>
              <View style={styles.statItem}>
                <Title style={styles.statNumber}>95%</Title>
                <Paragraph style={styles.statLabel}>課題完了率</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>設定</Title>
            
            <List.Item
              title="通知"
              description="プッシュ通知の受信"
              left={(props) => <List.Icon {...props} icon="bell" />}
              right={() => (
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                />
              )}
            />
            <Divider />

            <List.Item
              title="ダークモード"
              description="画面の表示テーマ"
              left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => (
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                />
              )}
            />
            <Divider />

            <List.Item
              title="AI提案機能"
              description="学習アドバイスの自動提案"
              left={(props) => <List.Icon {...props} icon="robot" />}
              right={() => (
                <Switch
                  value={aiSuggestionsEnabled}
                  onValueChange={setAiSuggestionsEnabled}
                />
              )}
            />
            <Divider />

            <List.Item
              title="プライバシー設定"
              description="データ利用に関する設定"
              left={(props) => <List.Icon {...props} icon="shield-account" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log('プライバシー設定')}
            />
            <Divider />

            <List.Item
              title="データエクスポート"
              description="学習データのダウンロード"
              left={(props) => <List.Icon {...props} icon="download" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log('データエクスポート')}
            />
          </Card.Content>
        </Card>

        <Card style={styles.supportCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>サポート・情報</Title>
            
            <List.Item
              title="ヘルプ・FAQ"
              description="よくある質問と使い方"
              left={(props) => <List.Icon {...props} icon="help-circle" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log('ヘルプ')}
            />
            <Divider />

            <List.Item
              title="お問い合わせ"
              description="サポートチームに連絡"
              left={(props) => <List.Icon {...props} icon="email" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log('お問い合わせ')}
            />
            <Divider />

            <List.Item
              title="利用規約"
              description="サービス利用規約"
              left={(props) => <List.Icon {...props} icon="file-document" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log('利用規約')}
            />
            <Divider />

            <List.Item
              title="プライバシーポリシー"
              description="個人情報の取り扱い"
              left={(props) => <List.Icon {...props} icon="shield-check" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log('プライバシーポリシー')}
            />
            <Divider />

            <List.Item
              title="アプリについて"
              description="バージョン情報・開発者情報"
              left={(props) => <List.Icon {...props} icon="information" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log('アプリについて')}
            />
          </Card.Content>
        </Card>

        <Card style={styles.accountCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>アカウント管理</Title>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined" onPress={handleLogout}>
              ログアウト
            </Button>
            <Button mode="outlined" onPress={handleDeleteAccount} textColor="#F44336">
              アカウント削除
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.versionCard}>
          <Card.Content>
            <Paragraph style={styles.versionText}>
              産経エデュケーション v1.0.0
            </Paragraph>
            <Paragraph style={styles.versionText}>
              © 2025 Sankei Education
            </Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>

      <Portal>
        <Dialog visible={editDialogVisible} onDismiss={() => setEditDialogVisible(false)}>
          <Dialog.Title>プロフィール編集</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="名前"
              value={userName}
              onChangeText={setUserName}
              mode="outlined"
              style={styles.editInput}
            />
            <TextInput
              label="学校名"
              value={userSchool}
              onChangeText={setUserSchool}
              mode="outlined"
              style={styles.editInput}
            />
            <TextInput
              label="学年"
              value={userGrade}
              onChangeText={setUserGrade}
              mode="outlined"
              style={styles.editInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditDialogVisible(false)}>キャンセル</Button>
            <Button onPress={() => setEditDialogVisible(false)}>保存</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  profileCard: {
    marginBottom: 16,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#2196F3',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userDetails: {
    fontSize: 16,
    color: '#666',
  },
  statsCard: {
    marginBottom: 16,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    minWidth: '45%',
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  settingsCard: {
    marginBottom: 16,
    elevation: 4,
  },
  supportCard: {
    marginBottom: 16,
    elevation: 4,
  },
  accountCard: {
    marginBottom: 16,
    elevation: 4,
  },
  versionCard: {
    marginBottom: 16,
    elevation: 4,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  editInput: {
    marginBottom: 16,
  },
});
import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  TextInput,
  Snackbar,
  ActivityIndicator
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LoginScreenProps {
  onLogin: (userType: 'student' | 'teacher') => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleLogin = async (userType: 'student' | 'teacher') => {
    if (!email.trim() || !password.trim()) {
      setSnackbarMessage('メールアドレスとパスワードを入力してください');
      setSnackbarVisible(true);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(userType);
    }, 1500);
  };

  const handleDemoLogin = (userType: 'student' | 'teacher') => {
    // Demo login without credentials
    onLogin(userType);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.logoCard}>
          <Card.Content style={styles.logoContent}>
            <View style={styles.logoContainer}>
              <View style={styles.logoPlaceholder}>
                <Title style={styles.logoText}>産経</Title>
                <Title style={styles.logoSubtext}>教育</Title>
              </View>
            </View>
            <Title style={styles.appTitle}>産経エデュケーション</Title>
            <Paragraph style={styles.appSubtitle}>探究学習支援アプリ</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.loginCard}>
          <Card.Content>
            <Title style={styles.loginTitle}>ログイン</Title>
            
            <TextInput
              label="メールアドレス"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              left={<TextInput.Icon icon="email" />}
            />

            <TextInput
              label="パスワード"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              left={<TextInput.Icon icon="lock" />}
            />

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={() => handleLogin('student')}
                disabled={isLoading}
                style={[styles.loginButton, styles.studentButton]}
                loading={isLoading}
              >
                生徒としてログイン
              </Button>

              <Button
                mode="contained"
                onPress={() => handleLogin('teacher')}
                disabled={isLoading}
                style={[styles.loginButton, styles.teacherButton]}
                loading={isLoading}
              >
                教師としてログイン
              </Button>
            </View>

            <View style={styles.demoContainer}>
              <Paragraph style={styles.demoText}>デモ体験：</Paragraph>
              <View style={styles.demoButtonContainer}>
                <Button
                  mode="outlined"
                  onPress={() => handleDemoLogin('student')}
                  disabled={isLoading}
                  style={styles.demoButton}
                >
                  生徒デモ
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => handleDemoLogin('teacher')}
                  disabled={isLoading}
                  style={styles.demoButton}
                >
                  教師デモ
                </Button>
              </View>
            </View>

            <View style={styles.linkContainer}>
              <Button mode="text" onPress={() => console.log('パスワード忘れ')}>
                パスワードを忘れた場合
              </Button>
              <Button mode="text" onPress={() => console.log('新規登録')}>
                新規アカウント作成
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.infoCard}>
          <Card.Content>
            <Paragraph style={styles.infoText}>
              探究学習必修化に対応した、教師・生徒の学習を総合的にサポートするアプリです。
              AI を活用した志望理由書添削や、ポートフォリオ管理機能を提供します。
            </Paragraph>
          </Card.Content>
        </Card>

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#2196F3" />
            <Paragraph style={styles.loadingText}>ログイン中...</Paragraph>
          </View>
        )}
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoCard: {
    marginBottom: 20,
    elevation: 4,
  },
  logoContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#2196F3',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoSubtext: {
    color: '#fff',
    fontSize: 16,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  loginCard: {
    marginBottom: 20,
    elevation: 4,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  loginButton: {
    marginBottom: 12,
    paddingVertical: 4,
  },
  studentButton: {
    backgroundColor: '#2196F3',
  },
  teacherButton: {
    backgroundColor: '#4CAF50',
  },
  demoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  demoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  demoButtonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  demoButton: {
    minWidth: 100,
  },
  linkContainer: {
    alignItems: 'center',
  },
  infoCard: {
    elevation: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
});
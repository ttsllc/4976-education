import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
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
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../constants/theme';

const { width, height } = Dimensions.get('window');

interface PCLoginScreenProps {
  onLogin: (userType: 'student' | 'teacher') => void;
}

export default function PCLoginScreen({ onLogin }: PCLoginScreenProps) {
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
    <LinearGradient
      colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        {/* メインコンテンツ - 2カラムレイアウト */}
        <View style={styles.mainContent}>
          {/* 左カラム - ブランディング・紹介 */}
          <View style={styles.leftColumn}>
            <ScrollView contentContainerStyle={styles.leftScrollContent}>
              {/* ロゴセクション */}
              <View style={styles.brandingSection}>
                <View style={styles.logoContainer}>
                  <View style={styles.logoCircle}>
                    <Title style={styles.logoText}>4976</Title>
                  </View>
                </View>
                <Title style={styles.appTitle}>4976エデュケーション</Title>
                <Title style={styles.appSlogan}>探究学習で未来を創造する</Title>
                <Paragraph style={styles.appDescription}>
                  AI支援による個別最適化学習で、あなたの可能性を最大限に引き出します。
                  教師と生徒が共に成長できる、新しい学習プラットフォームです。
                </Paragraph>
              </View>

              {/* 特徴セクション */}
              <View style={styles.featuresSection}>
                <Title style={styles.featuresTitle}>主な特徴</Title>
                <View style={styles.featuresList}>
                  <View style={styles.featureItem}>
                    <View style={styles.featureIcon}>
                      <Title style={styles.featureIconText}>🎯</Title>
                    </View>
                    <View style={styles.featureContent}>
                      <Title style={styles.featureItemTitle}>AI支援による個別最適化</Title>
                      <Paragraph style={styles.featureDescription}>
                        一人ひとりの学習進度に合わせたパーソナライズされた学習体験
                      </Paragraph>
                    </View>
                  </View>
                  
                  <View style={styles.featureItem}>
                    <View style={styles.featureIcon}>
                      <Title style={styles.featureIconText}>📊</Title>
                    </View>
                    <View style={styles.featureContent}>
                      <Title style={styles.featureItemTitle}>学習進捗の可視化</Title>
                      <Paragraph style={styles.featureDescription}>
                        GitHub風のアクティビティチャートで学習の継続性を確認
                      </Paragraph>
                    </View>
                  </View>
                  
                  <View style={styles.featureItem}>
                    <View style={styles.featureIcon}>
                      <Title style={styles.featureIconText}>🤝</Title>
                    </View>
                    <View style={styles.featureContent}>
                      <Title style={styles.featureItemTitle}>協働学習・コミュニティ</Title>
                      <Paragraph style={styles.featureDescription}>
                        生徒同士、教師と生徒が協力して学習を深められる環境
                      </Paragraph>
                    </View>
                  </View>
                  
                  <View style={styles.featureItem}>
                    <View style={styles.featureIcon}>
                      <Title style={styles.featureIconText}>✍️</Title>
                    </View>
                    <View style={styles.featureContent}>
                      <Title style={styles.featureItemTitle}>ポートフォリオ管理</Title>
                      <Paragraph style={styles.featureDescription}>
                        学習成果を体系的に管理し、志望理由書作成まで支援
                      </Paragraph>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* 右カラム - ログインフォーム */}
          <View style={styles.rightColumn}>
            <View style={styles.loginContainer}>
              <Card style={styles.loginCard}>
                <Card.Content style={styles.loginContent}>
                  <Title style={styles.loginTitle}>ログイン</Title>
                  <Paragraph style={styles.loginSubtitle}>
                    アカウントにログインして学習を始めましょう
                  </Paragraph>
                  
                  <TextInput
                    label="メールアドレス"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    left={<TextInput.Icon icon="email" />}
                    outlineColor={theme.colors.border}
                    activeOutlineColor={theme.colors.primary}
                  />

                  <TextInput
                    label="パスワード"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                    left={<TextInput.Icon icon="lock" />}
                    outlineColor={theme.colors.border}
                    activeOutlineColor={theme.colors.primary}
                  />

                  {/* ログインボタン */}
                  <View style={styles.loginButtons}>
                    <Button
                      mode="contained"
                      onPress={() => handleLogin('student')}
                      disabled={isLoading}
                      style={[styles.loginButton, styles.studentButton]}
                      contentStyle={styles.loginButtonContent}
                      loading={isLoading}
                      icon="account"
                    >
                      生徒としてログイン
                    </Button>

                    <Button
                      mode="contained"
                      onPress={() => handleLogin('teacher')}
                      disabled={isLoading}
                      style={[styles.loginButton, styles.teacherButton]}
                      contentStyle={styles.loginButtonContent}
                      loading={isLoading}
                      icon="school"
                    >
                      教師としてログイン
                    </Button>
                  </View>

                  {/* デモログイン */}
                  <View style={styles.demoSection}>
                    <View style={styles.divider} />
                    <Paragraph style={styles.demoTitle}>体験してみる</Paragraph>
                    
                    <View style={styles.demoButtons}>
                      <Button
                        mode="outlined"
                        onPress={() => handleDemoLogin('student')}
                        disabled={isLoading}
                        style={styles.demoButton}
                        icon="play-circle-outline"
                      >
                        生徒デモ
                      </Button>
                      <Button
                        mode="outlined"
                        onPress={() => handleDemoLogin('teacher')}
                        disabled={isLoading}
                        style={styles.demoButton}
                        icon="play-circle-outline"
                      >
                        教師デモ
                      </Button>
                    </View>
                  </View>

                  {/* リンク */}
                  <View style={styles.linkContainer}>
                    <Button 
                      mode="text" 
                      onPress={() => console.log('パスワード忘れ')}
                      textColor={theme.colors.primary}
                    >
                      パスワードを忘れた場合
                    </Button>
                    <Button 
                      mode="text" 
                      onPress={() => console.log('新規登録')}
                      textColor={theme.colors.primary}
                    >
                      新規アカウント作成
                    </Button>
                  </View>
                </Card.Content>
              </Card>

              {/* フッター */}
              <View style={styles.footer}>
                <Paragraph style={styles.footerText}>
                  © 2024 4976エデュケーション. All rights reserved.
                </Paragraph>
              </View>
            </View>
          </View>
        </View>

        {/* ローディングオーバーレイ */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingCard}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Paragraph style={styles.loadingText}>ログイン中...</Paragraph>
            </View>
          </View>
        )}

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={styles.snackbar}
        >
          {snackbarMessage}
        </Snackbar>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    minHeight: height,
  },
  leftColumn: {
    flex: 1.2,
    padding: theme.spacing.xxl,
  },
  leftScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: height - 200,
  },
  brandingSection: {
    marginBottom: theme.spacing.xxl * 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoText: {
    color: theme.colors.textInverse,
    fontSize: 36,
    fontWeight: 'bold',
    margin: 0,
  },
  appTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: theme.colors.textInverse,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  appSlogan: {
    fontSize: 24,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontWeight: '500',
  },
  appDescription: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 28,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  featuresSection: {
    marginTop: theme.spacing.xxl,
  },
  featuresTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textInverse,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  featuresList: {
    gap: theme.spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
  },
  featureIcon: {
    marginRight: theme.spacing.lg,
  },
  featureIconText: {
    fontSize: 32,
    margin: 0,
  },
  featureContent: {
    flex: 1,
  },
  featureItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textInverse,
    marginBottom: theme.spacing.sm,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  rightColumn: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xxl,
  },
  loginContainer: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  },
  loginCard: {
    width: '100%',
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
    elevation: 8,
  },
  loginContent: {
    padding: theme.spacing.xxl,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  loginSubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
    lineHeight: 24,
  },
  input: {
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  loginButtons: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  loginButton: {
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.sm,
  },
  loginButtonContent: {
    paddingVertical: theme.spacing.sm,
  },
  studentButton: {
    backgroundColor: theme.colors.primary,
  },
  teacherButton: {
    backgroundColor: theme.colors.secondary,
  },
  demoSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  demoTitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  demoButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  demoButton: {
    minWidth: 120,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
  },
  linkContainer: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  footer: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingCard: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  loadingText: {
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.md,
    fontSize: 16,
    fontWeight: '500',
  },
  snackbar: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
});
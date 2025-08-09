import React, { useState } from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native';
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
import PCLoginScreen from '../components/PCLoginScreen';
import { shouldUsePCLayout } from '../utils/responsive';

const { width } = Dimensions.get('window');

interface LoginScreenProps {
  onLogin: (userType: 'student' | 'teacher') => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const usePCLayout = shouldUsePCLayout();

  // PC専用レイアウトを使用
  if (usePCLayout) {
    return <PCLoginScreen onLogin={onLogin} />;
  }

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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Title style={styles.logoText}>4976</Title>
              </View>
            </View>
            <Title style={styles.appTitle}>4976エデュケーション</Title>
            <Paragraph style={styles.appSubtitle}>
              探究学習で未来を創造する
            </Paragraph>
          </View>

          {/* Login Card */}
          <Card style={styles.loginCard}>
            <Card.Content style={styles.loginContent}>
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

              {/* Role Selection Buttons */}
              <View style={styles.roleContainer}>
                <Title style={styles.roleTitle}>ログイン方法を選択</Title>
                
                <Button
                  mode="contained"
                  onPress={() => handleLogin('student')}
                  disabled={isLoading}
                  style={[styles.roleButton, styles.studentButton]}
                  contentStyle={styles.roleButtonContent}
                  loading={isLoading}
                  icon="account"
                >
                  生徒としてログイン
                </Button>

                <Button
                  mode="contained"
                  onPress={() => handleLogin('teacher')}
                  disabled={isLoading}
                  style={[styles.roleButton, styles.teacherButton]}
                  contentStyle={styles.roleButtonContent}
                  loading={isLoading}
                  icon="school"
                >
                  教師としてログイン
                </Button>
              </View>

              {/* Demo Section */}
              <View style={styles.demoSection}>
                <View style={styles.divider} />
                <Paragraph style={styles.demoTitle}>体験してみる</Paragraph>
                
                <View style={styles.demoButtonContainer}>
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

              {/* Links */}
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

          {/* Features Preview */}
          <View style={styles.featuresSection}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Title style={styles.featureIconText}>🎯</Title>
              </View>
              <Paragraph style={styles.featureText}>
                AI支援による個別最適化学習
              </Paragraph>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Title style={styles.featureIconText}>📊</Title>
              </View>
              <Paragraph style={styles.featureText}>
                学習進捗の可視化・分析
              </Paragraph>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Title style={styles.featureIconText}>🤝</Title>
              </View>
              <Paragraph style={styles.featureText}>
                協働学習・コミュニティ
              </Paragraph>
            </View>
          </View>

          {/* Loading Overlay */}
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <View style={styles.loadingCard}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Paragraph style={styles.loadingText}>ログイン中...</Paragraph>
              </View>
            </View>
          )}
        </ScrollView>

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
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.md,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    marginBottom: theme.spacing.lg,
  },
  logoContainer: {
    marginBottom: theme.spacing.lg,
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
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.textInverse,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  appSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  loginCard: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
  },
  loginContent: {
    padding: theme.spacing.xl,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  input: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  roleContainer: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  roleButton: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.md,
  },
  roleButtonContent: {
    paddingVertical: theme.spacing.sm,
  },
  studentButton: {
    backgroundColor: theme.colors.primary,
  },
  teacherButton: {
    backgroundColor: theme.colors.secondary,
  },
  demoSection: {
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  demoTitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  demoButtonContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  demoButton: {
    minWidth: 120,
    borderColor: theme.colors.primary,
  },
  linkContainer: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  featuresSection: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  featureIcon: {
    marginRight: theme.spacing.md,
  },
  featureIconText: {
    fontSize: 24,
    margin: 0,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
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
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Drawer, List, Divider, Avatar, Title, Paragraph } from 'react-native-paper';
import { theme } from '../constants/theme';
import { shouldShowSidebar, getDeviceInfo } from '../utils/responsive';

interface ResponsiveNavigationProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
  userType: 'student' | 'teacher';
}

const navigationItems = [
  { route: 'Home', title: 'ホーム', icon: 'home' },
  { route: 'Explore', title: '探究する', icon: 'compass' },
  { route: 'AIAssistant', title: 'AI支援', icon: 'robot' },
  { route: 'Portfolio', title: 'ポートフォリオ', icon: 'folder' },
  { route: 'Profile', title: 'プロフィール', icon: 'account' },
];

export default function ResponsiveNavigation({ 
  activeRoute, 
  onNavigate, 
  userType 
}: ResponsiveNavigationProps) {
  const showSidebar = shouldShowSidebar();
  const { width } = getDeviceInfo();
  
  if (!showSidebar) {
    // モバイル・タブレットでは従来のボトムナビゲーションを使用
    return null;
  }

  return (
    <View style={[styles.sidebar, { width: Math.min(300, width * 0.25) }]}>
      {/* ユーザー情報ヘッダー */}
      <View style={styles.userHeader}>
        <Avatar.Text 
          size={60} 
          label="4976" 
          style={styles.avatar} 
          labelStyle={styles.avatarText}
        />
        <Title style={styles.userName}>4976エデュケーション</Title>
        <Paragraph style={styles.userType}>
          {userType === 'student' ? '生徒' : '教師'}アカウント
        </Paragraph>
      </View>

      <Divider style={styles.divider} />

      {/* ナビゲーションメニュー */}
      <View style={styles.navigationMenu}>
        {navigationItems.map((item) => (
          <List.Item
            key={item.route}
            title={item.title}
            left={(props) => <List.Icon {...props} icon={item.icon} />}
            onPress={() => onNavigate(item.route)}
            style={[
              styles.menuItem,
              activeRoute === item.route && styles.activeMenuItem
            ]}
            titleStyle={[
              styles.menuTitle,
              activeRoute === item.route && styles.activeMenuTitle
            ]}
          />
        ))}
      </View>

      <Divider style={styles.divider} />

      {/* フッター */}
      <View style={styles.sidebarFooter}>
        <List.Item
          title="設定"
          left={(props) => <List.Icon {...props} icon="cog" />}
          onPress={() => onNavigate('Settings')}
          style={styles.menuItem}
          titleStyle={styles.menuTitle}
        />
        <List.Item
          title="ログアウト"
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={() => onNavigate('Logout')}
          style={styles.menuItem}
          titleStyle={styles.menuTitle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: theme.colors.surface,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    paddingVertical: theme.spacing.lg,
    ...theme.shadows.md,
  },
  userHeader: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  avatarText: {
    color: theme.colors.textInverse,
    fontWeight: 'bold',
    fontSize: 18,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  userType: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  divider: {
    marginVertical: theme.spacing.md,
  },
  navigationMenu: {
    flex: 1,
    paddingHorizontal: theme.spacing.sm,
  },
  menuItem: {
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.xs,
  },
  activeMenuItem: {
    backgroundColor: theme.colors.primaryLight + '20',
  },
  menuTitle: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  activeMenuTitle: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  sidebarFooter: {
    paddingHorizontal: theme.spacing.sm,
  },
});
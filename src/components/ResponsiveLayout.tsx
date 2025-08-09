import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import ResponsiveNavigation from './ResponsiveNavigation';
import { theme } from '../constants/theme';
import { shouldShowSidebar, shouldShowBottomNavigation, getDeviceInfo } from '../utils/responsive';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  title: string;
  activeRoute: string;
  onNavigate: (route: string) => void;
  userType: 'student' | 'teacher';
  showBackButton?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode[];
}

export default function ResponsiveLayout({
  children,
  title,
  activeRoute,
  onNavigate,
  userType,
  showBackButton = false,
  onBack,
  actions = [],
}: ResponsiveLayoutProps) {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    
    return () => subscription?.remove();
  }, []);

  const showSidebar = shouldShowSidebar();
  const { isDesktop } = getDeviceInfo();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.layout}>
        {/* PC向けサイドバー */}
        {showSidebar && (
          <ResponsiveNavigation
            activeRoute={activeRoute}
            onNavigate={onNavigate}
            userType={userType}
          />
        )}
        
        {/* メインコンテンツエリア */}
        <View style={styles.mainContent}>
          {/* ヘッダー */}
          <Appbar.Header style={styles.header}>
            {showBackButton && (
              <Appbar.BackAction onPress={onBack} />
            )}
            <Appbar.Content 
              title={title} 
              titleStyle={[
                styles.headerTitle,
                isDesktop && styles.headerTitleDesktop
              ]}
            />
            {actions.map((action, index) => (
              <React.Fragment key={index}>{action}</React.Fragment>
            ))}
          </Appbar.Header>
          
          {/* コンテンツ */}
          <View style={styles.content}>
            {isDesktop ? (
              <View style={styles.desktopContent}>
                <View style={styles.desktopContentInner}>
                  {children}
                </View>
              </View>
            ) : (
              children
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
  },
  header: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.sm,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  headerTitleDesktop: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  desktopContent: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  desktopContentInner: {
    flex: 1,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
});
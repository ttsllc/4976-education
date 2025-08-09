import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { shouldShowBottomNavigation } from './src/utils/responsive';

// Redux Store (temporary placeholder)
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({
  reducer: {
    // TODO: Add reducers
  },
});

// Screen Components
import HomeScreen from './src/screens/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import AIAssistantScreen from './src/screens/AIAssistantScreen';
import PortfolioScreen from './src/screens/PortfolioScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';

// Tab Navigator
const Tab = createBottomTabNavigator();

type UserType = 'student' | 'teacher' | null;

export default function App() {
  const [user, setUser] = useState<UserType>(null);
  const [currentRoute, setCurrentRoute] = useState('Home');

  const handleLogin = (userType: UserType) => {
    setUser(userType);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
  };

  if (!user) {
    return (
      <ReduxProvider store={store}>
        <PaperProvider>
          <SafeAreaProvider>
            <LoginScreen onLogin={handleLogin} />
            <StatusBar style="dark" />
          </SafeAreaProvider>
        </PaperProvider>
      </ReduxProvider>
    );
  }

  // レスポンシブ対応: PC版では直接コンポーネントを表示、モバイル版では従来のTab Navigator
  const showBottomNav = shouldShowBottomNavigation();
  
  const renderCurrentScreen = () => {
    const commonProps = {
      onNavigate: handleNavigate,
      userType: user!,
    };

    switch (currentRoute) {
      case 'Home':
        return <HomeScreen {...commonProps} />;
      case 'Explore':
        return <ExploreScreen {...commonProps} />;
      case 'AIAssistant':
        return <AIAssistantScreen />;
      case 'Portfolio':
        return <PortfolioScreen {...commonProps} />;
      case 'Profile':
        return <ProfileScreen onLogout={handleLogout} userType={user} />;
      default:
        return <HomeScreen {...commonProps} />;
    }
  };

  if (showBottomNav) {
    // モバイル・タブレット: 従来のTab Navigator
    return (
      <ReduxProvider store={store}>
        <PaperProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;
                    
                    switch (route.name) {
                      case 'ホーム':
                        iconName = focused ? 'home' : 'home-outline';
                        break;
                      case '探究学習':
                        iconName = focused ? 'search' : 'search-outline';
                        break;
                      case 'AI支援':
                        iconName = focused ? 'bulb' : 'bulb-outline';
                        break;
                      case 'ポートフォリオ':
                        iconName = focused ? 'folder' : 'folder-outline';
                        break;
                      case 'プロフィール':
                        iconName = focused ? 'person' : 'person-outline';
                        break;
                      default:
                        iconName = 'home-outline';
                    }
                    
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: '#6366F1',
                  tabBarInactiveTintColor: 'gray',
                  headerShown: false, // ResponsiveLayoutでヘッダーを管理
                })}
              >
                <Tab.Screen 
                  name="ホーム" 
                  children={() => <HomeScreen onNavigate={handleNavigate} userType={user!} />} 
                />
                <Tab.Screen 
                  name="探究学習" 
                  children={() => <ExploreScreen onNavigate={handleNavigate} userType={user!} />}
                />
                <Tab.Screen 
                  name="AI支援" 
                  component={AIAssistantScreen}
                />
                <Tab.Screen 
                  name="ポートフォリオ" 
                  children={() => <PortfolioScreen onNavigate={handleNavigate} userType={user!} />}
                />
                <Tab.Screen 
                  name="プロフィール" 
                  children={() => <ProfileScreen onLogout={handleLogout} userType={user} />} 
                />
              </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style="dark" />
          </SafeAreaProvider>
        </PaperProvider>
      </ReduxProvider>
    );
  }

  // PC: サイドバー付きレイアウト
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          {renderCurrentScreen()}
          <StatusBar style="dark" />
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}


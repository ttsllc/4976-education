import { Dimensions, Platform } from 'react-native';

// ブレークポイント定義
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
} as const;

// デバイスタイプ判定
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const getDeviceType = (width: number): DeviceType => {
  if (width < BREAKPOINTS.mobile) return 'mobile';
  if (width < BREAKPOINTS.tablet) return 'tablet';
  return 'desktop';
};

// 現在のデバイス情報
export const getDeviceInfo = () => {
  const { width, height } = Dimensions.get('window');
  const deviceType = getDeviceType(width);
  const isWeb = Platform.OS === 'web';
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';
  
  return {
    width,
    height,
    deviceType,
    isWeb,
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen: isTablet || isDesktop,
  };
};

// レスポンシブ値の計算
export const getResponsiveValue = <T>(
  values: { mobile?: T; tablet?: T; desktop?: T },
  defaultValue: T
): T => {
  const { deviceType } = getDeviceInfo();
  return values[deviceType] ?? defaultValue;
};

// グリッドカラム数の計算
export const getGridColumns = (itemMinWidth: number = 300): number => {
  const { width } = getDeviceInfo();
  return Math.max(1, Math.floor(width / itemMinWidth));
};

// PC向けのレイアウト判定
export const shouldUsePCLayout = (): boolean => {
  const { isDesktop, isWeb } = getDeviceInfo();
  return isWeb && isDesktop;
};

// タブレット以上の画面サイズ判定
export const shouldUseLargeScreenLayout = (): boolean => {
  const { isLargeScreen } = getDeviceInfo();
  return isLargeScreen;
};

// レスポンシブスタイル生成ヘルパー
export const responsiveStyle = {
  // パディング
  padding: (mobile: number, tablet?: number, desktop?: number) => ({
    padding: getResponsiveValue(
      { mobile, tablet: tablet ?? mobile * 1.5, desktop: desktop ?? mobile * 2 },
      mobile
    ),
  }),
  
  // マージン
  margin: (mobile: number, tablet?: number, desktop?: number) => ({
    margin: getResponsiveValue(
      { mobile, tablet: tablet ?? mobile * 1.5, desktop: desktop ?? mobile * 2 },
      mobile
    ),
  }),
  
  // フォントサイズ
  fontSize: (mobile: number, tablet?: number, desktop?: number) => ({
    fontSize: getResponsiveValue(
      { mobile, tablet: tablet ?? mobile * 1.1, desktop: desktop ?? mobile * 1.2 },
      mobile
    ),
  }),
  
  // 幅
  width: (mobile: string | number, tablet?: string | number, desktop?: string | number) => ({
    width: getResponsiveValue(
      { mobile, tablet: tablet ?? mobile, desktop: desktop ?? mobile },
      mobile
    ),
  }),
  
  // 最大幅
  maxWidth: (desktop: number) => {
    const { isDesktop } = getDeviceInfo();
    return isDesktop ? { maxWidth: desktop } : {};
  },
};

// PC向けサイドバー表示判定
export const shouldShowSidebar = (): boolean => {
  return shouldUsePCLayout();
};

// モバイル向けボトムナビゲーション表示判定
export const shouldShowBottomNavigation = (): boolean => {
  return !shouldUsePCLayout();
};
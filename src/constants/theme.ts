export const theme = {
  colors: {
    primary: '#6366F1',      // Indigo-500
    primaryDark: '#4F46E5',  // Indigo-600
    primaryLight: '#818CF8', // Indigo-400
    secondary: '#10B981',    // Emerald-500
    secondaryDark: '#059669',// Emerald-600
    accent: '#F59E0B',       // Amber-500
    error: '#EF4444',        // Red-500
    warning: '#F97316',      // Orange-500
    success: '#10B981',      // Emerald-500
    info: '#3B82F6',         // Blue-500
    
    // Backgrounds
    background: '#FFFFFF',
    backgroundSecondary: '#F8FAFC',
    backgroundTertiary: '#F1F5F9',
    surface: '#FFFFFF',
    
    // Text colors
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    textTertiary: '#94A3B8',
    textInverse: '#FFFFFF',
    
    // UI elements
    border: '#E2E8F0',
    divider: '#F1F5F9',
    disabled: '#CBD5E1',
    
    // Gradient colors
    gradientStart: '#6366F1',
    gradientEnd: '#8B5CF6',
    
    // Activity/grass colors for GitHub-style chart
    grassLevel0: '#EBEDF0',
    grassLevel1: '#9BE9A8', 
    grassLevel2: '#40C463',
    grassLevel3: '#30A14E',
    grassLevel4: '#216E39',
  },
  
  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  
  shadows: {
    sm: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};
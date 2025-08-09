import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { theme } from '../constants/theme';
import { ActivityData } from '../data/dummyData';

interface ActivityGrassChartProps {
  data: ActivityData[];
  cellSize?: number;
  cellGap?: number;
  showLabels?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

export default function ActivityGrassChart({ 
  data, 
  cellSize = 10, 
  cellGap = 2,
  showLabels = true
}: ActivityGrassChartProps) {
  const getColorForCount = (count: number): string => {
    if (count === 0) return theme.colors.grassLevel0;
    if (count <= 1) return theme.colors.grassLevel1;
    if (count <= 3) return theme.colors.grassLevel2;
    if (count <= 6) return theme.colors.grassLevel3;
    return theme.colors.grassLevel4;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
  };

  const getWeekdays = (): string[] => {
    return ['日', '月', '火', '水', '木', '金', '土'];
  };

  const organizeDataByWeeks = (data: ActivityData[]) => {
    const weeks: ActivityData[][] = [];
    let currentWeek: ActivityData[] = [];
    
    // Sort data by date
    const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    sortedData.forEach((item, index) => {
      const date = new Date(item.date);
      const dayOfWeek = date.getDay();
      
      // If this is Sunday and not the first item, start a new week
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
      
      currentWeek.push(item);
      
      // If this is the last item, push the current week
      if (index === sortedData.length - 1) {
        weeks.push(currentWeek);
      }
    });

    // Pad weeks to ensure they have 7 days
    const paddedWeeks = weeks.map(week => {
      const paddedWeek = [...week];
      while (paddedWeek.length < 7) {
        paddedWeek.push({ date: '', count: 0 });
      }
      return paddedWeek;
    });

    return paddedWeeks;
  };

  const weeks = organizeDataByWeeks(data);
  const weekdays = getWeekdays();
  
  const chartWidth = weeks.length * (cellSize + cellGap) + theme.spacing.lg;
  const isScrollable = chartWidth > screenWidth - theme.spacing.xl;

  return (
    <View style={styles.container}>
      {showLabels && (
        <View style={styles.header}>
          <Text style={styles.title}>学習アクティビティ</Text>
          <Text style={styles.subtitle}>過去7ヶ月の学習記録</Text>
        </View>
      )}
      
      <ScrollView 
        horizontal={isScrollable}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.chartContainer,
          !isScrollable && { justifyContent: 'center' }
        ]}
      >
        <View style={styles.chart}>
          {/* Weekday labels */}
          {showLabels && (
            <View style={styles.weekdayLabels}>
              {weekdays.map((day, index) => (
                <Text key={index} style={[styles.weekdayLabel, { height: cellSize }]}>
                  {index % 2 === 1 ? day : ''} {/* Show every other label to save space */}
                </Text>
              ))}
            </View>
          )}
          
          {/* Activity grid */}
          <View style={styles.grid}>
            {weeks.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.week}>
                {week.map((day, dayIndex) => (
                  <View
                    key={`${weekIndex}-${dayIndex}`}
                    style={[
                      styles.cell,
                      {
                        width: cellSize,
                        height: cellSize,
                        backgroundColor: day.date ? getColorForCount(day.count) : 'transparent',
                        marginBottom: cellGap,
                      }
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendText}>少ない</Text>
        <View style={styles.legendRow}>
          {[0, 1, 2, 3, 4].map(level => (
            <View
              key={level}
              style={[
                styles.legendCell,
                {
                  backgroundColor: level === 0 
                    ? theme.colors.grassLevel0 
                    : level === 1 
                      ? theme.colors.grassLevel1
                      : level === 2
                        ? theme.colors.grassLevel2
                        : level === 3
                          ? theme.colors.grassLevel3
                          : theme.colors.grassLevel4
                }
              ]}
            />
          ))}
        </View>
        <Text style={styles.legendText}>多い</Text>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{data.filter(d => d.count > 0).length}</Text>
          <Text style={styles.statLabel}>アクティブ日数</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{Math.max(...data.map(d => d.count))}</Text>
          <Text style={styles.statLabel}>最高記録/日</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{data.reduce((sum, d) => sum + d.count, 0)}</Text>
          <Text style={styles.statLabel}>総アクティビティ</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.md,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  chartContainer: {
    paddingHorizontal: theme.spacing.sm,
  },
  chart: {
    flexDirection: 'row',
  },
  weekdayLabels: {
    marginRight: theme.spacing.sm,
    justifyContent: 'space-between',
  },
  weekdayLabel: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 10,
    marginBottom: 2,
  },
  grid: {
    flexDirection: 'row',
  },
  week: {
    marginRight: 2,
  },
  cell: {
    borderRadius: 2,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 3,
  },
  legendCell: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
});
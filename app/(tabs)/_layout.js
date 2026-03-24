import { Tabs } from 'expo-router';

import { HapticTab } from '../../components/haptic-tab';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#800020',
        tabBarInactiveTintColor: '#94A3B8',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 24,
          left: 24,
          right: 24,
          borderRadius: 28,
          height: 64,
          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 24,
          elevation: 12,
          borderTopWidth: 0,
          paddingBottom: 0,
          paddingTop: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Нүүр',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Хуваарь',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="subjects"
        options={{
          title: 'Хичээл',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="grades"
        options={{
          title: 'Дүн',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="chart.bar.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

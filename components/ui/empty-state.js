import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export function EmptyState({ icon, title, subtitle, actionLabel, onAction }) {
  const mutedColor = useThemeColor({}, 'muted');
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <View style={styles.container}>
      <MaterialIcons name={icon} size={52} color={mutedColor} style={styles.icon} />
      <ThemedText style={styles.title}>{title}</ThemedText>
      {subtitle != null && (
        <ThemedText style={[styles.subtitle, { color: mutedColor }]}>{subtitle}</ThemedText>
      )}
      {actionLabel != null && onAction != null && (
        <TouchableOpacity
          style={[styles.button, { borderColor: primaryColor }]}
          onPress={onAction}>
          <ThemedText style={[styles.buttonLabel, { color: primaryColor }]}>{actionLabel}</ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  icon: {
    marginBottom: 4,
    opacity: 0.5,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
});

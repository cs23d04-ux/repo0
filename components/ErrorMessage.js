import { StyleSheet, Text, View } from 'react-native';

/**
 * Inline error message shown inside form cards.
 * Renders nothing when message is empty/null.
 * Used in LoginScreen below the form fields.
 */
export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 4,
  },
  icon: {
    fontSize: 14,
  },
  text: {
    flex: 1,
    fontSize: 13,
    color: '#DC2626',
    lineHeight: 18,
    fontWeight: '500',
  },
});

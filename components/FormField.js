import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function FormField({ label, error, style, ...rest }) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? '#EF4444'
    : focused
    ? '#3B82F6'
    : '#E5E7EB';

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, { borderColor }]}
        placeholderTextColor="#A1A1AA"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoCapitalize="none"
        autoCorrect={false}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    letterSpacing: 0.1,
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#FAFAFA',
  },
});

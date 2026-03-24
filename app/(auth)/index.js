import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import ErrorMessage from '@/components/ErrorMessage';
import FormField from '@/components/FormField';
import PrimaryButton from '@/components/PrimaryButton';
import useShake from '@/hooks/use-shake';
import { COLORS } from '@/constants/theme';

const MOCK_USERS = [
  { email: 'student', password: '1234', role: 'student' },
];

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { shakeAnim, shake: triggerShake } = useShake();

  const handleLogin = () => {
    setError('');
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (!user) {
      setError('Нэвтрэх нэр эсвэл нууц үг буруу байна.');
      triggerShake();
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 800);
  };
  return (
    <LinearGradient
      colors={COLORS.gradientAuth}
      locations={[0, 0.35, 0.7, 1]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.kav}>

        <View style={styles.logoRow}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Animated.View style={[styles.card, { transform: [{ translateX: shakeAnim }] }]}>

          <ErrorMessage message={error} style={styles.errorMsg} />

          <FormField
            label="Нэвтрэх нэр"
            placeholder="yourname@nmit.edu.mn"
            value={email}
            onChangeText={t => { setEmail(t); setError(''); }}
            error={!!error}
            style={styles.field}
          />

          <FormField
            label="Нууц үг"
            placeholder="••••••••"
            value={password}
            onChangeText={t => { setPassword(t); setError(''); }}
            secureTextEntry
            error={!!error}
            style={styles.field}
          />

          <PrimaryButton
            label="Нэвтрэх"
            onPress={handleLogin}
            loading={loading}
            style={styles.btn}
          />
        </Animated.View>

      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  kav: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 32,
  },
  logoRow: {
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 200,
    height: 72,
    borderRadius: 18,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: -8,
  },
  errorMsg: {
    marginBottom: -4,
  },
  field: {},
  btn: {
    marginTop: 4,
  },
});

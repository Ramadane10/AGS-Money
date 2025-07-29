import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, View } from 'react-native';
import { signIn } from '../../services/auth';
import { useRouter } from 'expo-router';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import colors from '@/constants/Colors';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      Alert.alert('Succès', 'Connexion réussie');
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Connexion</Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => router.push('/(auth)/forgotPassword')}>
          <Text style={styles.linkForgetPw}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <Button title="Se connecter" onPress={handleLogin} />
        <View style={styles.register}>
          <Text>Pas encore de compte ?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.link}>S&apos;inscrire</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  link: {
    color: colors.dark,
    marginLeft: 5,
  },
  linkForgetPw: {
    color: colors.dark,
    textAlign: 'right',
    marginBottom: 12,
  },
});

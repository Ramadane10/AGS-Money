import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { useRouter } from 'expo-router';
import { resetPassword } from '../../services/auth';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Erreur', 'Veuillez saisir votre adresse email.');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      Alert.alert('Succès', 'Un email de réinitialisation a été envoyé.');
      router.push('/(auth)/login');
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Mot de passe oublié</Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <Button title={loading ? "Envoi en cours..." : "Réinitialiser le mot de passe"} onPress={handleResetPassword} disabled={loading} />
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.link}>Retour à la connexion</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  link: {
    color: "#FFD166",
    textAlign: "center",
    marginTop: 8,
  },
});

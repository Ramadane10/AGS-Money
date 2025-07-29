import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { updateUserPassword } from '../../services/auth';

export default function ResetPasswordScreen() {
  const router = useRouter();
  // Expo Router does not export useSearchParams as a hook, so we parse the URL manually
  const [accessToken, setAccessToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const url = window.location.href;
    const tokenMatch = url.match(/access_token=([^&]+)/);
    if (tokenMatch) {
      setAccessToken(tokenMatch[1]);
    } else {
      setAccessToken(null);
    }
  }, []);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      Alert.alert('Erreur', 'Lien de réinitialisation invalide.');
      router.replace('/(auth)/login');
    }
  }, [accessToken]);

  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    try {
      await updateUserPassword(newPassword);
      Alert.alert('Succès', 'Votre mot de passe a été mis à jour.');
      router.replace('/(auth)/login');
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
        <Text style={styles.title}>Réinitialisation du mot de passe</Text>
        <TextInput
          placeholder="Nouveau mot de passe"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirmer le nouveau mot de passe"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
        <Button title={loading ? "Mise à jour..." : "Mettre à jour le mot de passe"} onPress={handleUpdatePassword} disabled={loading} />
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
});

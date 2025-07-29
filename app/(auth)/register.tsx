import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Alert, TouchableOpacity, View } from 'react-native';
import { signUp } from '../../services/auth';
import { useRouter } from 'expo-router';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import colors from '@/constants/Colors';

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      await signUp(email, password, username);
      Alert.alert('Succès', 'Inscription réussie, vous êtes connecté.');
      router.replace('/(tabs)'); // Rediriger vers la page d'accueil après inscription
    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Inscription</Text>
      <TextInput
        placeholder="Nom d'utilisateur"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
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
      <TextInput
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        style={styles.input}
      />
      <Button title="S'inscrire" onPress={handleRegister} />
      <View style={styles.register}>
        <Text>Déjà un compte ?</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.link}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
});

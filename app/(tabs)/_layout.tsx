import { useEffect, useState } from 'react';
import { useRouter, Slot, useSegments } from 'expo-router';
import { getUser } from '@/services/auth';
import { View, ActivityIndicator, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const tabs = [
  { name: '/(tabs)/home', label: 'Accueil', icon: 'home' as const },
  { name: '/(tabs)/licence', label: 'Licence', icon: 'document-text' as const },
  { name: '/(tabs)/redevance', label: 'Redevance', icon: 'cash' as const },
  { name: '/(tabs)/profil', label: 'Profil', icon: 'person' as const },
];

function TabBar() {
  const segments = useSegments();
  const router = useRouter();

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = segments.some(segment => tab.name.includes(segment));
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.push(tab.name as any)}
            style={[styles.tabItem, isActive && styles.activeTab]}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={isActive ? '#007AFF' : '#888'}
            />
            <Text style={[styles.tabLabel, isActive && styles.activeLabel]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data, error } = await getUser();
        if (error || !data.user) {
          router.replace('/(auth)/login');
        } else {
          setAuthenticated(true);
        }
      } catch {
        router.replace('/(auth)/login');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 56,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#007AFF',
  },
  tabLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  activeLabel: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://openlibrary.org/subjects/fiction.json?limit=15');
      if (!response.ok) throw new Error('Network error');
      
      const { works } = await response.json();
      setBooks(works || []);
      setError(null);
    } catch (err) {
      setError('Gagal memuat data. Cek koneksi internet kamu.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBooks();
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2e86de" />
        <Text style={styles.loadingText}>Memuat Katalog...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="cloud-offline-outline" size={50} color="#e74c3c" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchBooks}>
          <Text style={styles.buttonText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2e86de']} />}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { bookId: item.key })}
          >
            <View style={styles.cardContent}>
              <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.bookAuthor}>{item.authors?.[0]?.name || 'Penulis Tidak Diketahui'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f8' },
  loadingText: { marginTop: 12, color: '#7f8c8d', fontSize: 15 },
  errorText: { color: '#e74c3c', marginVertical: 15, textAlign: 'center', fontSize: 16 },
  button: { backgroundColor: '#2e86de', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12 },
  buttonText: { color: '#ffffff', fontWeight: 'bold' },
  listContainer: { padding: 20, paddingBottom: 30 },
  card: { 
    backgroundColor: '#ffffff', padding: 20, marginBottom: 15, borderRadius: 16, 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3
  },
  cardContent: { flex: 1, paddingRight: 10 },
  bookTitle: { fontSize: 16, fontWeight: '700', color: '#2c3e50', marginBottom: 4 },
  bookAuthor: { fontSize: 13, color: '#7f8c8d' }
});

export default HomeScreen;
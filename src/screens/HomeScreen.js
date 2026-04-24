import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, ActivityIndicator, 
  TouchableOpacity, StyleSheet, RefreshControl 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://openlibrary.org/subjects/fiction.json?limit=15');
      const json = await response.json();
      setBooks(json.works); 
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
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2e86de" />
        <Text style={{marginTop: 10, color: '#666'}}>Memuat Katalog...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="cloud-offline-outline" size={50} color="red" />
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
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2e86de']} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Detail')}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.bookAuthor}>{item.authors[0]?.name || 'Unknown Author'}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', padding: 15 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { 
    backgroundColor: '#ffffff', 
    padding: 18, 
    marginBottom: 15, 
    borderRadius: 16, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookTitle: { fontSize: 16, fontWeight: '700', color: '#2f3640', marginBottom: 4, maxWidth: '90%' },
  bookAuthor: { fontSize: 13, color: '#7f8fa6' },
  errorText: { color: '#e74c3c', marginVertical: 15, textAlign: 'center' },
  button: { backgroundColor: '#2e86de', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});

export default HomeScreen;
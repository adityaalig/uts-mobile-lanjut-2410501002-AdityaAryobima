import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, RefreshControl, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = [
  { id: 'trending', name: 'Trending' },
  { id: 'fiction', name: 'Fiction' },
  { id: 'romance', name: 'Romance' },
  { id: 'mystery', name: 'Mystery' },
  { id: 'fantasy', name: 'Fantasy' },
  { id: 'history', name: 'History' }
];

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('trending');

  const fetchBooks = async (categoryId = activeCategory) => {
    try {
      setLoading(true);
      let url = categoryId === 'trending' 
        ? 'https://openlibrary.org/trending/daily.json?limit=15' 
        : `https://openlibrary.org/subjects/${categoryId}.json?limit=15`;

      const response = await fetch(url);
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
    fetchBooks(activeCategory);
  }, [activeCategory]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBooks();
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#967259" />
        <Text style={styles.loadingText}>Memuat Katalog...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="cloud-offline-outline" size={50} color="#e74c3c" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={() => fetchBooks()}>
          <Text style={styles.buttonText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat.id} 
              style={[styles.chip, activeCategory === cat.id && styles.activeChip]}
              onPress={() => setActiveCategory(cat.id)}
            >
              <Text style={[styles.chipText, activeCategory === cat.id && styles.activeChipText]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#967259']} />}
        renderItem={({ item }) => {
          const coverId = item.cover_id || item.cover_i;
          const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;

          return (
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate('Detail', { bookId: item.key })}
            >
              {coverUrl ? (
                <Image source={{ uri: coverUrl }} style={styles.coverImage} />
              ) : (
                <View style={styles.placeholderCover}>
                  <Ionicons name="book" size={24} color="#bdc3c7" />
                </View>
              )}

              <View style={styles.cardContent}>
                <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f8' },
  loadingText: { marginTop: 12, color: '#7f8c8d', fontSize: 15 },
  errorText: { color: '#e74c3c', marginVertical: 15, textAlign: 'center', fontSize: 16 },
  button: { backgroundColor: '#967259', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12 },
  buttonText: { color: '#ffffff', fontWeight: 'bold' },
  categoryContainer: { paddingVertical: 15, paddingLeft: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#ecf0f1' },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f1f2f6', marginRight: 10 },
  activeChip: { backgroundColor: '#967259' },
  chipText: { color: '#7f8c8d', fontWeight: '600', fontSize: 14 },
  activeChipText: { color: '#fff' },
  listContainer: { padding: 20, paddingBottom: 30 },
  card: { 
    backgroundColor: '#ffffff', padding: 15, marginBottom: 15, borderRadius: 16, 
    flexDirection: 'row', alignItems: 'center', 
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3
  },
  coverImage: { width: 50, height: 75, borderRadius: 8, backgroundColor: '#e0e6ed', marginRight: 15 },
  placeholderCover: { width: 50, height: 75, borderRadius: 8, backgroundColor: '#f1f2f6', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  cardContent: { flex: 1, paddingRight: 10, justifyContent: 'center' },
  bookTitle: { fontSize: 16, fontWeight: '700', color: '#2c3e50' }
});

export default HomeScreen;
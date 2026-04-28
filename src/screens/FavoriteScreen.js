import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FavoriteContext } from '../context/FavoriteContext';

const FavoriteScreen = ({ navigation }) => {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);

  if (favorites.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="heart-dislike-outline" size={60} color="#bdc3c7" />
        <Text style={styles.emptyText}>Belum ada buku favorit.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { bookId: item.key })}
          >
            {item.coverUrl ? (
              <Image source={{ uri: item.coverUrl }} style={styles.thumbnail} />
            ) : (
              <View style={styles.placeholderThumbnail}>
                <Ionicons name="book" size={24} color="#bdc3c7" />
              </View>
            )}
            
            <View style={styles.cardContent}>
              <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => toggleFavorite(item)}
            >
              <Ionicons name="trash-outline" size={22} color="#e74c3c" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f8' },
  emptyText: { marginTop: 12, color: '#7f8c8d', fontSize: 16 },
  listContainer: { padding: 20, paddingBottom: 30 },
  card: { 
    backgroundColor: '#ffffff', padding: 15, marginBottom: 15, borderRadius: 16, 
    flexDirection: 'row', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3
  },
  thumbnail: { width: 50, height: 75, borderRadius: 8, backgroundColor: '#e0e6ed' },
  placeholderThumbnail: { 
    width: 50, height: 75, borderRadius: 8, backgroundColor: '#f1f2f6', 
    justifyContent: 'center', alignItems: 'center' 
  },
  cardContent: { flex: 1, paddingHorizontal: 15, justifyContent: 'center' },
  bookTitle: { fontSize: 16, fontWeight: '700', color: '#2c3e50' },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fdecea', 
  }
});

export default FavoriteScreen;
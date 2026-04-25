import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DetailScreen = ({ route }) => {
  const { bookId } = route.params;
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const formattedId = bookId.startsWith('/works/') ? bookId : `/works/${bookId}`;
        const response = await fetch(`https://openlibrary.org${formattedId}.json`);
        
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        
        setBookData(await response.json());
      } catch (error) {
        setBookData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2e86de" />
        <Text style={styles.loadingText}>Memuat detail buku...</Text>
      </View>
    );
  }

  if (!bookData) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={50} color="#e74c3c" />
        <Text style={styles.errorText}>Data buku tidak ditemukan.</Text>
      </View>
    );
  }

  const description = bookData.description?.value || bookData.description || 'Belum ada sinopsis untuk buku ini.';
  const coverUrl = bookData.covers?.[0] ? `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-L.jpg` : null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.coverWrapper}>
        {coverUrl ? (
          <Image source={{ uri: coverUrl }} style={styles.coverImage} resizeMode="contain" />
        ) : (
          <View style={styles.placeholderCover}>
            <Ionicons name="book-outline" size={64} color="#bdc3c7" />
            <Text style={styles.placeholderText}>Tidak ada cover</Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{bookData.title}</Text>
        <Text style={styles.publishDate}>Tahun Terbit: {bookData.first_publish_date || 'Tidak diketahui'}</Text>
        <View style={styles.separator} />
        <Text style={styles.sectionTitle}>Sinopsis</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f8' },
  loadingText: { marginTop: 12, color: '#7f8c8d', fontSize: 15 },
  errorText: { marginTop: 12, color: '#c0392b', fontSize: 16 },
  coverWrapper: { width: '100%', height: 320, backgroundColor: '#e0e6ed', justifyContent: 'center', alignItems: 'center' },
  coverImage: { width: '100%', height: '100%' },
  placeholderCover: { alignItems: 'center' },
  placeholderText: { marginTop: 8, color: '#95a5a6', fontWeight: '500' },
  infoContainer: { 
    backgroundColor: '#ffffff', marginTop: -24, borderTopLeftRadius: 24, borderTopRightRadius: 24, 
    padding: 24, minHeight: 500, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, 
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 4 
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50', marginBottom: 6, lineHeight: 30 },
  publishDate: { fontSize: 14, color: '#7f8c8d', fontWeight: '500' },
  separator: { height: 1, backgroundColor: '#ecf0f1', marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#34495e', marginBottom: 12 },
  descriptionText: { fontSize: 15, color: '#576574', lineHeight: 24, textAlign: 'justify' }
});

export default DetailScreen;
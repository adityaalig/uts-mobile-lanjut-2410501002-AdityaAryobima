import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, Keyboard, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSearch = async () => {
    const keyword = query.trim();

    if (!keyword) {
      setErrorMsg('Kata kunci pencarian tidak boleh kosong.');
      setResults([]);
      return;
    }
    
    if (keyword.length < 3) {
      setErrorMsg('Kata kunci pencarian minimal 3 karakter.');
      setResults([]);
      return;
    }

    Keyboard.dismiss();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(keyword)}&limit=15`);
      if (!response.ok) throw new Error('Jaringan bermasalah');
      
      const data = await response.json();
      
      if (data.docs.length === 0) {
        setErrorMsg('buku yang kamu cari tidak ditemukan.');
        setResults([]);
      } else {
        setResults(data.docs);
      }
    } catch (error) {
      setErrorMsg('Gagal mencari buku. Coba periksa koneksi internetmu.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setErrorMsg(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={20} color="#7f8c8d" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ketik judul buku..."
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              if (errorMsg) setErrorMsg(null);
            }}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={20} color="#bdc3c7" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchBtnText}>Cari</Text>
        </TouchableOpacity>
      </View>

      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
      {isLoading && <ActivityIndicator size="large" color="#967259" style={styles.loader} />}

      <FlatList
        data={results}
        keyExtractor={(item, index) => item.key || index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const coverId = item.cover_i;
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
  searchHeader: { flexDirection: 'row', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#ecf0f1' },
  inputContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f2f6', borderRadius: 12, paddingHorizontal: 15, height: 45, marginRight: 10 },
  searchIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 15, color: '#2c3e50' },
  searchBtn: { backgroundColor: '#967259', justifyContent: 'center', paddingHorizontal: 20, borderRadius: 12, height: 45 },
  searchBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  errorText: { color: '#e74c3c', textAlign: 'center', marginTop: 20, marginHorizontal: 20 },
  loader: { marginTop: 30 },
  listContainer: { padding: 20, paddingBottom: 30 },
  card: { backgroundColor: '#ffffff', padding: 15, marginBottom: 15, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  coverImage: { width: 50, height: 75, borderRadius: 8, backgroundColor: '#e0e6ed', marginRight: 15 },
  placeholderCover: { width: 50, height: 75, borderRadius: 8, backgroundColor: '#f1f2f6', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  cardContent: { flex: 1, paddingRight: 10, justifyContent: 'center' },
  bookTitle: { fontSize: 16, fontWeight: '700', color: '#2c3e50', marginBottom: 4 }
});

export default SearchScreen;
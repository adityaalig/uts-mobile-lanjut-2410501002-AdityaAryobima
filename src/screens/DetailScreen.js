import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
  const { bookId } = route.params || { bookId: 'N/A' };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Buku</Text>
      <Text>ID Buku: {bookId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 }
});

export default DetailScreen;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentBox}>
        <Text style={styles.title}>Detail Buku</Text>
        <Text style={styles.subtitle}>Tampilan detail dan data buku akan dimuat di sini.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f6fa', 
    justifyContent: 'center', 
    padding: 25 
  },
  contentBox: { 
    backgroundColor: '#fff', 
    padding: 40, 
    borderRadius: 24, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5
  },
  icon: { marginBottom: 15 },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#2f3640',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8fa6',
    textAlign: 'center',
    lineHeight: 20
  }
});

export default DetailScreen;
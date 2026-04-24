import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarPlaceholder}>
        <Text style={{ color: '#fff' }}>Foto</Text>
      </View>
      
      <Text style={styles.name}>Aditya Aryobima</Text>
      <Text style={styles.info}>NIM: 2410501002</Text>
      <Text style={styles.info}>Kelas: B</Text>
      <Text style={styles.info}>Tema: BookShelf</Text>
      
      <View style={styles.footer}>
        <Text style={styles.credit}></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 50, backgroundColor: '#fff' },
  avatarPlaceholder: { 
    width: 100, height: 100, borderRadius: 50, 
    backgroundColor: '#2e86de', justifyContent: 'center', alignItems: 'center',
    marginBottom: 20
  },
  name: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  info: { fontSize: 16, color: '#666', marginTop: 5 },
  footer: { marginTop: 'auto', marginBottom: 30 },
  credit: { fontStyle: 'italic', color: '#999' }
});

export default AboutScreen; 
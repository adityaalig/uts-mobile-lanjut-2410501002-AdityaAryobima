import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'; 

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        
        <View style={styles.avatarContainer}>
          <Image 
            source={require('../../assets/foto_profil.png')} 
            style={styles.avatarImage} 
          />
        </View>
        
        <Text style={styles.name}>Aditya Aryobima</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>NIM: 2410501002</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Kelas: B</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Tema: BookShelf</Text>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.creditLabel}>API Source: </Text>
        <Text style={styles.creditLink}>openlibrary.org</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', padding: 20, alignItems: 'center' },
  profileCard: { 
    backgroundColor: '#fff', width: '100%', padding: 30, borderRadius: 24, 
    alignItems: 'center', marginTop: 20, shadowColor: '#000', 
    shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 
  },
  avatarContainer: { 
    width: 100, height: 100, borderRadius: 50, backgroundColor: '#967259', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 20, 
    shadowColor: '#967259', shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.3, shadowRadius: 10, elevation: 8,
    overflow: 'hidden' 
  },
  avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  
  name: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50', marginBottom: 25 },
  infoRow: { 
    backgroundColor: '#f8f9fa', width: '100%', padding: 15, borderRadius: 12, 
    marginBottom: 12, alignItems: 'center', justifyContent: 'center' 
  },
  infoText: { fontSize: 16, color: '#34495e', fontWeight: '500' },
  footerContainer: {
    marginTop: 'auto',
    marginBottom: 20,
    flexDirection: 'row', 
    alignItems: 'center'
  },
  creditLabel: { fontSize: 14 },
  creditLink: { fontSize: 14 }
});

export default AboutScreen;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>Katalog Buku</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 14,  
    color: '#333' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#666', 
    marginTop: 5 
  },
  info: { 
    fontSize: 14, 
    color: '#999', 
    marginTop: 20, 
    textAlign: 'center' 
  }
});

export default HomeScreen;
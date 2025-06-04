import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ProfileSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.coverPhoto} />
      <View style={styles.profilePhoto} />
      <View style={styles.infoContainer}>
        <View style={styles.line} />
        <View style={styles.lineShort} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  coverPhoto: { height: 170, backgroundColor: '#ccc', borderRadius: 8 },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    marginTop: -60,
    marginLeft: 16,
  },
  infoContainer: { marginTop: 20 },
  line: {
    height: 16,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginVertical: 6,
  },
  lineShort: {
    height: 16,
    backgroundColor: '#ccc',
    borderRadius: 4,
    width: '60%',
  },
});

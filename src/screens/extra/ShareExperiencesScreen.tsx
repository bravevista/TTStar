import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PostEditor from '../../components/specific/PostEditor';

export default function ShareExperiencesScreen() {
  const [postText, setPostText] = useState('');

  return (
    <View style={styles.container}>
      <Text>Hola</Text>
      <PostEditor value={postText} onChangeText={setPostText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

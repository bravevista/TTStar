import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PostEditor from '../../components/specific/Post/PostEditor';
import StackHeader from '../../components/common/StackHeader';

export default function ShareExperiencesScreen() {
  const [postText, setPostText] = useState('');

  return (
    <View style={styles.container}>
      <StackHeader
        title="Compartir experiencia"
        iconFamiliy="AntDesign"
        iconName="gift"
        showBackButton
      />
      <PostEditor value={postText} onChangeText={setPostText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

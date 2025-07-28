import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';

import PostEditor from '../../components/specific/Post/PostEditor';
import StackHeader from '../../components/common/StackHeader';
import { Button } from '../../components/common/Button';

export default function ShareExperiencesScreen() {
  const [postText, setPostText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StackHeader
        title="Compartir experiencia"
        iconFamiliy="AntDesign"
        iconName="gift"
        showBackButton
      />
      <PostEditor value={postText} onChangeText={setPostText} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

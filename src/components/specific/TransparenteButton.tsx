import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const imageUri = 'https://game-tournaments.com/media/news/n68138.jpeg';

export default function TransparentMaskedButton() {
  const [pressed, setPressed] = useState(false);

  return (
    <ImageBackground
      source={{ uri: imageUri }}
      style={[styles.background, { width: SCREEN_WIDTH }]}
      resizeMode="cover"
    >
      <Pressable
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={[styles.button, pressed && styles.buttonPressed]}
      >
        {pressed ? (
          <MaskedView
            style={styles.maskContainer}
            maskElement={
              <View style={styles.center}>
                <Text style={styles.maskText}>Todos</Text>
              </View>
            }
          >
            {/* Esta imagen es la que aparecerá dentro del texto */}
            <Image
              source={{ uri: imageUri }}
              style={styles.imageFill}
              resizeMode="cover"
            />
          </MaskedView>
        ) : (
          <Text style={styles.normalText}>Todos</Text>
        )}
      </Pressable>
    </ImageBackground>
  );
}

const BUTTON_WIDTH = 140;
const BUTTON_HEIGHT = 42;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  buttonPressed: {
    backgroundColor: '#FFF',
  },
  normalText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  maskText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black', // necesario para que funcione la máscara
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskContainer: {
    flex: 1,
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
  },
  imageFill: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
  },
});

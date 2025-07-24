import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import UniversityLifeScreen from '../screens/stack/UniversityLifeScreen';

const Stack = createNativeStackNavigator();

export default function ExploreStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UniversityLife" component={UniversityLifeScreen} />
    </Stack.Navigator>
  );
}

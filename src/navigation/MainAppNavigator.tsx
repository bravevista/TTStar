import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import { MainStackParamList } from '../types/navigation';
import AppearanceScreen from '../screens/extra/AppearanceScreen';
import PostModal from '../screens/mod/Post.modal';
import FAQScreen from '../screens/extra/FAQScreen';
import HelpScreen from '../screens/extra/HelpScreen';
import FeedbackScreen from '../screens/extra/FeedbackScreen';
import PrivacyPolicyScreen from '../screens/extra/PrivacyPolicyScreen';
import TermsOfUseScreen from '../screens/extra/TermsOfUseScreen';
import AccessibilityScreen from '../screens/extra/AccessibilityScreen';
import ProfileUserScreen from '../screens/extra/ProfileUserScreen';
import EditProfileScreen from '../screens/extra/EditProfileScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainAppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
        presentation: 'card', //Hay mas tipos como modal
      }}
    >
      {/* BottomTab Navigator como pantalla principal */}
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          animation: 'fade_from_bottom',
        }}
      />

      <Stack.Screen
        name="ProfileUser"
        component={ProfileUserScreen}
        options={{
          animation: 'ios_from_right',
        }}
      />

      {/* Pantallas de stack normales */}
      <Stack.Screen
        name="Appearance"
        component={AppearanceScreen}
        options={{
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen
        name="Accessibility"
        component={AccessibilityScreen}
        options={{
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQScreen}
        options={{
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen
        name="TermsOfUse"
        component={TermsOfUseScreen}
        options={{
          animation: 'fade_from_bottom',
        }}
      />

      {/* Grupo para modales */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="PostModal" component={PostModal} />
        {/* Agrega otros modales aquí */}
      </Stack.Group>
    </Stack.Navigator>
  );
}

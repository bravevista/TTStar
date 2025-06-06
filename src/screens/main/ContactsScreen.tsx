import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Dimensions,
} from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Search01Icon } from '@hugeicons/core-free-icons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { TabScreenProps } from '../../types/navigation';
import { useTheme } from '../../hooks/useTheme';
import TopTabNavigator from '../../navigation/TopTabNavigator';
import MainHeader from '../../components/common/MainHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ContactsScreen({
  navigation,
  route,
}: TabScreenProps<'ContactsTab'>) {
  const { colors, theme, typography } = useTheme();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('contactos');

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'contactos':
        return 'Buscar amigo ...';
      case 'mensajes':
        return 'Buscar conversación ...';
      case 'solicitudes':
        return 'Buscar solicitud ...';
      default:
        return 'Buscar contacto ...';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      {/* Header + Buscador */}
      <View style={styles.topSection}>
        <MainHeader />
        <View
          style={[
            styles.searchInput,
            { backgroundColor: colors.background2, width: SCREEN_WIDTH * 0.95 },
          ]}
        >
          <HugeiconsIcon
            icon={Search01Icon}
            size={moderateScale(24)}
            color={colors.textSecondary}
            strokeWidth={1.5}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={getPlaceholder()}
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.background2,
              },
            ]}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabSection}>
        <TopTabNavigator query={query} onTabChange={setActiveTab} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    alignItems: 'center',
  },
  searchInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(15),
    height: scale(42),
  },
  input: {
    width: '90%',
  },
  tabSection: {
    flex: 1,
    paddingTop: verticalScale(2),
  },
});

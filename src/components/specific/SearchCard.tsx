import { Pressable, Image, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StudentCard } from '../../components/specific/searchcards/StudentCard';
import { ProfessorCard } from '../../components/specific/searchcards/ProfessorCard';
import { AdministrativeCard } from '../../components/specific/searchcards/AdministrativeCard';
import { GeneralServicesCard } from '../../components/specific/searchcards/GeneralServicesCard';
import { useTheme } from '../../hooks/useTheme';
import { MainStackParamList } from '../../types/navigation';

interface SearchButtonProps {
  item: any;
  navigateTo?: string;
}

export default function SearchCard({ item, navigateTo }: SearchButtonProps) {
  const { colors, typography } = useTheme();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList, 'ProfileUser'>
    >();

  const handleProfile = () => {
    navigation.navigate('ProfileUser', { uuid: item.id });
  };

  return (
    <Pressable
      onPress={handleProfile}
      style={({ pressed }) => [
        styles.userCard,
        {
          borderColor: colors.border,
          backgroundColor: pressed ? colors.background2 : colors.background,
        },
      ]}
    >
      {({ pressed }) => (
        <>
          <Image
            source={{ uri: item.profilephoto }}
            style={[styles.avatar, { borderColor: colors.primary }]}
          />
          {item.type === 'student' && (
            <StudentCard user={item} color={colors.primary} />
          )}
          {item.type === 'professor' && (
            <ProfessorCard user={item} color="#003366" />
          )}
          {item.type === 'administrative' && (
            <AdministrativeCard user={item} color="#4B4B4B" />
          )}
          {item.type === 'generalservices' && (
            <GeneralServicesCard user={item} color="green" />
          )}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderRadius: moderateScale(15),
  },
  avatar: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(15),
    borderWidth: 2.5,
    marginRight: moderateScale(15),
  },
});

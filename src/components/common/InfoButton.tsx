import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as Icons from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

import { useTheme } from '../../hooks/useTheme';

type IconFamily =
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial';

interface InfoButtonProps {
    text: string;
    iconFamily?: IconFamily;
    iconName?: string;
    navigateTo?: string;
    textColor?: string;
    onPress?: () => void;
};

export default function InfoButton({
    text, 
    iconFamily = 'Feather', 
    iconName = 'help-circle', 
    navigateTo,
    textColor,
    onPress,
}: InfoButtonProps) {
    const { colors, typography } = useTheme();
    const navigation = useNavigation();
    const IconComponent = Icons[iconFamily];

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else if (navigateTo) {
            navigation.navigate(navigateTo as never);
        };
    }; 

    return (
        <Pressable
        onPress={handlePress}
            style={({ pressed }) => [{
                backgroundColor: pressed ? colors.card : colors.background,
            }]}
        >
            <View style={styles.container}>
                <View style={[styles.iconContainer, { borderColor: colors.card, backgroundColor: colors.card }]}>
                    <IconComponent name={iconName} size={moderateScale(21)} color={colors.primary} />
                </View>
                <Text style={[styles.word, { fontSize: typography.fontSizes.lg, color: textColor ?? colors.text }]}>
                    {text}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: moderateScale(12),
        paddingVertical: verticalScale(4),
        paddingHorizontal: scale(20),
        borderRadius: moderateScale(5),
        marginVertical: verticalScale(4),
    },
    iconContainer: {
        padding: moderateScale(4.5),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: scale(1),
    },
    word: {
        fontWeight: 'bold',
    },
});
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Icons from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

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

interface StackHeaderProps {
    title: string;
    iconFamiliy?: IconFamily;
    iconName?: string;
    showBackButton: boolean;
};

export default function StackHeader({ title, iconFamiliy = 'AntDesign', iconName = 'heart', showBackButton = false }: StackHeaderProps) {
    const { colors, typography } = useTheme();
    const navigation = useNavigation();
    const IconComponent = Icons[iconFamiliy];

    return (
        <View style={[styles.headerContainer, { backgroundColor: colors.background }]}>
            {showBackButton ? (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    hitSlop={{ top: verticalScale(10), bottom: verticalScale(10), left: scale(10), right: scale(10) }}
                >
                    <Icons.Entypo name='chevron-left' size={moderateScale(21)} color={colors.primary} />
                </TouchableOpacity>
            ) : (
                <View style={styles.placeholderView} />
            )}

            <View style={styles.titleContainer}>
                <IconComponent name={iconName} size={moderateScale(21)} color={colors.primary} />
                <Text style={[styles.titleText, { color: colors.text, fontSize: typography.fontSizes.lg, fontWeight: typography.fontWeights.bold }]}>
                    {title}
                </Text>
            </View>

            <View style={styles.placeholderView} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: verticalScale(45),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: scale(12),
    },
    backButton: {
        padding: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        marginLeft: moderateScale(6),
    },
    placeholderView: {
        width: scale(40),
    },
});
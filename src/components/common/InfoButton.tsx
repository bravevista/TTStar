import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as Icons from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';

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
};

export default function InfoButton({ text, iconFamily = 'Feather', iconName = 'help-circle', navigateTo }: InfoButtonProps) {
    const { colors, typography } = useTheme();
    const navigation = useNavigation();
    const IconComponent = Icons[iconFamily];

    const handlePress = () => {
        if (navigateTo) {
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
                    <IconComponent name={iconName} size={25} color={colors.primary} />
                </View>
                <Text style={[styles.word, { fontSize: typography.fontSizes.lg }]}>{text}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    iconContainer: {
        padding: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    word: {
        fontWeight: 'bold',
    },
});
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

import { useTheme } from '../../hooks/useTheme';
import StackHeader from '../../components/common/StackHeader';

export default function FAQScreen() {
    const { colors, typography, theme } = useTheme();

    return(
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />

            <StackHeader
                title='Preguntas frecuentes'
                iconFamiliy='MaterialCommunityIcons'
                iconName='head-question-outline'
                showBackButton
            />

            <ScrollView contentContainerStyle={[styles.subContainer, { backgroundColor: colors.background }]}>
                <Text style={[{ color: colors.text }]}>FAQ you</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: verticalScale(5),
        paddingBottom: verticalScale(20),
        paddingHorizontal: scale(21),
    },
});
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

import { useTheme } from '../../hooks/useTheme';
import StackHeader from '../../components/common/StackHeader';
import WorkInProgress from '../../components/common/WorkInProgress';

export default function AccessibilityScreen() {
    const { colors, typography, theme } = useTheme();

    return(
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />

            <StackHeader
                title="Accesibilidad"
                iconFamiliy="Octicons"
                iconName="accessibility"
                showBackButton
            />

            <ScrollView contentContainerStyle={[styles.subContainer, { backgroundColor: colors.background }]}>
                <WorkInProgress />
                <View style={styles.textContainer}>
                    <Text style={[styles.text, { color: colors.text, fontWeight: typography.fontWeights.regular }]}>
                        La función de accesibilidad está en desarrollo. Aunque no se incluyó en esta versión 
                        por su complejidad técnica, reconocemos su importancia y será incorporada próximamente.
                    </Text>
                    <Text style={[styles.text, { color: colors.text, fontWeight: typography.fontWeights.semibold }]}>
                        ¡Gracias por su apoyo! Sigamos construyendo una comunidad accesible para todos.
                    </Text>
                </View>
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
    textContainer: {
        paddingVertical: verticalScale(10),
        gap: moderateScale(10),
    },
    text: {
        paddingHorizontal: scale(20),
        textAlign: 'center',
    },
});
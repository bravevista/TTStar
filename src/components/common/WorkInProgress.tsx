import { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import LottieView from 'lottie-react-native';

import { useTheme } from '../../hooks/useTheme';

export default function WorkInProgress() {
    const { colors, typography } = useTheme();
    const animation = useRef<LottieView>(null);

    return (
        <View style={styles.container}>
            <LottieView
                autoPlay
                ref={animation}
                style={styles.animation}
                source={require('../../assets/lottie/WorkInProgress.json')}
            />
            <Text style={[{ color: colors.text, fontSize: typography.fontSizes.xxl, fontWeight: typography.fontWeights.bold }]}>
                Funcionalidad en desarrollo
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animation: {
        width: scale(4*75),
        height: verticalScale(3*75),
    },
});
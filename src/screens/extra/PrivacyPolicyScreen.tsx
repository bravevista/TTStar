import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

import { useTheme } from '../../hooks/useTheme';
import StackHeader from '../../components/common/StackHeader';
import FileDinamicItem from '../../components/specific/FileDinamicItem';
import { PolicySection } from '../../data/privacyPolicy.data';
import { privacyPolicyData } from '../../data/privacyPolicy.data';

export default function PrivacyPolicyScreen() {
    const { colors, typography, theme } = useTheme();

    const renderItem = ({ item }: { item: PolicySection }) => (
        <FileDinamicItem item={item} colors={colors} typography={typography} />
    );

    return(
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />

            <StackHeader
                title='Política de privacidad'
                iconFamiliy='MaterialIcons'
                iconName='privacy-tip'
                showBackButton
            />

            <Text style={[styles.title, { color: colors.text, fontSize: typography.fontSizes.xxl, fontWeight: typography.fontWeights.bold }]}>
                Política de privacidad
            </Text>

            <FlatList
                data={privacyPolicyData}
                renderItem={renderItem}
                keyExtractor={(item, index) => `policy-item-${index}`}
                contentContainerStyle={[styles.subContainer, { backgroundColor: colors.background }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        paddingHorizontal: scale(21),
    },
    subContainer: {
        textAlign: 'left',
        paddingBottom: verticalScale(20),
        paddingHorizontal: scale(21),
    },
});
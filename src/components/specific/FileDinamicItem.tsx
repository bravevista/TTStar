import { View, Text, StyleSheet } from 'react-native';

import { PolicySection } from '../../data/privacyPolicy.data';
import { Colors, ThemeColors } from '../../styles/theme/colors'
import { Typography } from '../../styles/theme';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

interface FileDinamicProps {
    item: PolicySection,
    colors: ThemeColors;
    typography: Typography;
};

export default function FileDinamicItem({ item, colors, typography }: FileDinamicProps) {
    switch (item.type) {
        case 'header':
            return (
                <Text style={[styles.header, {
                    color: colors.text,
                    fontWeight: typography.fontWeights.bold,
                    fontSize: typography.fontSizes.xl,
                }]}>
                    {item.content}
                </Text>
            );

        case 'subheader':
            return (
                <Text style={[styles.subheader, {
                    color: colors.text,
                    fontWeight: typography.fontWeights.semibold,
                    fontSize: typography.fontSizes.lg,
                }]}>
                    {item.content}
                </Text>
            );

        case 'paragraph':
            return (
                <Text style={[styles.paragraph, {
                    color: colors.text,
                    fontWeight: typography.fontWeights.regular,
                    fontSize: typography.fontSizes.md,
                }]}>
                    {item.content}
                </Text>
            );

        case 'list':
            return (
                <View style={styles.listContainer}>
                    {(item.content as string[]).map((listItem, index) => (
                        <View key={index} style={styles.listItem}>
                            <Text style={[styles.listBullet, { color: colors.text }]}>•</Text>
                            <Text style={[styles.listText, {
                                color: colors.text,
                                fontWeight: typography.fontWeights.regular,
                                fontSize: typography.fontSizes.md,
                            }]}>
                                {listItem}
                            </Text>
                        </View>
                    ))}
                </View>
            );
        
        default:
            return null;
    };
};

const styles = StyleSheet.create({
    header: {
        marginVertical: verticalScale(10),
    },
    subheader: {
        marginVertical: verticalScale(10),
    },
    paragraph: {
        paddingHorizontal: scale(10),
        marginBottom: verticalScale(5),
        lineHeight: moderateScale(22),
    },
    listContainer: {
        marginBottom: verticalScale(5),
    },
    listItem: {
        flexDirection: 'row',
        paddingHorizontal: scale(10),
        marginBottom: verticalScale(10),
    },
    listBullet: {
        justifyContent: 'flex-start',
        marginRight: scale(8),
        fontSize: moderateScale(26),
    },
    listText: {
        flex: 1,
        lineHeight: moderateScale(22),
    },
});
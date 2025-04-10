import { View, Text, StyleSheet, StatusBar } from "react-native";

import { useTheme } from "../../hooks/useTheme";

export default function AppearanceScreen() {
    const { colors, typography, theme } = useTheme();

    return(
        <View style={[styles.container, { backgroundColor: colors.background2 }]}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />
            <View>
                <Text style={[{ color: colors.text }]}>Apperance</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
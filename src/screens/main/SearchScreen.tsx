import { View, Text, StyleSheet } from "react-native";

import { TabScreenProps } from "../../types/navigation";

export default function SearchScreen({}: TabScreenProps<'SearchTab'>) {
    return (
        <View style={styles.container}>
            <Text>
                Search
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ececec',
    },
});
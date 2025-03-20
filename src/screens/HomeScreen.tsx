import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { HomeScreenProps } from "../types/navigation";
import { TestRepository } from "../api/repository/test";
import { User } from "../api/interface/userTest";

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
    const { data, isLoading, error } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: TestRepository.getUsers,
    });

    if (isLoading) {
        return <ActivityIndicator size="large" color='#0000ff' />
    };

    if (error) {
        return <Text>Error: {error.message}</Text>;
    };

    return (
        <View style={styles.container}>
            <FlatList 
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Text style={{ color: '#785' }}>{item.company.name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Routine, RoutineList } from "../types/Routines";
import { ResourceType, fetchData } from "../service/DataApi";
import Card, { CardSize } from "../components/Cards";
import { useRouter } from "expo-router";

export default function RoutinesList() {
    const [routines, setRoutines] = useState<Routine[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchData<RoutineList>(ResourceType.ROUTINES)
            .then((response) => setRoutines(response.data))
            .catch((error) => console.error("Error fetching routines: ", error));
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Listado de Rutinas</Text>
            <View style={styles.cardGrid}>
                {routines.map((routine) => (
                    <Card
                        key={routine.id}
                        size={CardSize.MEDIUM}
                        imageUrl="https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=2525&auto=format&fit=crop"
                        text={routine.name}
                        link={`/routines/${routine.id}`}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "center",
    },
    cardGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 16,
        maxWidth: 1224,
    },
});

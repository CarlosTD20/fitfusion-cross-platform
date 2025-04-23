import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { RoutineDetail } from "../types/Routines";
import { ResourceType, deleteItem, fetchItemById } from "../service/DataApi";
import Card, { CardSize } from "../components/Cards";

export default function RoutinesDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [selectedRoutine, setSelectedRoutine] = useState<RoutineDetail | null>(null);

    useEffect(() => {
        const fetchRoutine = async () => {
            try {
                const response = await fetchItemById<RoutineDetail>(ResourceType.ROUTINES, id as string);
                setSelectedRoutine(response.data);
            } catch (error) {
                console.error("Error fetching routine detail: ", error);
            }
        };

        fetchRoutine();
    }, [id]);

    const handleDelete = async (id: string) => {
        try {
            await deleteItem(ResourceType.ROUTINES, id);
            router.push("/routines/routinesList");
        } catch (error) {
            console.error("Error deleting routine: ", error);
        }
    };


    if (!selectedRoutine) return null;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.leftCard}>
                <Text style={styles.title}>Ejercicios de la Rutina</Text>
                <ScrollView contentContainerStyle={styles.exerciseList}>
                    {selectedRoutine.exercise.map((exercise) => (
                        <Card
                            key={exercise.id}
                            size={CardSize.SMALL}
                            imageUrl="https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=2525&auto=format&fit=crop"
                            text={exercise.name}
                            link={`/exercises/${exercise.id}`}
                        />
                    ))}
                </ScrollView>
            </View>

            <View style={styles.rightCard}>
                <Text style={styles.title}>Rutina {selectedRoutine.name}</Text>
                <Text style={styles.subtitle}>Descripción</Text>
                <Text style={styles.description}>{selectedRoutine.description}</Text>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.orangeButton}
                        onPress={() => router.push(`/routines/update/${id}`)}
                    >
                        <Text style={styles.darkText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.darkButton}
                        onPress={() => handleDelete(id as string)}
                    >
                        <Text style={styles.lightText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: "center",
    },
    leftCard: {
        width: "90%",
        borderRadius: 24,
        backgroundColor: "#f1f5f9",
        padding: 16,
        marginBottom: 24,
    },
    rightCard: {
        width: "90%",
        borderRadius: 24,
        backgroundColor: "#f1f5f9",
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 22,
        fontWeight: "600",
        marginTop: 16,
    },
    description: {
        fontSize: 16,
        marginTop: 8,
    },
    exerciseList: {
        gap: 12,
        alignItems: "center",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 24,
    },
    orangeButton: {
        backgroundColor: "#FFC635",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 18,
    },
    darkButton: {
        backgroundColor: "#1A212B",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 18,
    },
    darkText: {
        color: "#1A212B",
        fontWeight: "600",
    },
    lightText: {
        color: "white",
        fontWeight: "600",
    },
});

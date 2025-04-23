import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { fetchItemById, fetchData, updateItem, ResourceType } from "../../service/DataApi"
import { RoutineDetail, RoutineMock } from "../../types/Routines"
import { Exercise, ExerciseList } from "../../types/Exercises"
import { Button } from "react-native"

export default function RoutineUpdate() {

    const { id } = useLocalSearchParams()
    const router = useRouter()

    const [routineData, setRoutineData] = useState<RoutineDetail>({
        id: 0,
        name: "",
        description: "",
        exercise: [],
    })
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([])
    const [errorMessage, setErrorMessage] = useState<string>("")

    useEffect(() => {
        const fetchRoutineDetails = async () => {
            try {
                const response = await fetchItemById<RoutineDetail>(ResourceType.ROUTINES, id as string);

                if (response?.data) {
                    setRoutineData(response.data);

                    if (response.data.exercise && Array.isArray(response.data.exercise)) {
                        const existingExerciseIds = response.data.exercise.map(ex => ex.id);
                        setSelectedExerciseIds(existingExerciseIds);
                    } else {
                        console.log("No exercises found in routine data or not in expected format");
                        setSelectedExerciseIds([]);
                    }
                }
            } catch (error) {
                console.error('Error fetching routine detail:', error);
                setErrorMessage(error.response?.data?.message || "Error desconocido");
            }
        };

        fetchRoutineDetails();
    }, [id]);

    useEffect(() => {
        const getExercises = async () => {
            try {
                const response = await fetchData<ExerciseList>(ResourceType.EXERCISES);
                if (response?.data) {
                    setExercises(response.data);
                }
            } catch (error) {
                console.error('Error fetching exercises:', error);
                setErrorMessage(error.response?.data?.message || "Error al cargar ejercicios");
            }
        };

        getExercises();
    }, []);

    // Toggle selección de un ejercicio
    const toggleExerciseSelection = (exerciseId: number) => {
        setSelectedExerciseIds((prev) =>
            prev.includes(exerciseId)
                ? prev.filter((id) => id !== exerciseId)
                : [...prev, exerciseId]
        )
    }

    // Manejar actualización
    const handleUpdateRoutine = async () => {
        if (!routineData.name.trim()) {
            Alert.alert("Validación", "El nombre no puede estar vacío")
            return
        }
        try {
            const updated: RoutineMock = {
                name: routineData.name,
                description: routineData.description,
                exerciseId: selectedExerciseIds,
            }
            await updateItem(ResourceType.ROUTINES, id as string, updated)
            Alert.alert("Éxito", "Rutina actualizada correctamente", [
                { text: "OK", onPress: () => router.push(`/routines/${id}`) },
            ])
        } catch (e: any) {
            console.error("Error updating routine:", e)
            Alert.alert(
                "Error",
                e.response?.data?.message || "Error al actualizar la rutina"
            )
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Actualizar Rutina</Text>

            <Text style={styles.label}>Nombre:</Text>
            <TextInput
                style={styles.input}
                value={routineData.name}
                onChangeText={(text) =>
                    setRoutineData((prev) => ({ ...prev, name: text }))
                }
            />

            <Text style={styles.label}>Descripción:</Text>
            <TextInput
                style={[styles.input, { height: 80 }]}
                multiline
                value={routineData.description}
                onChangeText={(text) =>
                    setRoutineData((prev) => ({ ...prev, description: text }))
                }
            />

            <Text style={styles.label}>Ejercicios:</Text>
            {exercises.map((exercise) => (
                <TouchableOpacity
                    key={exercise.id}
                    style={styles.checkboxContainer}
                    onPress={() => toggleExerciseSelection(exercise.id)}
                >
                    <Ionicons
                        name={
                            selectedExerciseIds.includes(exercise.id)
                                ? "checkbox"
                                : "square-outline"
                        }
                        size={24}
                        color="#333"
                    />
                    <Text style={styles.checkboxLabel}>{exercise.name}</Text>
                </TouchableOpacity>
            ))}

            <View style={styles.button}>
                <Button title="Actualizar" onPress={handleUpdateRoutine} color="#FF8C00" />
            </View>
            <View style={styles.button}>
                <Button title="Cancelar" onPress={() => router.back()} color="#333" />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: "#f2f2f2",
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
    },
    button: {
        marginVertical: 8,
    },
})

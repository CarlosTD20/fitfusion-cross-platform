import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { fetchItemById, updateItem, fetchData, ResourceType } from "../../service/DataApi"
import { ExerciseDetail, ExerciseMock } from "../../types/Exercises"
import { Muscle } from "../../types/Muscles"

export default function ExerciseUpdate() {
    const { id } = useLocalSearchParams()
    const router = useRouter()

    const [exerciseData, setExerciseData] = useState({
        name: "",
        description: "",
        muscleId: "",
    })

    const [muscles, setMuscles] = useState<Muscle[]>([])
    const [selectedMuscleId, setSelectedMuscleId] = useState("")

    useEffect(() => {
        const fetchExerciseDetails = async () => {
            try {
                const response = await fetchItemById<ExerciseDetail>(ResourceType.EXERCISES, id as string)
                const detail = response.data
                const muscleIdStr = detail.muscle?.id?.toString() || ""

                setExerciseData({
                    name: detail.name,
                    description: detail.description,
                    muscleId: muscleIdStr,
                })
                setSelectedMuscleId(muscleIdStr)
            } catch (error) {
                console.error("Error fetching exercise detail:", error)
                Alert.alert("Error", "No se pudo cargar el ejercicio.")
            }
        }

        fetchExerciseDetails()

        fetchData<Muscle[]>(ResourceType.MUSCLES)
            .then((response) => setMuscles(response.data))
            .catch((error) => {
                console.error("Error fetching muscles:", error)
                Alert.alert("Error", "No se pudieron cargar los músculos.")
            })
    }, [id])

    const handleInputChange = (name: string, value: string) => {
        setExerciseData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleUpdateExercise = async () => {
        try {
            const updatedExercise: ExerciseMock = {
                name: exerciseData.name,
                description: exerciseData.description,
                muscleId: parseInt(selectedMuscleId),
            }

            await updateItem(ResourceType.EXERCISES, id as string, updatedExercise)
            Alert.alert("Éxito", "Ejercicio actualizado correctamente", [
                { text: "OK", onPress: () => router.push(`/exercises/${id}`) },
            ])
        } catch (error) {
            console.error("Error updating exercise:", error)
            Alert.alert("Error", error.response?.data?.message || "Error desconocido al actualizar")
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Actualizar Ejercicio</Text>

            <Text style={styles.label}>Nombre:</Text>
            <TextInput
                style={styles.input}
                value={exerciseData.name}
                onChangeText={(text) => handleInputChange("name", text)}
            />

            <Text style={styles.label}>Descripción:</Text>
            <TextInput
                style={styles.input}
                value={exerciseData.description}
                onChangeText={(text) => handleInputChange("description", text)}
            />

            <Text style={styles.label}>Músculo:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedMuscleId}
                    onValueChange={(itemValue) => {
                        setSelectedMuscleId(itemValue)
                    }}
                >
                    <Picker.Item label="Seleccionar Músculo" value="" />
                    {muscles.map((muscle) => (
                        <Picker.Item key={muscle.id} label={muscle.name} value={muscle.id.toString()} />
                    ))}
                </Picker>
            </View>

            <View style={styles.button}>
                <Button title="Actualizar" onPress={handleUpdateExercise} color="#FF8C00" />
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
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 24,
        backgroundColor: "#fff",
    },
    button: {
        marginVertical: 8,
    },
})

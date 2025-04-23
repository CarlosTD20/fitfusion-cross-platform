import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ResourceType, addItem, fetchData } from "../service/DataApi";
import { ExerciseMock } from "../types/Exercises";
import { Muscle } from "../types/Muscles";
import { Picker } from "@react-native-picker/picker";

export default function ExercisesInsert() {
    const router = useRouter();
    const [newExerciseName, setNewExerciseName] = useState('');
    const [newExerciseDescription, setNewExerciseDescription] = useState('');
    const [muscles, setMuscles] = useState<Muscle[]>([]);
    const [selectedMuscleId, setSelectedMuscleId] = useState<number | null>(null);

    useEffect(() => {
        fetchData<Muscle[]>(ResourceType.MUSCLES)
            .then((response) => setMuscles(response.data))
            .catch(error => console.error('Error fetching muscles:', error));
    }, []);

    const handleAddExercise = async () => {
        if (!newExerciseName || !newExerciseDescription || !selectedMuscleId) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }

        try {
            const newExercise: ExerciseMock = {
                name: newExerciseName,
                description: newExerciseDescription,
                muscleId: selectedMuscleId
            };
            await addItem<ExerciseMock>(ResourceType.EXERCISES, newExercise);
            Alert.alert("Éxito", "Ejercicio añadido correctamente");
            router.replace("/");
        } catch (error: any) {
            console.error("Error adding exercise:", error);
            Alert.alert("Error", error.response?.data?.message || "Ocurrió un error inesperado");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Nuevo Ejercicio</Text>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Nombre del Ejercicio:</Text>
                <TextInput
                    style={styles.input}
                    value={newExerciseName}
                    onChangeText={setNewExerciseName}
                    placeholder="Ingrese el nombre"
                />

                <Text style={styles.label}>Descripción del Ejercicio:</Text>
                <TextInput
                    style={styles.input}
                    value={newExerciseDescription}
                    onChangeText={setNewExerciseDescription}
                    placeholder="Ingrese la descripción"
                />

                <Text style={styles.label}>Seleccionar Músculo:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedMuscleId}
                        onValueChange={(itemValue) => setSelectedMuscleId(Number(itemValue))}
                    >
                        <Picker.Item label="Seleccione el Músculo" value={null} />
                        {muscles.map((muscle) => (
                            <Picker.Item key={muscle.id} label={muscle.name} value={muscle.id} />
                        ))}
                    </Picker>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
                    <Text style={styles.addButtonText}>Añadir</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => router.replace("/")}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0A2647',
        marginBottom: 20,
        fontFamily: 'Archivo-Bold'
    },
    formContainer: {
        width: '100%',
        maxWidth: 600,
        backgroundColor: '#E4EDEB',
        padding: 20,
        borderRadius: 12,
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontFamily: 'Archivo'
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        maxWidth: 600,
    },
    addButton: {
        backgroundColor: '#F1F6F9',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 12,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0A2647',
        fontFamily: 'Archivo'
    },
    cancelButton: {
        backgroundColor: '#0A2647',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 12,
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Archivo'
    }
});

import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { addItem, fetchData, ResourceType } from "../service/DataApi";
import { RoutineMock } from "../types/Routines";
import { Exercise, ExerciseList } from "../types/Exercises";

export default function RoutineInsert() {
  const router = useRouter();

  const [routineData, setRoutineData] = useState<RoutineMock>({
    name: "",
    description: "",
    exerciseId: [],
  });

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const getExercises = async () => {
      try {
        const response = await fetchData<ExerciseList>(ResourceType.EXERCISES);
        setExercises(response.data);
      } catch (error: any) {
        console.error("Error fetching exercises:", error);
        setErrorMessage(error.response?.data?.message || "Error al cargar ejercicios");
      }
    };

    getExercises();
  }, []);

  const toggleExerciseSelection = (exerciseId: number) => {
    setSelectedExerciseIds((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const handleInsertRoutine = async () => {
    if (!routineData.name.trim()) {
      Alert.alert("Validación", "El nombre no puede estar vacío");
      return;
    }

    try {
      const newRoutine: RoutineMock = {
        name: routineData.name,
        description: routineData.description,
        exerciseId: selectedExerciseIds,
      };

      await addItem<RoutineMock>(ResourceType.ROUTINES, newRoutine);
      Alert.alert("Éxito", "Rutina insertada correctamente", [
        { text: "OK", onPress: () => router.push("/") },
      ]);
    } catch (e: any) {
      console.error("Error inserting routine:", e);
      Alert.alert("Error", e.response?.data?.message || "Error al insertar la rutina");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nueva Rutina</Text>

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
        <Button title="Insertar" onPress={handleInsertRoutine} color="#FF8C00" />
      </View>
      <View style={styles.button}>
        <Button title="Cancelar" onPress={() => router.back()} color="#333" />
      </View>
    </ScrollView>
  );
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
});

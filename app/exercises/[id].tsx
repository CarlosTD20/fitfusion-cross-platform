import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { ExerciseDetail } from '../types/Exercises';
import { ResourceType, deleteItem, fetchItemById } from '../service/DataApi';
import GameCard, { CardSize } from '../components/Cards';

const ExercisesDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [selectedExercise, setSelectedExercise] = useState<ExerciseDetail | null>(null);

  useEffect(() => {
    const handleSelectExercise = async () => {
      try {
        const response = await fetchItemById<ExerciseDetail>(ResourceType.EXERCISES, id);
        setSelectedExercise(response.data);
      } catch (error) {
        console.error('Error fetching exercise detail:', error);
      }
    };

    if (id) handleSelectExercise();
  }, [id]);

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(ResourceType.EXERCISES, id);
      router.push("/exercises/exerciseList");
    } catch (error) {
      console.error("Error deleting exercise: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.leftBox}>
        <Text style={styles.title}>Detalle Ejercicio</Text>
        <View style={styles.cardContainer}>
          {selectedExercise?.muscle && (
            <GameCard
              size={CardSize.SMALL}
              imageUrl="https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=2525&auto=format&fit=crop"
              text={selectedExercise.muscle.name}
              link={`/muscles/${selectedExercise.muscle.id}`}
            />
          )}
        </View>
      </View>

      <View style={styles.rightBox}>
        <Text style={styles.title}>Ejercicio {selectedExercise?.name}</Text>
        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.description}>{selectedExercise?.description}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push(`/exercises/update/${id}`)}>
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(id as string)}>
            <Text style={styles.deleteText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ExercisesDetail;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: 'center',
  },
  leftBox: {
    width: width * 0.9,
    backgroundColor: '#f1f5f9',
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  rightBox: {
    width: width * 0.9,
    backgroundColor: '#f1f5f9',
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Archivo',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 16,
    fontFamily: 'Archivo',
  },
  description: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: '500',
  },
  cardContainer: {
    marginVertical: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  editButton: {
    backgroundColor: '#FFBA08',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 18,
  },
  deleteButton: {
    backgroundColor: '#03071E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 18,
  },
  editText: {
    color: '#03071E',
    fontWeight: 'bold',
    fontFamily: 'Archivo',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Archivo',
  },
});
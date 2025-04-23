import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import { ResourceType, fetchData } from '../service/DataApi';
import { Exercise, ExerciseList } from '../types/Exercises';
import Cards, { CardSize } from '../components/Cards';

export default function ExercisesList() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    fetchData<ExerciseList>(ResourceType.EXERCISES)
      .then((response) => setExercises(response.data))
      .catch((error) => console.error('Error fetching exercises:', error));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Listado de Ejercicios</Text>

      <View style={styles.cardGrid}>
        {exercises.map((exercise) => (
          <Cards
            key={exercise.id}
            size={CardSize.MEDIUM}
            imageUrl="https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=2525&auto=format&fit=crop"
            text={exercise.name}
            link={`/exercises/${exercise.id}`}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    maxWidth: 1224,
  },
  card: {
    width: 396,
    height: 202,
    margin: 8,
    borderRadius: 24,
    overflow: 'hidden',
  },
  cardImage: {
    borderRadius: 24,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(75, 75, 75, 0.4)',
    justifyContent: 'flex-end',
    padding: 24,
  },
  cardText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

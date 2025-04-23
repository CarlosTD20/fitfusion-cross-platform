import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Muscle, MuscleList } from '../types/Muscles'; // Asegúrate de tenerlo en tu carpeta mobile
import { ResourceType, fetchData } from '../service/DataApi';
import Card, { CardSize } from '../components/Cards';

export default function MusclesList() {
  const [muscles, setMuscles] = useState<Muscle[]>([]);

  useEffect(() => {
    fetchData<MuscleList>(ResourceType.MUSCLES)
      .then((response) => setMuscles(response.data))
      .catch(error => console.error('Error fetching muscles:', error));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Listado de Músculos</Text>

      <View style={styles.cardGrid}>
        {muscles.map((muscle) => (
          <Card
            key={muscle.id}
            size={CardSize.MEDIUM}
            imageUrl="https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=2525&auto=format&fit=crop"
            text={muscle.name}
            link={`/muscles/${muscle.id}`}
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
    maxWidth: 1224,
    gap: 16,
  },
});

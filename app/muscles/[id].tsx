import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ImageBackground, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { MuscleDetail } from '../types/Muscles';
import { fetchItemById, ResourceType } from '../service/DataApi';
import muscleImages from '../utils/muscleImage';

export default function MusclesDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleDetail | null>(null);

  useEffect(() => {
    const getMuscle = async () => {
      try {
        const response = await fetchItemById<MuscleDetail>(ResourceType.MUSCLES, id as string);
        setSelectedMuscle(response.data);
      } catch (err) {
        console.error('Error fetching muscle detail:', err);
      }
    };

    getMuscle();
  }, [id]);

  const fallbackImage = require('../../assets/images/favicon.png'); // en caso de que no haya
  const imageSource = muscleImages[selectedMuscle?.id ?? 0] || fallbackImage;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Mostrar el título y la imagen del músculo primero */}
      {selectedMuscle && (
        <View style={styles.muscleInfo}>
          <Text style={styles.title}>{selectedMuscle.name}</Text>
          <Image source={imageSource} style={styles.muscleImage} />
        </View>
      )}

      {/* Mostrar la lista de ejercicios */}
      <View style={[styles.cardLeft, { height: selectedMuscle?.exercise.length * 100 + 200 }]}>
        <Text style={styles.heading}>Ejercicios del Músculo</Text>
        <View style={styles.exerciseList}>
          {selectedMuscle?.exercise.map((exercise) => (
            <Pressable
              key={exercise.id}
              onPress={() => router.push(`/exercises/${exercise.id}`)}
              style={styles.exerciseCard}
            >
              <ImageBackground
                source={{
                  uri: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=2525&auto=format&fit=crop',
                }}
                style={styles.exerciseImage}
                imageStyle={styles.imageBackground}
              >
                <View style={styles.overlay}>
                  <Text style={styles.cardText}>{exercise.name}</Text>
                </View>
              </ImageBackground>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'column', // Cambiado a columna para apilar los elementos verticalmente
    justifyContent: 'flex-start', // Asegura que los elementos se alineen hacia arriba
  },
  muscleInfo: {
    alignItems: 'center', // Centra la imagen y el nombre del músculo
    marginBottom: 24, // Espacio debajo del título y la imagen
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  muscleImage: {
    width: 300, // Imagen del músculo un poco más pequeña
    height: 225, // Se mantiene proporcional
    resizeMode: 'contain',
    borderRadius: 24,
    backgroundColor: 'transparent',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  cardLeft: {
    width: '100%',
    backgroundColor: '#f1f5f9',
    borderRadius: 24,
    padding: 16,
    margin: 12,
    alignItems: 'center',
    elevation: 3,
  },
  exerciseList: {
    width: '100%',
    gap: 12,
  },
  exerciseCard: {
    marginBottom: 12,
  },
  exerciseImage: {
    width: 334,
    height: 79,
    borderRadius: 14,
    overflow: 'hidden',
  },
  imageBackground: {
    borderRadius: 14,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(75,75,75,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

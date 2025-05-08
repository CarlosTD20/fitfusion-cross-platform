import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Alert } from "react-native";
import { Link } from "expo-router";

function BodyBento() {
  const [correo, setCorreo] = useState('');

  const handleEnviar = () => {
    if (correo) {
      Alert.alert("!Gracias por subcrirse a FitFusion¡")
    }
    setCorreo('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.infoCard}>
          <View style={styles.infoCardContent}>
            <Text style={styles.infoText}>
              ¡Descubre FitFusion y comienza a mejorar tu condición física! Nuestra plataforma te ofrece una amplia variedad de entrenamientos físicos. ¡Además, con FitFusion, tienes la libertad de crear y personalizar tus propios ejercicios para adaptar la plataforma a tus necesidades y preferencias específicas!
            </Text>
          </View>
        </View>

        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
          style={styles.largeCard}
          imageStyle={styles.roundedBackground}
        >
          <View style={styles.buttonRow}>
            <Link href="/routines/routinesList" asChild>
              <TouchableOpacity style={styles.yellowButton}>
                <Text style={styles.darkButtonText}>Ver Rutinas</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/routines/routinesInsert" asChild>
              <TouchableOpacity style={styles.darkButton}>
                <Text style={styles.lightButtonText}>Crea tu Rutina</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.tripletContainer}>
        <View style={styles.cardContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.cardImage}
            imageStyle={styles.roundedBackground}
          />
          <View style={styles.buttonRow}>
            <Link href="/exercises/exerciseList" asChild>
              <TouchableOpacity style={styles.yellowButton}>
                <Text style={styles.darkButtonText}>Ver Ejercicios</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/exercises/exerciseInsert" asChild>
              <TouchableOpacity style={styles.darkButton}>
                <Text style={styles.lightButtonText}>Crea tu Ejercicio</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.cardImage}
            imageStyle={styles.roundedBackground}
          />
          <View style={styles.buttonRow}>
            <Link href="/routines/routinesList" asChild>
              <TouchableOpacity style={styles.yellowButton}>
                <Text style={styles.darkButtonText}>Ver Rutinas</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/routines/routinesInsert" asChild>
              <TouchableOpacity style={styles.darkButton}>
                <Text style={styles.lightButtonText}>Crea tu Rutina</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=2525&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.cardImage}
            imageStyle={styles.roundedBackground}
          />
          <View style={[styles.buttonRow, styles.centerButton]}>
            <Link href="/muscles/musclesList" asChild>
              <TouchableOpacity style={[styles.yellowButton]}>
                <Text style={styles.darkButtonText}>Ver Músculos</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>

      <View style={styles.contactContainer}>
        <View style={styles.contactCard}>
          <View style={styles.contactTitleContainer}>
            <Text style={styles.contactTitle}>Contacta con nosotros</Text>
          </View>
          <View style={styles.contactInputContainer}>
            <TextInput
              style={styles.contactInput}
              placeholder="Ingresa tu correo electrónico"
              value={correo}
              onChangeText={setCorreo}
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.darkButton} onPress={handleEnviar}>
              <Text style={styles.lightButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    gap: 22,
  },
  infoCard: {
    width: 380,
    height: 378,
    borderRadius: 24,
    backgroundColor: '#1A212B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCardContent: {
    maxWidth: 300,
  },
  infoText: {
    color: '#f0f0f0',
    textAlign: 'justify',
    fontWeight: '600',
    fontSize: 16,
  },
  largeCard: {
    width: 380,
    height: 378,
    borderRadius: 24,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 32,
    marginTop: 22,
  },
  roundedBackground: {
    borderRadius: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 8,
    width: '100%',
  },
  yellowButton: {
    width: 147,
    height: 53,
    borderRadius: 18,
    backgroundColor: '#FFC635',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wideButton: {
    width: 210,
  },
  darkButton: {
    width: 147,
    height: 53,
    borderRadius: 18,
    backgroundColor: '#1A212B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkButtonText: {
    color: '#1A212B',
    fontWeight: '600',
  },
  lightButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  tripletContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    gap: 22,
  },
  cardContainer: {
    height: 268,
    width: 396,
    borderRadius: 24,
    marginBottom: 22,
    backgroundColor: '#f1f5f9',
  },
  cardImage: {
    width: 396,
    height: 202,
    borderRadius: 24,
    overflow: 'hidden',
  },
  centerButton: {
    justifyContent: 'center',
  },
  contactContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
  },
  contactCard: {
    width: 396,
    padding: 24,
    height: 214,
    borderRadius: 24,
    backgroundColor: '#FFC635',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  contactTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactTitle: {
    color: '#1A212B',
    fontWeight: '600',
    fontSize: 28,
  },
  contactInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  contactInput: {
    height: 67,
    width: 200,
    borderRadius: 18,
    backgroundColor: 'white',
    padding: 16,
    margin: 8,
  },
});

export default BodyBento;
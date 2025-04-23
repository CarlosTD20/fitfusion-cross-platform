import { Platform, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.container}>
      <View
        // Aquí combinamos el estilo base con un style inline solo para web:
        style={[
          styles.headerBox,
          Platform.OS === 'web' && { boxShadow: '0px 2px 6px rgba(26, 33, 43, 0.1)' }
        ]}
      >
        <Link href="/" asChild>
          <TouchableOpacity style={styles.logo}>
            <Text style={styles.fitText}>Fit</Text>
            <Text style={styles.fusionText}>Fusion</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <Link href="/routines/routinesList" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Empieza a Entrenar</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 14,
    paddingTop: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 22,
  },
  headerBox: {
    flexDirection: 'row',
    height: 76,
    width: '100%',
    maxWidth: 1042,
    borderRadius: 24,
    backgroundColor: '#F6F8FB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    // Sombras solo para Android:
    elevation: Platform.OS === 'android' ? 4 : 0,
  },
  logo: {
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fitText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#1A212B',
    fontFamily: 'Archivo',
  },
  fusionText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#FFC635',
    fontFamily: 'Archivo',
  },
  button: {
    height: 67,
    width: 175,
    borderRadius: 18,
    backgroundColor: '#FFC635',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#1A212B',
    fontFamily: 'Archivo',
    fontWeight: '600',
    textAlign: 'center',
  },
});

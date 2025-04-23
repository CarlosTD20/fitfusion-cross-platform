import { View, Text, StyleSheet, Platform } from 'react-native';

export default function Footer() {
  const currentYear: number = new Date().getFullYear();

  return (
    <View style={styles.container}>
      <View style={styles.footerBox}>
        <Text style={styles.text}>
          © {currentYear} Carlos Tornero. Todos los derechos reservados.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 14,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    gap: 22,
  },
  footerBox: {
    position: 'relative',
    height: 76,
    width: '100%',
    maxWidth: 1224,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: '#1A1A1A', // reemplazá si tenías otro color
    ...(Platform.OS === 'web'
      ? {
        boxShadow: '0px 2px 6px rgba(26, 33, 43, 0.1)',
      }
      : {
        shadowColor: '#1A212B',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
      }),
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Archivo', // si la estás usando, si no reemplazá
  },
});

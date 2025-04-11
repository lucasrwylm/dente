import { StyleSheet, Text, View, Pressable, ImageBackground } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/originals/e7/93/20/e793209158cce225d124ac8c6e810269.jpg' }}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>CARILNHOS ODONTOLOGIA</Text>
      <Text style={styles.subtitle}>ODONTOLOGIA AO ALCANCE DE TODOS</Text>

      <View style={styles.menuContainer}>
        <Link href="/Servicos" asChild>
          <Pressable style={styles.menuButton}>
            <Text style={styles.buttonText}>🦷 Serviços</Text>
          </Pressable>
        </Link>

        <Link href="/Agendametos" asChild>
          <Pressable style={styles.menuButton}>
            <Text style={styles.buttonText}>📅 Agendamentos</Text>
          </Pressable>
        </Link>

        <Link href="/Usuarios" asChild>
          <Pressable style={styles.menuButton}>
            <Text style={styles.buttonText}>👤 Usuários</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Contato: (24) 4002-8922</Text>
        <Text style={styles.footerText}>MinhaPica/Rj</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'rgba(0, 128, 128, 0.8)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 14,
    color: '#d0f0f7',
    marginBottom: 40,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  menuContainer: {
    width: '100%',
    gap: 20,
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#008bb5',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007acc',
  },
  footer: {
    marginTop: 50,
    alignItems: 'center',
  },
  footerText: {
    color: '#e0f7fa',
    fontSize: 13,
  },
});

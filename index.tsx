import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const servicos = [
   { label: '', route: '/', icon: '' },
  { label: '', route: '/', icon: '' },
  { label: '', route: '/', icon: '' },
  { label: '', route: '/', icon: '' },
  { label: '', route: '/', icon: '' },
  { label: '', route: '/', icon: '' },
  { label: '', route: '/', icon: '' },
  { label: '', route: '/', icon: '' },
  { label: '', route: '/', icon: '' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Nome do App */}
        <Text style={styles.title}>DENTINHO FELIZ</Text>

        {/* Quem Somos */}
        <View style={styles.aboutCard}>
          <MaterialCommunityIcons
            name="book-open-outline"
            size={40}
            color="#ffffff"
            style={styles.aboutIcon}
          />
          <Text style={styles.aboutTitle}>Quem somos?</Text>
          <Text style={styles.aboutText}>
            O aplicativo Dentinho Feliz foi desenvolvido especialmente para a comunidade de odontologia.
            Aqui você sempre vai encontrar diversas informações, e um lugar especial para compartilhar conhecimentos.
          </Text>
        </View>

        {/* Serviços */}
        <View style={styles.servicosContainer}>
          {servicos.map((item, index) => (
            <Link key={index} href={item.route} asChild>
              <Pressable style={styles.serviceCard}>
                {item.icon && (
                  <Image source={{ uri: item.icon }} style={styles.icon} resizeMode="contain" />
                )}
                <Text style={styles.serviceText}>{item.label}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 100,
  },
  title: {
    fontSize: 28, // maior, mas não exagerado
    fontWeight: '700',
    color: '#6bb2b4',
    marginBottom: 24,
    textAlign: 'center',
    width: '100%',
  },
  aboutCard: {
    backgroundColor: '#6bb2b4',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    alignItems: 'center',
    marginBottom: 32,
  },
  aboutIcon: {
    marginBottom: 16,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  aboutText: {
    color: '#e6fafa',
    fontSize: 15,
    textAlign: 'center',
  },
  servicosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  serviceCard: {
    width: 100, // ideal para 3x3 em uma tela normal
    height: 110,
    marginBottom: 16,
    marginHorizontal: 8,
    backgroundColor: '#6bb2b4',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 44,
    height: 44,
    tintColor: '#ffffff',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 13,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#ffffff',
  },
});

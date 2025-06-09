import { Servicos } from '@/constants/servicos';
import { StyleSheet, Text, FlatList, View, ImageBackground } from 'react-native';

export default function ServicosScreen() {
  return (
    <ImageBackground
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>🦷 Serviços</Text>

      <View style={styles.table}>
        {/* Cabeçalho da tabela */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Tipo</Text>
        </View>

        {/* Lista de serviços */}
        <FlatList
          data={Servicos()}
          keyExtractor={(item) => item.id_servico.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.nome_servico}</Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 128, 128, 0.85)',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  table: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: '#e0f7fa',
    borderBottomWidth: 2,
    borderColor: '#007acc',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#007acc',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 13,
    color: '#34495e',
    textAlign: 'center',
  },
});

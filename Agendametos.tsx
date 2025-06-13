import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';

type Agendamento = {
  id_agendamento: number;
  data: string;
  hora: string;
  nome_cliente: string;
  nome_profissional: string;
};

export default function AgendamentosScreen() {
  const navigation = useNavigation();
  const [agendamentos, setAgendamentos] = useState<Agendamento[] | null>(null);
  useEffect(() => {

    const getAgendamentos = async () => {
      try {
        const response = await fetch('http://localhost/agendamentos/agendamento');
        const data = await response.json();
        setAgendamentos(data.agendamento);
        console.error('users:', data.agendamento);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    getAgendamentos();
  }, []);

  return (
    <ImageBackground style={styles.container} resizeMode="cover">
      <Text style={styles.title}>📅 Agendamentos</Text>

      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Data</Text>
          <Text style={styles.headerCell}>Hora</Text>
          <Text style={styles.headerCell}>Cliente</Text>
          <Text style={styles.headerCell}>Profissional</Text>
        </View>

        {agendamentos === null ? (
          <ActivityIndicator size="large" color="#007acc" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={agendamentos}
            keyExtractor={(item, index) =>
              item?.id_agendamento?.toString() ?? `agendamento-${index}`
            }
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.data}</Text>
                <Text style={styles.cell}>{item.agenda.horario}</Text>
                <Text style={styles.cell}>{item.usuario.nome}</Text>
                <Text style={styles.cell}>{item.agenda.usuario.nome}</Text>
              </View>
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  voltar: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
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

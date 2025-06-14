import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';

type User = {
  id_usuario: number;
  id_grupo: number;
  data_nascimento: string;
  nome: string;
  nome_grupo: string;
  email: string;
};

export default function ListaUsuarios() {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const response = await fetch('http://localhost/agendamentos/cliente'); 
        const data = await response.json();
        console.log('Resposta da API:', data);

        // Verifique se "usuarios" existe e é um array
        if (Array.isArray(data.usuarios)) {
          setUsers(data.usuarios);
        } else {
          console.warn('Formato de resposta inesperado:', data);
          setUsers([]); // Evita erros de undefined
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setUsers([]); // Evita loop de loading eterno
      }
    };

    getUsuarios();
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>👤 Clientes</Text>

      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Nome</Text>
          <Text style={styles.headerCell}>Grupo</Text>
        </View>

        {/* Lista de usuários ou indicador de carregamento */}
        {users === null ? (
          <ActivityIndicator size="large" color="#007acc" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item, index) =>
              item?.id_usuario?.toString() ?? `user-${index}`
            }
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.nome}</Text>
                <Text style={styles.cell}>{item.id_grupo}</Text>
              </View>
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6bb2b4',
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

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

import { StyleSheet, Text, FlatList, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
// import { Usuarios } from '@/constants/usuario';


type Agenda = {
  id_agenda: number;
  id_usuario: number;
  dia_da_semana: number;
  horario: string;
};



type User = {
  id: number;
  nome: string;
  nome_grupo: string;
};

export default function ListaAgendas() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [agendas, setAgenda] = useState<Agenda[] | null>(null);
  useEffect(() => {

    const getAgendas = async () => {
      try {
        const response = await fetch('http://localhost/agendamentos/get-agenda');
        // const response = await fetch('https://novo.mobi-rio.rio.br/get-avisos');
        const data = await response.json();
        setAgenda(data.agendas);
        console.error('users:', data.agendas);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    getAgendas();
  }, []);

  useEffect(() => {
        const getUsuarios = async () => {
            try {
                const response = await fetch('http://localhost/agendamentos/usuarios');
                const data = await response.json();
                setUsers(data.usuarios || []);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                setUsers([]);
           }
        };
        getUsuarios();
    }, []);

  const dia_semana = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ]
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de agendas</Text>

      <Link href="CadastrarAgenda" asChild>
        <Text>Criar Agenda</Text>
      </Link>

      <FlatList
        data={agendas || []}
        keyExtractor={(item) => item.id_agenda.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Id: {item.id_agenda}</Text>
            <Text>Profissional: {item.usuarios.nome_usuario}</Text>
            <Text>Dia da semana: {dia_semana[item.dia_da_semana]}</Text>
            <Text>Horário: {item.horario}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    ShadowOffset: { width: 0, height: 2 },
    ShadowOpacity: 0.1,
    boxboxShadowRadius: 4,
    elevation: 3,
  },
});

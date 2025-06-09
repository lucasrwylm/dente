import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

type User = {
  id_usuario: number;
  nome_usuario: string;
};

type Servico = {
  id_servico: number;
  nome_servico: string;
};

const dia_semana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function MountarAgendamentos({ agendamentos, id_usuario, id_servico, data }) {
  const router = useRouter();

  const reservar = async (id_agenda: number) => {
    const dados = { id_agenda, id_usuario, id_servico, data };
    try {
      const response = await fetch('http://localhost/agendamentos/criar-agendamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        router.push('Agendamentos');
      } else {
        const errorText = await response.text();
        console.error('Erro ao salvar:', errorText);
        Alert.alert('Erro', 'Não foi possível salvar os dados.');
      }
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Não foi possível enviar os dados.');
    }
  };

  return (
    <FlatList
      data={agendamentos || []}
      keyExtractor={(item) => item.id_agenda.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.cardText}>Profissional: {item.usuario?.nome_usuario}</Text>
          <Text style={styles.cardText}>Dia da semana: {dia_semana[item.dia_da_semana]}</Text>
          <Text style={styles.cardText}>Horário: {item.horario}</Text>
          <TouchableOpacity onPress={() => reservar(item.id_agenda)} style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>Reservar</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

export default function FormularioAgendamento() {
  const [users, setUsers] = useState<User[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [form, setForm] = useState({
    data: new Date(),
    cliente: '',
    servico: '',
  });

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const response = await fetch('http://localhost/agendamentos/usuarios-clientes');
        const data = await response.json();
        setUsers(data.usuarios || []);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setUsers([]);
      }
    };
    getUsuarios();
  }, []);

  useEffect(() => {
    const getServicos = async () => {
      try {
        const response = await fetch('http://localhost/agendamentos/get-servicos');
        const data = await response.json();
        setServicos(data.servicos || []);
      } catch (error) {
        console.error('Erro ao buscar serviços:', error);
        setServicos([]);
      }
    };
    getServicos();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) setForm({ ...form, data: selectedDate });
    setShowDatePicker(false);
  };

  const handleSubmit = async () => {
    const dados = {
      data: form.data.toISOString().split('T')[0],
      cliente: form.cliente,
      servico: form.servico,
    };

    try {
      const response = await fetch('http://localhost/agendamentos/preparar-agendamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        const data = await response.json();
        setAgendamentos(data.agendamentos || []);
      } else {
        const errorText = await response.text();
        console.error('Erro ao salvar:', errorText);
        Alert.alert('Erro', 'Não foi possível salvar os dados.');
      }
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Não foi possível enviar os dados.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.form}>
        <Text style={styles.title}>Agendamento</Text>

        <Text style={styles.label}>Data</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>📅 {form.data.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={form.data}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Cliente</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.cliente}
            onValueChange={(itemValue) => setForm({ ...form, cliente: itemValue })}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um cliente" value="" />
            {users.map((user) => (
              <Picker.Item key={user.id_usuario} label={user.nome_usuario} value={user.id_usuario} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Serviço</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.servico}
            onValueChange={(itemValue) => setForm({ ...form, servico: itemValue })}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um serviço" value="" />
            {servicos.map((servico) => (
              <Picker.Item key={servico.id_servico} label={servico.nome_servico} value={servico.id_servico} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Buscar Horários</Text>
        </TouchableOpacity>

        {agendamentos.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Horários disponíveis:</Text>
            <MountarAgendamentos
              agendamentos={agendamentos}
              id_usuario={form.cliente}
              id_servico={form.servico}
              data={form.data.toISOString().split('T')[0]}
            />
          </>
        ) : (
          <Text style={styles.sectionTitle}>Nenhum horário disponível para essa data.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 128, 128, 0.85)',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007acc',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b3d9ff',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#b3d9ff',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#00aaff',
    borderRadius: 8,
    marginBottom: 12,
  },
  dateText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#00cc99',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  sectionTitle: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
  },
  reserveButton: {
    backgroundColor: '#007acc',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  reserveButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

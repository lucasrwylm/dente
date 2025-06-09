import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";

type User = {
  id_usuario: number;
  nome_usuario: string;
};

export default function CadastroUsuario() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  const [form, setForm] = useState({
    horario_inicio: '',
    horario_final: '',
    dia_da_semana: '',
    id_usuario: ''
  });

  const handleSubmit = async () => {
    const dados = { ...form };

    try {
      const response = await fetch("http://localhost/agendamentos/criar-agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        router.push('/agendas');
      } else {
        const errorText = await response.text();
        console.error("Erro ao salvar:", errorText);
        Alert.alert("Erro", "Não foi possível salvar os dados.");
      }
    } catch (error) {
      console.error("Erro:", error);
      Alert.alert("Erro", "Não foi possível enviar os dados.");
    }
  };

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const response = await fetch('http://localhost/agendamentos/usuarios-profissional');
        const data = await response.json();
        setUsers(data.usuarios || []);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setUsers([]);
      }
    };
    getUsuarios();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.form}>
        <Text style={styles.title}>Cadastro de Agenda</Text>

        <Text style={styles.label}>Horário Início</Text>
        <TextInput
          style={styles.input}
          value={form.horario_inicio}
          onChangeText={(text) => setForm({ ...form, horario_inicio: text })}
          placeholder="Ex: 08:00"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Horário Final</Text>
        <TextInput
          style={styles.input}
          value={form.horario_final}
          onChangeText={(text) => setForm({ ...form, horario_final: text })}
          placeholder="Ex: 17:00"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Dia da Semana</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.dia_da_semana}
            onValueChange={(itemValue) => setForm({ ...form, dia_da_semana: itemValue })}
            style={styles.picker}
          >
            <Picker.Item label="Selecione o dia" value="" />
            <Picker.Item label="Domingo" value={0} />
            <Picker.Item label="Segunda-feira" value={1} />
            <Picker.Item label="Terça-feira" value={2} />
            <Picker.Item label="Quarta-feira" value={3} />
            <Picker.Item label="Quinta-feira" value={4} />
            <Picker.Item label="Sexta-feira" value={5} />
            <Picker.Item label="Sábado" value={6} />
          </Picker>
        </View>

        <Text style={styles.label}>Profissional</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.id_usuario}
            onValueChange={(itemValue) => setForm({ ...form, id_usuario: itemValue })}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um profissional" value="" />
            {users.map((user) => (
              <Picker.Item key={user.id_usuario} label={user.nome_usuario} value={user.id_usuario} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007acc',
    textAlign: 'center',
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
  button: {
    backgroundColor: '#00cc99',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

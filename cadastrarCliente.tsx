import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CadastroUsuario() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    id_grupo: 1,
    data_de_nascimento: new Date(),
  });

  // const [showDatePicker, setShowDatePicker] = useState(false);

  // const handleDateChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || form.data_de_nascimento;
  //   setShowDatePicker(Platform.OS === 'ios');
  //   setForm({ ...form, data_de_nascimento: currentDate });
  // };

  const handleSubmit = async () => {
    const dados = {
      ...form,
      data_de_nascimento: form.data_de_nascimento.toISOString().split('T')[0],
      id_grupo: Number(form.id_grupo),
    };

    try {
      const jsonValue = JSON.stringify(dados);
      const response = await fetch('http://localhost/agendamentos/criar-usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonValue,
      });

      if (response.ok) {
        router.push('/Usuarios');
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
    <ImageBackground
      source={{
  
      }}
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <Text style={styles.title}>Cadastro</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={form.nome}
            onChangeText={(text) => setForm({ ...form, nome: text })}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={form.email}
            keyboardType="email-address"
            onChangeText={(text) => setForm({ ...form, email: text })}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={form.senha}
            secureTextEntry
            onChangeText={(text) => setForm({ ...form, senha: text })}
          />

          <Text style={styles.label}>Grupo</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.id_grupo}
              onValueChange={(itemValue) => setForm({ ...form, id_grupo: itemValue })}
              style={styles.picker}
            >
              <Picker.Item label="Admin" value={1} />
              <Picker.Item label="Profissional" value={2} />
              <Picker.Item label="Cliente" value={3} />
            </Picker>
          </View>

          {/* <Text style={styles.label}>Data de Nascimento</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
            <Text style={styles.dateText}>📅 {form.data_de_nascimento.toLocaleDateString()}</Text>
          </TouchableOpacity> */}

           {/* {showDatePicker && (
            <DateTimePicker
              value={form.data_de_nascimento}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}  */}

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#6bb2b4'
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  form: {
    width: '100%',
    maxWidth: 400,
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
    marginBottom: 20,
    color: '#007acc',
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
}); 
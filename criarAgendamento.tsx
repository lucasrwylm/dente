import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type User = {
    id_usuario: number;
    id_grupo: number;
    data_de_nascimento: string;
    nome_usuario: string;
    nome_grupo: string;
    email: string;
};

type Servico = {
    id_servico: number;
    nome_servico: string;
    valor: number;
};

const dia_semana = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
];

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
                router.push('agendamento');
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
                    <Text>Profissional: {item.usuario?.nome_usuario}</Text>
                    <Text>Dia da semana: {dia_semana[item.dia_da_semana]}</Text>
                    <Text>Horário: {item.horario}</Text>
                    <View style={{ margin: 10 }}>
                        <Button title="Reservar" onPress={() => reservar(item.id_agenda)} />
                    </View>
                </View>
            )}
        />
    );
}

export default function FormularioAgendamento() {
    const [users, setUsers] = useState<User[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [agendamentos, setAgendamentos] = useState([]);

    const [form, setForm] = useState({
        data: '',
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

    const handleSubmit = async () => {
        const dados = { ...form };
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
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Data do Agendamento:</Text>
            <TextInput
                style={styles.input}
                value={form.data}
                onChangeText={(text) => setForm({ ...form, data: text })}
                placeholder="YYYY-MM-DD"
            />

            <Text style={styles.label}>Cliente:</Text>
            <Picker
                selectedValue={form.cliente}
                onValueChange={(itemValue) => setForm({ ...form, cliente: itemValue })}
                style={styles.input}
            >
                <Picker.Item label="Selecione um cliente" value="" />
                {users.map((cliente) => (
                    <Picker.Item
                        key={cliente.id_usuario}
                        label={cliente.nome_usuario}
                        value={cliente.id_usuario}
                    />
                ))}
            </Picker>

            <Text style={styles.label}>Serviço:</Text>
            <Picker
                selectedValue={form.servico}
                onValueChange={(itemValue) => setForm({ ...form, servico: itemValue })}
                style={styles.input}
            >
                <Picker.Item label="Selecione um serviço" value="" />
                {servicos.map((servico) => (
                    <Picker.Item
                        key={servico.id_servico}
                        label={servico.nome_servico}
                        value={servico.id_servico}
                    />
                ))}
            </Picker>

            <View style={{ marginTop: 20 }}>
                <Button title="Continuar" onPress={handleSubmit} />
            </View>

            {agendamentos.length > 0 && (
                <>
                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Horário de Agendamentos disponíveis:</Text>
                    <MountarAgendamentos agendamentos={agendamentos} id_usuario={form.cliente} id_servico={form.servico} data={form.data} />
                </>
            )}
            {agendamentos.length == 0 && (
                <>
                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Não profissional com agenda disponível para a data:</Text>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 40,
        backgroundColor:'white'
    },
    label: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 5,
        marginRight: 10,
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});

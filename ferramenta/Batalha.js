import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Modal, TextInput, Button } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useNavigation } from "@react-navigation/native";
import { auth } from '../firebase/index'
import AsyncStorage from "@react-native-async-storage/async-storage";

import Historico from './Historico'
import { v4 as uuidv4 } from 'uuid';


export default function Opcoes() {
    const [activeButton, setActiveButton] = useState('Adicionar Batalha');
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [ponto1, setPonto1] = useState('')
    const [ponto2, setPonto2] = useState('')
    const [mc1, setMc1] = useState('')
    const [mc2, setMc2] = useState('')
    const [data, setData] = useState('')

    const [batalhas, setBatalha] = useState([]);


    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const navigation = useNavigation();




    const criarBatalha = async () => {
        setIsLoading(true);
        // Simula uma operação assíncrona antes de navegar
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        navigation.navigate("Inicio");
    }


    const navigateHome = () => {
        setActiveButton('Home')
        navigation.navigate('Home')
    }

    const navigateOpcoes = () => {
        setActiveButton('Opções')
        navigation.navigate('Opcoes')
    }

    const saveData = async () => {
        try {
          const existingData = await AsyncStorage.getItem('batalhas'); // Recupera a lista existente
          const parsedData = existingData ? JSON.parse(existingData) : []; // Converte para array
      
          // Gerar um ID único usando uuid
          const id = uuidv4(); // Gera um UUID único
      
          const newBatalha = {
            ponto1,
            ponto2,
            mc1,
            mc2,
            id,  // ID gerado
            data,
          };
      
          const updatedData = [...parsedData, newBatalha]; // Adiciona o novo item à lista existente
      
          await AsyncStorage.setItem('batalhas', JSON.stringify(updatedData)); // Salva a lista atualizada
          setBatalha(updatedData); // Atualiza o estado local
          console.log('Dados salvos com sucesso!');
        } catch (error) {
          console.error('Erro ao salvar os dados:', error);
        }
      };

  

    const handleLogout = async () => {
        try {
            // Deslogar o usuário utilizando o Firebase
            await auth.signOut();

            // Remover credenciais do AsyncStorage para desativar login automático
            /*  await AsyncStorage.removeItem("email");
             await AsyncStorage.removeItem("password"); */

            // Redefine a navegação e envia o usuário para a tela de Login
            navigation.reset({
                index: 0,
                routes: [{ name: "Inicio" }],
            });

            Alert.alert("Você foi deslogado");
        } catch (error) {
            Alert.alert(error);
        }
    };




    return (

        <View style={styles.container}>
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Este é um modal em tela cheia!</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ponto 1"
                            value={ponto1}
                            onChangeText={(text) => setPonto1(text)}  // Atualiza o valor de ponto1
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Ponto 2"
                            value={ponto2}
                            onChangeText={(text) => setPonto2(text)}  // Atualiza o valor de ponto2
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mc1"
                            value={mc1}
                            onChangeText={(text) => setMc1(text)}  // Atualiza o valor de ponto1
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mc2"
                            value={mc2}
                            onChangeText={(text) => setMc2(text)}  // Atualiza o valor de ponto2
                        />
                       

                        <TextInput
                            style={styles.input}
                            placeholder="data"
                            value={data}
                            onChangeText={(text) => setData(text)}  // Atualiza o valor de ponto2
                        />


                        <Button title="Salvar Dados" onPress={saveData} />
                       
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Fechar Modal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.main}>

                <View style={styles.parte2}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={openModal}
                        disabled={isLoading} // Desativa o botão enquanto carrega
                    >
                        <LinearGradient
                            colors={['#842ED8', '#DB28A9', '#9D1DCA']} // Cores do gradiente
                            start={{ x: 0, y: 0 }} // Início do gradiente
                            end={{ x: 1, y: 1 }} // Fim do gradiente
                            style={[StyleSheet.absoluteFill, { borderRadius: 8 }]} // Faz o gradiente preencher o botão com bordas arredondadas
                        />
                        {isLoading ? (

                            <ActivityIndicator size="small" color="#FFF" />

                        ) : (

                            <Text style={styles.textBtn}>Adicioanr</Text>
                        )}


                    </TouchableOpacity>
                </View>


            </View>


            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.navItem,
                        activeButton === 'Home' && styles.navItemActive,
                    ]}
                    onPress={navigateHome}
                >
                    <Image
                        source={require('../assets/icons/home.png')} // Substitua pelo caminho da sua imagem
                        style={[
                            styles.navIcon,
                            activeButton === 'Home' && styles.navIconActive,
                        ]}
                    />
                    <Text
                        style={[
                            styles.navText,
                            activeButton === 'Home' && styles.navTextActive,
                        ]}
                    >
                        Home
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.navItem,
                        activeButton === 'Adicionar Batalha' && styles.navItemActive,
                    ]}
                    onPress={() => setActiveButton('Adicionar Batalha')}
                >
                    <Image
                        source={require('../assets/icons/add.png')} // Substitua pelo caminho da sua imagem
                        style={[
                            styles.navIcon,
                            activeButton === 'Adicionar Batalha' && styles.navIconActive,
                        ]}
                    />
                    <Text
                        style={[
                            styles.navText,
                            activeButton === 'Adicionar Batalha' && styles.navTextActive,
                        ]}
                    >
                        Adicionar Batalha
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.navItem,
                        activeButton === 'Opções' && styles.navItemActive,
                    ]}
                    onPress={navigateOpcoes}
                >
                    <Image
                        source={require('../assets/icons/options.png')} // Substitua pelo caminho da sua imagem
                        style={[
                            styles.navIcon,
                            activeButton === 'Opções' && styles.navIconActive,
                        ]}
                    />
                    <Text
                        style={[
                            styles.navText,
                            activeButton === 'Opções' && styles.navTextActive,
                        ]}
                    >
                        Opções
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#190a29',

    },
    main: {
        paddingTop: 55,
        paddingRight: 43,
        paddingBottom: 45,
        paddingLeft: 43,
        height: '90%'
    },
    parte1: {
        alignItems: 'flex-start',

    },
    textMain: {
        color: '#FFFFFF', // Cor branca (substituindo var(--White, #FFF))
        fontSize: 29,// Tamanho da fonte
        fontStyle: 'normal', // Estilo normal da fonte
        fontWeight: '400', // Peso da fonte
        fontFamily: 'BlowBrush',
    },
    text: {
        color: '#A5A5A5', // Cor Light-gray
        fontFamily: 'Montserrat_400Regular', // Fonte Montserrat
        fontSize: 14, // Tamanho da fonte
        fontStyle: 'normal', // Estilo da fonte
        fontWeight: '300', // Peso da fonte (Regular) 
        marginTop: 4
    },
    parte2: {
        alignItems: 'center',
        paddingTop: '40%'
    },
    button: {
        // Garante que o gradiente não ultrapasse as bordas arredondadas
        width: 285,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex',
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 20,
    },
    textBtn: {
        color: '#FFF', // Cor branca
        textAlign: 'center', // Alinhamento centralizado
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16, // Tamanho da fonte
        fontStyle: 'normal', // Estilo da fonte
        fontWeight: '700', // Peso da fonte
    },
    gradient: {
        flex: 1, // Preenche todo o botão
        justifyContent: 'center', // Centraliza o texto verticalmente
        alignItems: 'center', // Centraliza o texto horizontalmente
    },
    footer: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: '10%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingRight: 53,
        paddingLeft: 53,
    },
    navItem: {
        marginRight: '5%',
        marginLeft: '5%',
        height: '100%',
        width: '32%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 4,

    },
    navItemActive: {
        borderBottomColor: '#000000', // Torna a borda preta quando ativo
    },
    navText: {
        fontSize: 11,
        color: '#A5A5A5', // Cor cinza padrão
    },
    navTextActive: {
        color: '#000000', // Torna o texto preto quando ativo
    },
    navIcon: {
        width: 25,
        height: 25,
        marginBottom: 4, // Espaço entre o ícone e o texto
        tintColor: '#A5A5A5', // Cor cinza padrão
    },
    navIconActive: {
        tintColor: '#000000', // Torna o ícone preto quando ativo
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo semitransparente para o modal
    },
    modalContent: {
        width: '100%', // Modal ocupa toda a largura da tela
        height: '100%', // Modal ocupa toda a altura da tela
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#DB28A9',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },

});


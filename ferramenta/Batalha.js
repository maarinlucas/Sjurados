import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Modal, TextInput, Button } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useNavigation } from "@react-navigation/native";
import { auth } from '../firebase/index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';


import Historico from './Historico'
import UUID from 'react-native-uuid';


export default function Opcoes() {
    const [activeButton, setActiveButton] = useState('Adicionar Batalha');
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular, // Regular (normal weight)
        Montserrat_700Bold, // Bold weight
        'BlowBrush': require('../assets/fonts/blowbrush.ttf'),
        'Ringstun': require("../assets/fonts/ringstun.ttf"),
    });

   

    const [ponto1, setPonto1] = useState(0)
    const [ponto2, setPonto2] = useState(0)
    const [pontoTotal1, setPontoTotal1] = useState(0)
    const [pontoTotal2, setPontoTotal2] = useState(0)
    const [mc1, setMc1] = useState('')
    const [mc2, setMc2] = useState('')
    const [mcVencedor, setMcVencedor] = useState({
        image: require('../assets/imagens/trofeu.png'), // URL da imagem
        text: '', // String
    })
    const [mcPerdedor, setMcPerdedor] = useState('')
    const [selectedNumber, setSelectedNumber] = useState("3");
    const [round, setRound] = useState(0);
    const [data, setData] = useState('19/01/1999')

    const [batalhas, setBatalha] = useState([]);


    const openModalBatalha = () => {
        setModalVisible(true);
        setModalVisible2(false);
    };

    const openModalConfirmar = () => {
        setModalVisible2(true);
    };

    const openModalZerar = () => {
        setModalVisible3(true);
    };

    const openModalSalvar = () => {
        setModalVisible4(true);
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
            if (selectedNumber == '2') {
                if (round < 2) {
                    setRound(round + 1)
                } else {
                    setRound(0)
                }
            }
            if (selectedNumber == '3') {
                if (round < 3) {
                    setRound(round + 1)
                } else {
                    setRound(0)
                }
            }
            if (selectedNumber == '4') {
                if (round < 4) {
                    setRound(round + 1)
                } else {
                    setRound(0)
                }
            }
            if (selectedNumber == '5') {
                if (round < 5) {
                    setRound(round + 1)
                } else {
                    setRound(0)
                }
            }
            const existingData = await AsyncStorage.getItem('batalhas'); // Recupera a lista existente
            const parsedData = existingData ? JSON.parse(existingData) : []; // Converte para array

            // Gerar um ID único usando UUID
            const id = UUID.v4(); // Gerando um UUID com react-native-uuid

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


    let p1 = 0.25
    let p2 = 0.50
    let p3 = 0.75
    let p4 = 1.00
    let p5 = 1.25
    let p6 = 1.50
    let p7 = 1.75
    let p8 = 2.00
    let p9 = 2.25
    let p10 = 2.50
    let p11 = 2.75
    let p12 = 3.00
    let p13 = 3.25
    let p14 = 3.50
    let p15 = 3.75
    let p16 = 4.00

    const c1 = '#d7b9ff'
    const c2 = '#c39fff'
    const c3 = '#ae86f6'
    const c4 = '#9870e7'
    const c5 = '#825bd1'
    const c6 = '#6b49b6'
    const c7 = '#563997'
    const c8 = '#422b73'

    return (

        <View style={styles.container}>
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={stylesModalBatalha.modalContainer}>
                    <View style={stylesModalBatalha.modalContent}>

                        <View style={stylesModalBatalha.header}>
                            <TouchableOpacity style={stylesModalBatalha.back} onPress={closeModal}>
                                <Image
                                    source={require("../assets/imagens/back.png")} // Substitua pelo caminho da sua imagem
                                    style={stylesModalBatalha.img}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={stylesModalBatalha.btnZerar}>
                                <Text style={stylesModalBatalha.BtnText}>ZERAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={stylesModalBatalha.helpContainer}>
                                <Text style={stylesModalBatalha.help}>?</Text>
                            </TouchableOpacity>


                        </View>

                        <View style={stylesModalBatalha.main}>

                            <View style={stylesModalBatalha.nomes}>

                                <View style={stylesModalBatalha.nome}>
                                    <Text style={stylesModalBatalha.textNome}>{mc1}</Text>
                                </View>

                                <View style={stylesModalBatalha.separadorContainer}>
                                    <Text style={stylesModalBatalha.separador}></Text>
                                </View>

                                <View style={stylesModalBatalha.nome}>
                                    <Text style={stylesModalBatalha.textNome}>{mc2}</Text>
                                </View>

                            </View>

                            <View style={stylesModalBatalha.pontos}>

                                <View style={stylesModalBatalha.ponto}>
                                    <Text style={stylesModalBatalha.textPonto}>{ponto1}</Text>
                                </View>

                                <View style={stylesModalBatalha.separadorContainer}>
                                    <Text style={stylesModalBatalha.separador}>|</Text>
                                </View>

                                <View style={stylesModalBatalha.ponto}>
                                    <Text style={stylesModalBatalha.textPonto}>{ponto2}</Text>
                                </View>

                            </View>

                        </View>

                        <View style={stylesModalBatalha.btnsPonto}>

                            <View style={stylesModalBatalha.coll}>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c1
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p1}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c1
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p2}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c2
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p3}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c2
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p4}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c3
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p5}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c3
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p6}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c4
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p7}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c4
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p8}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c5
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p9}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c5
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p10}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c6
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p11}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c6
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p12}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c7
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p13}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c7
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p14}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c8
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p15}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c8
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p16}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>

                                    <TouchableOpacity style={stylesModalBatalha.especial}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>Especial</Text>
                                    </TouchableOpacity>

                                </View>

                                <View style={stylesModalBatalha.row}>

                                    <TouchableOpacity style={stylesModalBatalha.correcao}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>Correção</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View style={stylesModalBatalha.separadorContainer}>
                                <Text style={stylesModalBatalha.separador}></Text>
                            </View>

                            <View style={stylesModalBatalha.coll}>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c1
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p1}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c1
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p2}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c2
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p3}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c2
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p4}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c3
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p5}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c3
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p6}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c4
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p7}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c4
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p8}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c5
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p9}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c5
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p10}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c6
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p11}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c6
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p12}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c7
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p13}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c7
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p14}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c8
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p15}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '45%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 36,
                                        borderRadius: 6,
                                        backgroundColor: c8
                                    }}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>{p16}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.row}>

                                    <TouchableOpacity style={stylesModalBatalha.especial}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>Especial</Text>
                                    </TouchableOpacity>

                                </View>

                                <View style={stylesModalBatalha.row}>

                                    <TouchableOpacity style={stylesModalBatalha.correcao}>
                                        <Text style={stylesModalBatalha.textBtnPonto}>Correção</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>

                        <TouchableOpacity
                            style={stylesModalBatalha.BtnContainer}
                            onPress={saveData}
                            disabled={isLoading} // Desativa o botão enquanto carrega
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#FFF" />
                            ) : (
                                <>

                                    <Text style={stylesModalBatalha.BtnText}>Salvar {round}/{selectedNumber}</Text>
                                </>
                            )}
                        </TouchableOpacity>



                    </View>
                </View>
            </Modal>


            <Modal
                transparent={true} // Torna o fundo transparente
                visible={modalVisible2}
                animationType="fade" // Tipo de animação ao abrir o modal
                onRequestClose={() => setModalVisible2(false)} // Fechar o modal ao clicar fora
            >
                <View style={styles.modalAvisoOverlay}>
                    <View style={styles.modalAvisoContainer}>
                        <Text style={styles.modalAvisoTitle}>Confirmar informações?</Text>
                        <Text style={styles.modalAvisoMessage}>Ao clicar 'Sim' Você será redirecionado a tela de pontuação</Text>
                        <TouchableOpacity
                            style={styles.BtnAvisoContainer1}
                            onPress={openModalBatalha}
                            disabled={isLoading} // Desativa o botão enquanto carrega

                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#FFF" />
                            ) : (
                                <>

                                    <Text style={styles.BtnText}>Sim</Text>
                                </>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.BtnAvisoContainer2}
                            onPress={() => { setModalVisible2(false) }}
                            disabled={isLoading} // Desativa o botão enquanto carrega
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#FFF" />
                            ) : (
                                <>

                                    <Text style={styles.BtnAvisoText}>Não</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            <View style={styles.main}>



                <View style={styles.parte1}>
                    <Text style={styles.textMain}>Adicionar Batalha</Text>
                    <Text style={styles.text}>Preencha as informações necessárias</Text>
                </View>
                <View style={styles.parte2}>

                    <View style={styles.inputContainer}>
                        <TextInput
                            autoCapitalize="none"
                            style={[styles.input, isFocused && styles.inputFocused]} // Aplica o estilo condicional
                            placeholder="Mc 1"
                            placeholderTextColor="#A0A0A0"
                            onFocus={() => setIsFocused(true)} // Remove a borda quando o input está em foco
                            onBlur={() => setIsFocused(false)} // Restaura a borda quando 
                            // perde o foco
                            onChangeText={(text) => setMc1(text)}


                        />
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/imagens/nome.png")} // Substitua pelo caminho da sua imagem
                                style={styles.inputIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            autoCapitalize="none"
                            style={[styles.input, isFocused && styles.inputFocused]} // Aplica o estilo condicional
                            placeholder="Mc 2"
                            placeholderTextColor="#A0A0A0"
                            onFocus={() => setIsFocused(true)} // Remove a borda quando o input está em foco
                            onBlur={() => setIsFocused(false)} // Restaura a borda quando perde o foco
                            onChangeText={(text) => setMc2(text)}

                        />
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/imagens/nome.png")} // Substitua pelo caminho da sua imagem
                                style={styles.inputIcon}
                            />
                        </TouchableOpacity>




                    </View>
                    <Text style={styles.label}>Número de rounds:</Text>
                    <View style={styles.inputPickerContainer}>

                        <Picker
                            selectedValue={selectedNumber} // Valor atual
                            onValueChange={(itemValue) => setSelectedNumber(itemValue)} // Atualiza o estado ao selecionar
                            style={styles.picker}
                        >
                            <Picker.Item label="2 Rounds" value="2" />
                            <Picker.Item label="3 Rounds" value="3" />
                            <Picker.Item label="4 Rounds" value="4" />
                            <Picker.Item label="5 Rounds" value="5" />
                        </Picker>
                    </View>
                    <TouchableOpacity
                        style={styles.BtnContainer}
                        onPress={openModalConfirmar}
                        disabled={isLoading} // Desativa o botão enquanto carrega
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <>

                                <Text style={styles.BtnText}>Adicionar</Text>
                            </>
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


const stylesModalBatalha = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#190a29', // Fundo semitransparente para o modal
    },
    modalContent: {
        width: '100%', // Modal ocupa toda a largura da tela
        height: '100%', // Modal ocupa toda a altura da tela
        backgroundColor: '#190a29',
        alignItems: 'center',
        paddingTop: 35,
        paddingRight: 26,
        paddingBottom: 35,
        paddingLeft: 26
    },
    header: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    back: {
        width: 30,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: "100%",
        height: 32,
    },
    helpContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 4
    },
    help: {
        fontSize: 30,
        textAlign: 'center',
        color: '#ffffff',
        transform: [{ scaleY: 0.7 }],
    },
    BtnContainer: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex',
        paddingRight: 30,
        paddingLeft: 30,
        overflow: 'hidden',
        marginTop: 50,
        backgroundColor: '#704BFF',
        flexDirection: "row",
        borderRadius: 6,
    },
    btnZerar: {
        width: 150,
        borderColor: '#ffffff',
        borderWidth: 2,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex',
        paddingRight: 30,
        paddingLeft: 30,
        overflow: 'hidden',
        borderRadius: 6,
    },
    BtnText: {
        color: '#ffffff',
        fontSize: 16,
    },
    main: {
        width: '100%',
        height: 60,
    },
    nomes: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nome: {
        backgroundColor: '#704bff',
        justifyContent: 'center',
        borderRadius: 6,
        height: '100%',
        width: '45%'
    },
    textNome: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    pontos: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        marginVertical: 5
    },
    ponto: {
        justifyContent: 'center',
        borderRadius: 6,
        height: '100%',
        width: '45%'
    },
    textPonto: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 27,
    },
    separador: {
        color: '#ffffff',
        fontSize: 36,
        textAlign: 'center',
        width: '100%',
        height: '100%',
    },
    separadorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '10%',
    },

    btnsPonto: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 372,
        marginTop: 130,
        marginBottom: 25
    },
    coll: {
        width: '44%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 7
    },
    textBtnPonto: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    especial: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        borderRadius: 6,
        backgroundColor: '#422b73'
    },
    correcao: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        borderRadius: 6,
        backgroundColor: '#422b73'
    }

})

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
        width: '100%',
        height: '100%',
        paddingBottom: 40,
        paddingTop: 56,
        alignItems: 'center'
    },
    inputContainer: {
        width: '100%',
        flexDirection: "row", // Coloca a imagem e o TextInput lado a lado
        alignItems: "center",
        height: 50,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#DFDFDF",
        backgroundColor: "#F5F9FE",
        paddingHorizontal: 10,
        marginTop: 15,
    },
    inputIcon: {
        width: 20, // Largura da imagem
        height: 20, // Altura da imagem
        marginRight: 8, // Espaço entre a imagem e o campo de entrada
    },
    input: {
        flex: 1, // Faz o input ocupar o restante do espaço
        height: "100%",
        color: "#000000", // Cor do texto
    },
    inputFocused: {
        borderWidth: 0, // Remove a borda ao focar
    },
    textBtn: {
        color: '#FFF', // Cor branca
        textAlign: 'center', // Alinhamento centralizado
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16, // Tamanho da fonte
        fontStyle: 'normal', // Estilo da fonte
        fontWeight: '700', // Peso da fonte
    },
    label: {
        fontSize: 18,
        marginTop: 20,
        color: '#ffffff'
    },
    inputPickerContainer: {
        width: '100%',
        flexDirection: "row", // Coloca a imagem e o TextInput lado a lado
        alignItems: "center",
        height: 55,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#DFDFDF",
        backgroundColor: "#F5F9FE",
        paddingHorizontal: 10,
        marginTop: 15,
    },
    picker: {
        width: '100%',
        height: '100%',


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
        backgroundColor: '#190a29', // Fundo semitransparente para o modal
    },
    modalContent: {
        width: '100%', // Modal ocupa toda a largura da tela
        height: '100%', // Modal ocupa toda a altura da tela
        backgroundColor: '#190a29',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    BtnContainer: {
        // Garante que o gradiente não ultrapasse as bordas arredondadas
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex',
        paddingRight: 30,
        paddingLeft: 30,
        overflow: 'hidden',
        marginTop: 50,

        backgroundColor: '#704BFF',
        flexDirection: "row", // Coloca a imagem e o TextInput lado a lado
        borderRadius: 6,
    },
    BtnText: {
        color: '#ffffff',
        fontSize: 16, // Tamanho da fonte
    },
    btnIcon: {
        width: 15, // Largura da imagem
        height: 15, // Altura da imagem
        marginRight: 8, // Espaço entre a imagem e o campo de entrada
    },
    modalAvisoOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
    },
    modalAvisoContainer: {
        width: '86%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,

    },
    modalAvisoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalAvisoMessage: {
        fontSize: 14,
        marginBottom: 20,
    },
    BtnAvisoContainer1: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex',
        paddingRight: 30,
        paddingLeft: 30,
        overflow: 'hidden',
        marginTop: 20,

        backgroundColor: '#704BFF',
        flexDirection: "row", // Coloca a imagem e o TextInput lado a lado
        borderRadius: 6,
    },
    BtnAvisoContainer2: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex',
        paddingRight: 30,
        paddingLeft: 30,
        overflow: 'hidden',
        marginTop: 10,
        borderColor: '#704BFF',
        borderWidth: 2,
        backgroundColor: '#ffffff',
        flexDirection: "row", // Coloca a imagem e o TextInput lado a lado
        borderRadius: 6,
    },
    BtnAvisoText: {
        color: '#704BFF',
        fontSize: 16, // 

    }

});


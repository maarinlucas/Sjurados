import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Modal, TextInput, Alert, ScrollView } from "react-native";
import { useFonts } from 'expo-font';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';


import Historico from './Historico'
import UUID from 'react-native-uuid';


export function Batalha({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);

    const [isFocused, setIsFocused] = useState(false);
    const [activeButton, setActiveButton] = useState('Adicionar Batalha');

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular, // Regular (normal weight)
        Montserrat_700Bold, // Bold weight
        'Ringstun': require("../assets/fonts/ringstun.ttf"),
    });
    const [mc1, setMc1] = useState('')
    const [mc2, setMc2] = useState('')

    const [selectedRound, setSelectedRound] = useState("Sem Limite");


    const openAlertConfirmar = () => {
        if (mc1 == '' || mc2 == '') {
            Alert.alert('Erro', 'Você precisa preencher todos os campos.', [
                { text: 'OK', style: 'cancel' },
            ]);
        } else {
            navigation.navigate("Pontuacao", { mc1, mc2, selectedRound });

        }

    }



    const [mc1RoundsVencidos, setMc1RoundsVencidos] = useState(0);
    const [mc2RoundsVencidos, setMc2RoundsVencidos] = useState(0);
    const [temMcVencedor, setTemMcVencedor] = useState(false);





    const navigateHome = async () => {
        setActiveButton('Home')
        navigation.navigate('Home')
    }

    const navigateOpcoes = () => {
        setActiveButton('Opções')
        navigation.navigate('Opcoes')
    }



    return (

        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            ) : (
                <View style={styles.main}>
                    <View style={styles.parte1}>
                        <Text style={styles.textMain}>Adicionar Batalha</Text>
                        <Text style={styles.text}>Preencha as informações necessárias</Text>
                    </View>
                    <View style={styles.parte2}>

                        <View style={styles.inputContainer}>
                            <TextInput

                                style={[styles.input, isFocused && styles.inputFocused]} // Aplica o estilo condicional
                                placeholder="Mc 1"
                                placeholderTextColor="#A0A0A0"
                                onFocus={() => setIsFocused(true)} // Remove a borda quando o input está em foco
                                onBlur={() => setIsFocused(false)} // Restaura a borda quando 
                                // perde o foco
                                onChangeText={(text) => setMc1(text)}
                                maxLength={11} // Adicione esta linha
                                value={mc1}


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

                                style={[styles.input, isFocused && styles.inputFocused]} // Aplica o estilo condicional
                                placeholder="Mc 2"
                                placeholderTextColor="#A0A0A0"
                                onFocus={() => setIsFocused(true)} // Remove a borda quando o input está em foco
                                onBlur={() => setIsFocused(false)} // Restaura a borda quando perde o foco
                                onChangeText={(text) => setMc2(text)}
                                maxLength={11} // Adicione esta linha
                                value={mc2}
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
                                selectedValue={selectedRound} // Valor atual
                                onValueChange={(itemValue) => setSelectedRound(itemValue)} // Atualiza o estado ao selecionar
                                style={styles.picker}
                            >
                                <Picker.Item label="Sem Limite" value="Sem Limite" />
                                <Picker.Item label="1 Round" value="1" />
                                <Picker.Item label="2 Rounds" value="2" />
                                <Picker.Item label="3 Rounds" value="3" />
                                <Picker.Item label="5 Rounds" value="5" />
                            </Picker>
                        </View>
                        <TouchableOpacity
                            style={styles.BtnContainer}
                            onPress={openAlertConfirmar}
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
            )}



            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.navItem,
                        activeButton === 'Home' && styles.navItemActive,
                    ]}
                    onPress={navigateHome}
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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

export function Pontuacao({ route, navigation }) {
    const { mc1, mc2, selectedRound } = route.params || {};

    const [ponto1, setPonto1] = useState(0)
    const [ponto2, setPonto2] = useState(0)
    const [palco1, setPalco1] = useState(0)
    const [tecnica1, setTecnica1] = useState(0)
    const [flow1, setFlow1] = useState(0)
    const [palco2, setPalco2] = useState(0)
    const [tecnica2, setTecnica2] = useState(0)
    const [flow2, setFlow2] = useState(0)

    const [pontoTotal1, setPontoTotal1] = useState(0)
    const [pontoTotal2, setPontoTotal2] = useState(0)
    const [palcoTotal1, setPalcoTotal1] = useState(0)
    const [tecnicaTotal1, setTecnicaTotal1] = useState(0)
    const [flowTotal1, setFlowTotal1] = useState(0)
    const [palcoTotal2, setPalcoTotal2] = useState(0)
    const [tecnicaTotal2, setTecnicaTotal2] = useState(0)
    const [flowTotal2, setFlowTotal2] = useState(0)


    const [round, setRound] = useState(0);
    const [mc1RoundsVencidos, setMc1RoundsVencidos] = useState(0);
    const [mc2RoundsVencidos, setMc2RoundsVencidos] = useState(0);
    const [ajuda, setAjuda] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(true);



    const [botoesEspeciais, setbotoesEspeciais] = useState(false);
    const [modalSalvarBatalha, setModalSalvarBatalha] = useState(false);
    const [modalSalvarRound, setModalSalvarRound] = useState(false);


    const [batalhas, setBatalha] = useState([]);

    const handleOpenModalAjuda = () => setAjuda(true);
    const handleCloseModalAjuda = () => setAjuda(false);


  

    useEffect(() => {
        setIsLoading2(false)
    }, []);

    const [data, setData] = useState(new Date().toLocaleDateString());


    const [fontsLoaded] = useFonts({
        Montserrat_400Regular, // Regular (normal weight)
        Montserrat_700Bold, // Bold weight
        'Ringstun': require("../assets/fonts/ringstun.ttf"),
    });



    const openModalBatalha = () => {
        setModalVisible(true);
    };




    const zerarPontosEspeciais = () => {
        setPalco1(0)
        setTecnica1(0)
        setFlow1(0)
        setPalco2(0)
        setTecnica2(0)
        setFlow2(0)
        setPalcoTotal1(palcoTotal1 - palco1)
        setPalcoTotal2(palcoTotal2 - palco2)
        setTecnicaTotal1(tecnicaTotal1 - tecnica1)
        setTecnicaTotal2(tecnicaTotal2 - tecnica2)
        setFlowTotal1(flowTotal1 - flow1)
        setFlowTotal2(flowTotal2 - flow2)
    }





    const openModalEspecial = () => {
        setbotoesEspeciais(true)
    };

    const closeModalEspecial = () => {
        setbotoesEspeciais(false)
    };



    const openModalSalvarBatalha = () => {


        if (ponto1 > ponto2) {
            setModalSalvarBatalha(true)
            setMc1RoundsVencidos(mc1RoundsVencidos + 1)


        } else if (ponto2 > ponto1) {
            setModalSalvarBatalha(true)
            setMc2RoundsVencidos(mc2RoundsVencidos + 1)

        } else {
            setModalSalvarBatalha(true)
        }
    };
    const closeModalSalvarBatalha = () => {


        if (ponto1 > ponto2) {
            setModalSalvarBatalha(false)
            setMc1RoundsVencidos(mc1RoundsVencidos - 1)

        } else if (ponto2 > ponto1) {
            setModalSalvarBatalha(false)
            setMc2RoundsVencidos(mc2RoundsVencidos - 1)


        } else {
            setModalSalvarBatalha(false)
        }
    };

    const openModalSalvarRound = () => {
        if (ponto1 > ponto2) {
            setMc1RoundsVencidos(mc1RoundsVencidos + 1)
            setModalSalvarRound(true)
        } else if (ponto2 > ponto1) {
            setMc2RoundsVencidos(mc2RoundsVencidos + 1)
            setModalSalvarRound(true)
        } else if (ponto1 == ponto2) {

            setModalSalvarRound(true)
        }
    };
    const closeModalSalvarRound = () => {
        if (ponto1 > ponto2) {
            setMc1RoundsVencidos(mc1RoundsVencidos - 1)
            setModalSalvarRound(false)
        } else if (ponto2 > ponto1) {
            setMc2RoundsVencidos(mc2RoundsVencidos - 1)
            setModalSalvarRound(false)
        } else if (ponto1 == ponto2) {

            setModalSalvarRound(false)
        }
    };







    const salvar = async () => {

        try {

            if (selectedRound == '1') {
                if (round == 1) {
                    openModalSalvarBatalha()
                } else {
                    openModalSalvarBatalha()
                }
            } else if (selectedRound == '2') {
                if (round < 1) {
                    openModalSalvarRound()
                }
                else {
                    openModalSalvarBatalha()
                }
            } else if (selectedRound == '3') {
                if (round < 2) {
                    openModalSalvarRound()
                } else {
                    openModalSalvarBatalha()
                }
            } else if (selectedRound == '5') {
                if (round < 4) {
                    openModalSalvarRound()
                } else {
                    openModalSalvarBatalha()
                }
            } else {
                if (round < 999) {
                    openModalSalvarRound()
                } else {
                    openModalSalvarBatalha()
                }
            }

        } catch (error) {
            console.error('Erro ao salvar os dados:', error);
        }
    }
    const salvarRound = () => {


        setModalSalvarRound(false)
        setPonto1(0)
        setPonto2(0)
        setPalco1(0)
        setTecnica1(0)
        setFlow1(0)
        setPalco2(0)
        setTecnica2(0)
        setFlow2(0)
        setbotoesEspeciais(false)
        setRound(round + 1)
    }

    const salvarBatalha = async () => {

        // Adiciona os pontos extras à pontuação total


        const existingData = await AsyncStorage.getItem('batalhas');
        const parsedData = existingData ? JSON.parse(existingData) : [];

        const id = UUID.v4();

        const newBatalha = {
            pontoTotal1, // Usa a pontuação com os extras
            pontoTotal2, // Usa a pontuação com os extras
            mc1,
            mc2,
            id,
            data,
            flowTotal1,
            flowTotal2,
            tecnicaTotal1,
            tecnicaTotal2,
            palcoTotal1,
            palcoTotal2,
            mc1RoundsVencidos,
            mc2RoundsVencidos
        };

        const updatedData = [...parsedData, newBatalha];
       

        await AsyncStorage.setItem('batalhas', JSON.stringify(updatedData));
        setBatalha(updatedData);

        // Reseta todos os estados




        // Reseta todos os estados
        setIsLoading2(true);
        setModalSalvarBatalha(false)
        setModalSalvarRound(false)
        setbotoesEspeciais(false)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setPonto1(0)
        setPonto2(0)
        setPalco1(0)
        setTecnica1(0)
        setFlow1(0)
        setPalco2(0)
        setTecnica2(0)
        setFlow2(0)
        setPontoTotal1(0);
        setPontoTotal2(0);
        setPalcoTotal1(0);
        setPalcoTotal2(0);
        setTecnicaTotal1(0);
        setTecnicaTotal2(0);
        setFlowTotal1(0);
        setFlowTotal2(0);
        setRound(0);
        setMc1RoundsVencidos(0);
        setMc2RoundsVencidos(0);
        navigation.navigate('Batalha')

    }



    const addPalco1 = () => {
        if (palco1 < 2) {
            setPalco1(palco1 + 0.5)
            setPalcoTotal1(palcoTotal1 + 0.5)
            setPonto1(ponto1 + 0.5)
            setPontoTotal1(pontoTotal1 + 0.5)
        }
    }
    const addPalco2 = () => {
        if (palco2 < 2) {
            setPalco2(palco2 + 0.5)
            setPalcoTotal2(palcoTotal2 + 0.5)
            setPonto2(ponto2 + 0.5)
            setPontoTotal2(pontoTotal2 + 0.5)
        }
    }

    const addTecnica1 = () => {
        if (tecnica1 < 2) {
            setTecnica1(tecnica1 + 0.5)
            setTecnicaTotal1(tecnicaTotal1 + 0.5)
            setPonto1(ponto1 + 0.5)
            setPontoTotal1(pontoTotal1 + 0.5)
        }
    }

    const addTecnica2 = () => {
        if (tecnica2 < 2) {
            setTecnica2(tecnica2 + 0.5)
            setTecnicaTotal2(tecnicaTotal2 + 0.5)
            setPonto2(ponto2 + 0.5)
            setPontoTotal2(pontoTotal2 + 0.5)
        }
    }

    const addFlow1 = () => {
        if (flow1 < 2) {
            setFlow1(flow1 + 0.5)
            setFlowTotal1(flowTotal1 + 0.5)
            setPonto1(ponto1 + 0.5)
            setPontoTotal1(pontoTotal1 + 0.5)
        }
    }

    const addFlow2 = () => {
        if (flow2 < 2) {
            setFlow2(flow2 + 0.5)
            setFlowTotal2(flowTotal2 + 0.5)
            setPonto2(ponto2 + 0.5)
            setPontoTotal2(pontoTotal2 + 0.5)
        }
    }



    const openAlertZerarEspeciais = () => {
        Alert.alert('Zerar', 'Deseja zerar os pontos?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Zerar', onPress: () => { zerarPontosEspeciais() } }
        ]);
    }


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

    const zerarPontos = () => {
        setPonto1(0)
        setPonto2(0)
        setPontoTotal1(pontoTotal1 - ponto1)
        setPontoTotal2(pontoTotal2 - ponto2)
    }
    const corrigir1 = () => {
        setPonto1(ponto1 - 0.25)
        setPontoTotal1(pontoTotal1 - 0.25)
    }
    const corrigir2 = () => {
        setPonto2(ponto2 - 0.25)
        setPontoTotal2(pontoTotal2 - 0.25)
    }

    const back = () => {
        navigation.navigate('Batalha')
        setPonto1(0)
        setPonto2(0)
        setPalco1(0)
        setTecnica1(0)
        setFlow1(0)
        setPalco2(0)
        setTecnica2(0)
        setFlow2(0)
        setPontoTotal1(0)
        setPontoTotal2(0)
        setPalcoTotal1(0)
        setPalcoTotal2(0)
        setTecnicaTotal1(0)
        setTecnicaTotal2(0)
        setFlowTotal1(0)
        setFlowTotal2(0)

    }
    const back2 = () => {
        setbotoesEspeciais(false)
        setPalco1(0)
        setTecnica1(0)
        setFlow1(0)
        setPalco2(0)
        setTecnica2(0)
        setFlow2(0)
    }


    const openAlertZerarPontos = () => {
        Alert.alert('Zerar', 'Zerar os pontos?', [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: () => { zerarPontos() } }
        ]);
    }


    const openAlertBack = () => {
        Alert.alert('Voltar', 'Desafazer as alterações e voltar para a tela anterior?', [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: () => { back() } }
        ]);
    }
    const addPonto1 = (p) => {
        const novaPontuacao = ponto1 + p;
        const novaPontuacaoTotal = pontoTotal1 + p;

        if (novaPontuacao <= 100) {
            setPonto1(novaPontuacao);
            setPontoTotal1(novaPontuacaoTotal);
        }
    }
    const addPonto2 = (p) => {
        const novaPontuacao = ponto2 + p;
        const novaPontuacaoTotal = pontoTotal2 + p;
        if (novaPontuacao <= 100) {
            setPonto2(novaPontuacao);
            setPontoTotal2(novaPontuacaoTotal);
        }
    }


    return (
        <View style={stylesModalBatalha.modalContainer}>

            {isLoading2 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
                
            ) : (
                <>
                    <View style={stylesModalBatalha.modalContainer}>
                        <View style={stylesModalBatalha.modalContent}>

                            <View style={stylesModalBatalha.header}>
                                <TouchableOpacity style={stylesModalBatalha.back} onPress={openAlertBack}>
                                    <Image
                                        source={require("../assets/imagens/back.png")} // Substitua pelo caminho da sua imagem
                                        style={stylesModalBatalha.img}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={stylesModalBatalha.btnZerar} onPress={openAlertZerarPontos}>
                                    <Text style={stylesModalBatalha.BtnText}>ZERAR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleOpenModalAjuda} style={stylesModalBatalha.helpContainer}>
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
                                        <TouchableOpacity style={[{
                                            backgroundColor: c1
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p1)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p1}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c1
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p2)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p2}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={stylesModalBatalha.row}>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c2
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p3)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p3}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c2
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p4)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={stylesModalBatalha.row}>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c3
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p5)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p5}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c3
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p6)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p6}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={stylesModalBatalha.row}>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c4
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p7)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p7}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c4
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p8)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p8}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={stylesModalBatalha.row}>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c5
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p9)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p9}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c5
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p10)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p10}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={stylesModalBatalha.row}>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c6
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p11)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p11}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c6
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p12)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p12}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={stylesModalBatalha.row}>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c7
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p13)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p13}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c7
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p14)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p14}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={stylesModalBatalha.row}>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c8
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p15)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p15}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c8
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto1(p16)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p16}</Text>
                                        </TouchableOpacity>
                                    </View>


                                    <View style={stylesModalBatalha.row}>

                                        <TouchableOpacity onPress={corrigir1} style={stylesModalBatalha.correcao}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>Corrigir</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                                <View style={stylesModalBatalha.separadorContainer}>
                                    <Text style={stylesModalBatalha.separador}></Text>
                                </View>

                                <View style={stylesModalBatalha.coll}>
                                    <View style={stylesModalBatalha.row}>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c1
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p1)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p1}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c1
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p2)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p2}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={stylesModalBatalha.row}>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c2
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p3)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p3}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c2
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p4)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={stylesModalBatalha.row}>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c3
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p5)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p5}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c3
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p6)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p6}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={stylesModalBatalha.row}>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c4
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p7)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p7}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c4
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p8)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p8}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={stylesModalBatalha.row}>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c5
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p9)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p9}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c5
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p10)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p10}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={stylesModalBatalha.row}>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c6
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p11)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p11}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c6
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p12)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p12}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={stylesModalBatalha.row}>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c7
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p13)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p13}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c7
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p14)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p14}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={stylesModalBatalha.row}>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c8
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p15)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p15}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{
                                            backgroundColor: c8
                                        }, stylesModalBatalha.rowBtn]} onPress={() => addPonto2(p16)}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>{p16}</Text>
                                        </TouchableOpacity>
                                    </View>


                                    <View style={stylesModalBatalha.row}>

                                        <TouchableOpacity onPress={corrigir2} style={stylesModalBatalha.correcao}>
                                            <Text style={stylesModalBatalha.textBtnPonto}>Corrigir</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                            </View>

                            <TouchableOpacity
                                style={stylesModalBatalha.BtnContainer}
                                onPress={openModalEspecial}
                                disabled={isLoading} // Desativa o botão enquanto carrega
                            >
                                <Text style={stylesModalBatalha.BtnText}>Flow - Tecnica - Palco</Text>

                            </TouchableOpacity>

                        </View>
                    </View>
                    {/*Modal Especial */}
                    <Modal 
                        visible={botoesEspeciais}
                        animationType="fade"
                    >
                        <View style={stylesModalEspecial.modalContainer}>
                            <View style={stylesModalEspecial.modalContent}>

                                <View style={stylesModalEspecial.header}>
                                    <TouchableOpacity style={stylesModalEspecial.back} onPress={back2}>
                                        <Image
                                            source={require("../assets/imagens/back.png")} // Substitua pelo caminho da sua imagem
                                            style={stylesModalEspecial.img}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={stylesModalEspecial.btnZerar}
                                        onPress={openAlertZerarEspeciais}>
                                        <Text style={stylesModalEspecial.BtnText}>ZERAR</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleOpenModalAjuda} style={stylesModalEspecial.helpContainer}>
                                        <Text style={stylesModalEspecial.help}>?</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={stylesModalBatalha.main}>

                                    <View style={stylesModalEspecial.nomes}>

                                        <View style={stylesModalEspecial.nome}>
                                            <Text style={stylesModalBatalha.textNome}>{mc1}</Text>
                                        </View>

                                        <View style={stylesModalBatalha.separadorContainer}>
                                            <Text style={stylesModalBatalha.separador}></Text>
                                        </View>

                                        <View style={stylesModalEspecial.nome}>
                                            <Text style={stylesModalBatalha.textNome}>{mc2}</Text>
                                        </View>

                                    </View>

                                    <View style={stylesModalBatalha.pontos}>

                                        <View style={stylesModalBatalha.ponto}>
                                            <Text style={stylesModalBatalha.textPonto}>{ponto1}</Text>
                                        </View>

                                        <View style={stylesModalEspecial.separadorContainer}>
                                            <Text style={stylesModalEspecial.separador}>|</Text>
                                        </View>

                                        <View style={stylesModalBatalha.ponto}>
                                            <Text style={stylesModalBatalha.textPonto}>{ponto2}</Text>
                                        </View>

                                    </View>

                                </View>

                                <View style={stylesModalEspecial.BtnsEspecialContainer}>

                                    <View style={stylesModalEspecial.coll}>
                                        <View style={stylesModalEspecial.row}>

                                            <TouchableOpacity onPress={addPalco1} style={stylesModalEspecial.especial}>
                                                <Text style={stylesModalEspecial.textBtnEspecial}>Palco</Text>
                                            </TouchableOpacity>
                                            <Text style={stylesModalEspecial.textEspecial}>{palco1}</Text>
                                        </View>
                                        <View style={stylesModalEspecial.row}>

                                            <TouchableOpacity onPress={addTecnica1} style={stylesModalEspecial.especial}>
                                                <Text style={stylesModalEspecial.textBtnEspecial}>Técnica</Text>
                                            </TouchableOpacity>
                                            <Text style={stylesModalEspecial.textEspecial}>{tecnica1}</Text>
                                        </View>
                                        <View style={stylesModalEspecial.row}>

                                            <TouchableOpacity onPress={addFlow1} style={stylesModalEspecial.especial}>
                                                <Text style={stylesModalEspecial.textBtnEspecial}>Flow</Text>
                                            </TouchableOpacity>
                                            <Text style={stylesModalEspecial.textEspecial}>{flow1}</Text>
                                        </View>
                                    </View>
                                    <View style={stylesModalEspecial.separadorContainer}>
                                        <Text style={stylesModalEspecial.separador}></Text>
                                    </View>
                                    <View style={stylesModalEspecial.coll}>
                                        <View style={stylesModalEspecial.row}>

                                            <TouchableOpacity onPress={addPalco2} style={stylesModalEspecial.especial}>
                                                <Text style={stylesModalEspecial.textBtnEspecial}>Palco</Text>
                                            </TouchableOpacity>
                                            <Text style={stylesModalEspecial.textEspecial}>{palco2}</Text>
                                        </View>
                                        <View style={stylesModalEspecial.row}>

                                            <TouchableOpacity onPress={addTecnica2} style={stylesModalEspecial.especial}>
                                                <Text style={stylesModalEspecial.textBtnEspecial}>Técnica</Text>
                                            </TouchableOpacity>
                                            <Text style={stylesModalEspecial.textEspecial}>{tecnica2}</Text>
                                        </View>
                                        <View style={stylesModalEspecial.row}>

                                            <TouchableOpacity onPress={addFlow2} style={stylesModalEspecial.especial}>
                                                <Text style={stylesModalEspecial.textBtnEspecial}>Flow</Text>
                                            </TouchableOpacity>
                                            <Text style={stylesModalEspecial.textEspecial}>{flow2}</Text>
                                        </View>
                                    </View>

                                </View>

                                <TouchableOpacity
                                    style={[
                                        stylesModalEspecial.BtnContainer,
                                        {
                                            backgroundColor: ((round === 0 && selectedRound === "1") ||
                                                (round === 1 && selectedRound === "2") ||
                                                (round === 2 && selectedRound === "3") ||
                                                (round === 4 && selectedRound === "5") ||
                                                (round === 999 && selectedRound === "Sem Limite")
                                            )
                                                ? 'transparent'
                                                : 'red',
                                            opacity: ((round === 0 && selectedRound === "1") ||
                                                (round === 1 && selectedRound === "2") ||
                                                (round === 2 && selectedRound === "3") ||
                                                (round === 4 && selectedRound === "5") ||
                                                (round === 999 && selectedRound === "Sem Limite")
                                            )
                                                ? 0.3
                                                : 1,
                                        }
                                    ]}
                                    onPress={((round === 0 && selectedRound === "1") ||
                                        (round === 1 && selectedRound === "2") ||
                                        (round === 2 && selectedRound === "3") ||
                                        (round === 4 && selectedRound === "5") ||
                                        (round === 999 && selectedRound === "Sem Limite")
                                    )
                                        ? null
                                        : openModalSalvarBatalha}
                                    disabled={(round === 0 && selectedRound === "1") ||
                                        (round === 1 && selectedRound === "2") ||
                                        (round === 2 && selectedRound === "3") ||
                                        (round === 4 && selectedRound === "5") ||
                                        (round === 999 && selectedRound === "Sem Limite") || isLoading}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator size="small" color="#FFF" />
                                    ) : (
                                        <Text
                                            style={[
                                                stylesModalBatalha.BtnText,
                                                {
                                                    color: ((round === 0 && selectedRound === "1") ||
                                                        (round === 1 && selectedRound === "2") ||
                                                        (round === 2 && selectedRound === "3") ||
                                                        (round === 4 && selectedRound === "5") ||
                                                        (round === 999 && selectedRound === "Sem Limite")
                                                    )
                                                        ? 'rgba(255, 255, 255, 0)'
                                                        : '#FFF'
                                                }
                                            ]}
                                        >
                                            Encerrar Batalha
                                        </Text>
                                    )}
                                </TouchableOpacity>


                                <TouchableOpacity
                                    style={stylesModalEspecial.BtnContainer}
                                    onPress={salvar}
                                    disabled={isLoading} // Desativa o botão enquanto carrega
                                >
                                    {isLoading ? (
                                        <ActivityIndicator size="small" color="#FFF" />
                                    ) : (
                                        <>
                                            <Text style={stylesModalBatalha.BtnText}>
                                                {(round === 0 && selectedRound === "1") ||
                                                    (round === 1 && selectedRound === "2") ||
                                                    (round === 2 && selectedRound === "3") ||
                                                    (round === 4 && selectedRound === "5") ||
                                                    (round === 999 && selectedRound === "Sem Limite")
                                                    ? "Salvar Batalha"
                                                    : `Próximo Round`}
                                            </Text>

                                        </>
                                    )}
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>

                    {/*Modal Ajuda */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={ajuda}
                        onRequestClose={handleCloseModalAjuda}
                    >
                        <View style={stylesModalAjuda.modalBackground}>
                            <View style={stylesModalAjuda.modalContainer}>
                                <ScrollView>
                                    <Text style={stylesModalAjuda.title}>PRESENÇA DE PALCO / MC</Text>
                                    <Text style={stylesModalAjuda.item}>1. Interação com objetos</Text>
                                    <Text style={stylesModalAjuda.item}>2. Falar sobre a plateia</Text>
                                    <Text style={stylesModalAjuda.item}>3. Falar com a plateia</Text>
                                    <Text style={stylesModalAjuda.item}>4. Falar sobre algo que está acontecendo no ambiente ao vivo</Text>
                                    <Text style={stylesModalAjuda.item}>5. Rimas que vêm com energia/vibe (atraem o público)</Text>
                                    <Text style={stylesModalAjuda.item}>6. Postura dentro e fora das batalhas</Text>
                                    <Text style={stylesModalAjuda.item}>7. Personalidade e estética</Text>
                                    <Text style={stylesModalAjuda.item}>8. Movimentação em palco</Text>
                                    <Text style={stylesModalAjuda.item}>9. Presença de campeão/vencedor (dentro e fora do palco)</Text>

                                    <Text style={stylesModalAjuda.title}>FLOW</Text>
                                    <Text style={stylesModalAjuda.item}>1. Cantado</Text>
                                    <Text style={stylesModalAjuda.item}>2. Entonação</Text>
                                    <Text style={stylesModalAjuda.item}>3. Seguir o ritmo do beat (compasso)</Text>
                                    <Text style={stylesModalAjuda.item}>4. Speedflow</Text>
                                    <Text style={stylesModalAjuda.item}>5. Variação</Text>
                                    <Text style={stylesModalAjuda.item}>6. Dicção</Text>
                                    <Text style={stylesModalAjuda.item}>7. Respiração</Text>
                                    <Text style={stylesModalAjuda.item}>8. Entrada boa</Text>
                                    <Text style={stylesModalAjuda.item}>9. Seguir o BPM (boombap, trap, drill, Detroit, etc.)</Text>
                                    <Text style={stylesModalAjuda.item}>10. Lento</Text>
                                    <Text style={stylesModalAjuda.item}>11. Onomatopeia</Text>
                                    <Text style={stylesModalAjuda.item}>12. Controle para chegar na terminação</Text>

                                    <Text style={stylesModalAjuda.title}>TÉCNICAS</Text>
                                    <Text style={stylesModalAjuda.item}>1. Paronomásia</Text>
                                    <Text style={stylesModalAjuda.item}>2. Aliteração</Text>
                                    <Text style={stylesModalAjuda.item}>3. Calambur</Text>
                                    <Text style={stylesModalAjuda.item}>4. Wordplay</Text>
                                    <Text style={stylesModalAjuda.item}>5. Anadiplose</Text>
                                    <Text style={stylesModalAjuda.item}>6. Multissilábicas One Two</Text>
                                    <Text style={stylesModalAjuda.item}>7. Esdrújulas</Text>
                                    <Text style={stylesModalAjuda.item}>8. Univocalismo</Text>
                                    <Text style={stylesModalAjuda.item}>9. Derivação</Text>
                                    <Text style={stylesModalAjuda.item}>10. Antanaclase</Text>
                                    <Text style={stylesModalAjuda.item}>11. Retruécano</Text>
                                    <Text style={stylesModalAjuda.item}>12. Ánafora</Text>
                                    <Text style={stylesModalAjuda.item}>13. Antítese</Text>
                                    <Text style={stylesModalAjuda.item}>14. Comparação</Text>
                                    <Text style={stylesModalAjuda.item}>15. Hipérbole</Text>
                                    <Text style={stylesModalAjuda.item}>16. Dilogia</Text>
                                    <Text style={stylesModalAjuda.item}>17. Metáfora</Text>
                                    <Text style={stylesModalAjuda.item}>18. Esquemas</Text>
                                    <Text style={stylesModalAjuda.item}>19. Rimas perfeitas (coerência com fatality)</Text>
                                    <Text style={stylesModalAjuda.item}>20. Métricas</Text>
                                </ScrollView>

                                <TouchableOpacity
                                    style={styles.BtnContainer}
                                    onPress={handleCloseModalAjuda}
                                    disabled={isLoading} // Desativa o botão enquanto carrega
                                >
                                    <Text style={styles.BtnText}>Fechar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/*Modal Salvar Batalha*/}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalSalvarBatalha}
                    >
                        <View style={stylesModalSalvar.modalBackground}>
                            <View style={stylesModalSalvar.modalContainer}>

                                <Text style={stylesModalSalvar.title}>Salvar batalha no histórico?</Text>
                                <TouchableOpacity
                                    style={stylesModalSalvar.BtnContainer}
                                    onPress={salvarBatalha}

                                >

                                    <Text style={stylesModalSalvar.BtnText}>Sim</Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[stylesModalSalvar.BtnContainer]}
                                    onPress={closeModalSalvarBatalha}

                                >

                                    <Text style={stylesModalSalvar.BtnText}>Não</Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/*Modal Salvar Round*/}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalSalvarRound}
                    >
                        <View style={stylesModalSalvar.modalBackground}>
                            <View style={stylesModalSalvar.modalContainer}>
                                <Text style={stylesModalSalvar.title}>Seguir para round {round + 2}?</Text>
                                <TouchableOpacity
                                    style={stylesModalSalvar.BtnContainer}
                                    onPress={salvarRound}
                                >
                                    <Text style={stylesModalSalvar.BtnText}>Sim</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[stylesModalSalvar.BtnContainer,]}
                                    onPress={closeModalSalvarRound}
                                >

                                    <Text style={stylesModalSalvar.BtnText}>Não</Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </>

            )}

        </View>
    );
}

const stylesModalEspecial = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#190a29', // Fundo semitransparente para o modal
        paddingTop: 39,
        paddingRight: 25,
        paddingBottom: 40,
        paddingLeft: 25
    },
    modalContent: {
        flex: 1,
        width: '100%', // Modal ocupa toda a largura da tela
        height: '100%', // Modal ocupa toda a altura da tela
        backgroundColor: '#190a29',
        alignItems: 'center',
    },

    back: {
        width: 30,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: "100%",
        height: 31,
    },
    helpContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: 30,


    },
    help: {
        fontSize: 33,
        textAlign: 'center',
        color: '#ffffff',
        transform: [{ scaleY: 0.7 }],
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
        marginRight: 60,
        marginLeft: 60,
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
    header: {
        width: '100%',
        height: 47,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 36,
    },

    modalEspecialMessage: {
        fontSize: 14,
        marginBottom: 20,
    },
    BtnsEspecialContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 333,
        marginTop: 75,
        marginBottom: 10,
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
        marginTop: 23,
        backgroundColor: '#704BFF',
        flexDirection: "row",
        borderRadius: 6,
    },
    coll: {
        width: '46%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 7
    },
    textBtnEspecial: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    especial: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 39,
        borderRadius: 6,
        backgroundColor: '#422b73'
    },
    textEspecial: {
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
        width: 40,
    },
    nomes: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nome: {
        backgroundColor: '#704bff',
        justifyContent: 'center',
        borderRadius: 6,
        height: '100%',
        width: 154
    },

})

const stylesModalBatalha = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#190a29',
        paddingTop: 35,
        paddingRight: 15,
        paddingBottom: 21,
        paddingLeft: 15
    },
    modalContent: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#190a29',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: 47,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 36,
    },
    back: {
        width: 30,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: "100%",
        height: 31,
    },
    helpContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: 30,
    },
    help: {
        fontSize: 33,
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
        marginTop: 40,
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
        marginRight: 60,
        marginLeft: 60,

    },
    BtnText: {
        color: '#ffffff',
        fontSize: 16,
        width: '100%',
        textAlign: 'center'
    },
    main: {
        width: '100%',
        height: 60,
    },
    nomes: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nome: {
        backgroundColor: '#704bff',
        justifyContent: 'center',
        borderRadius: 6,
        height: '100%',
        width: 154
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
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginVertical: 5,
    },
    ponto: {
        justifyContent: 'center',
        borderRadius: 6,
        height: '100%',
        width: 153
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
        width: 40,
    },

    btnsPonto: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 372,
        marginTop: 100,
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
    },
    rowBtn: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        borderRadius: 6,
    }

})

const stylesModalAjuda = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: '#190a29',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        marginTop: 20,
        color: '#ffffff',
        fontFamily: 'Ringstun'
    },
    item: {
        fontSize: 16,
        marginVertical: 5,
        color: '#ffffff',
        fontFamily: 'Montserrat_400Regular'
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#6200ee',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        color: '#ffffff'
    },
});

const stylesModalSalvar = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        height: 350,
        backgroundColor: '#190a29',
        borderRadius: 10,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        marginBottom: 10,
        marginTop: 5,
        color: '#ffffff',
    },
    item: {
        fontSize: 16,
        marginVertical: 5,
        color: '#ffffff',
        fontFamily: 'Montserrat_400Regular'
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
        marginTop: 20,
        backgroundColor: '#704BFF',
        flexDirection: "row", // Coloca a imagem e o TextInput lado a lado
        borderRadius: 6,
    },
    BtnText: {
        color: '#ffffff',
        fontSize: 16, // Tamanho da fonte
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#190a29',
        height: '90%' // Mesmo height do main
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#190a29',

    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#190a29',
        height: '90%',
        marginBottom: '10%'
    },
    main: {
        paddingTop: 55,
        paddingRight: 43,
        paddingLeft: 43,
        paddingBottom: 45,

        height: '90%'
    },
    parte1: {
        alignItems: 'flex-start',

    },
    textMain: {
        color: '#FFFFFF', // Cor branca (substituindo var(--White, #FFF))
        fontSize: 32,// Tamanho da fonte
        fontStyle: 'normal', // Estilo normal da fonte
        fontWeight: '400', // Peso da fonte
        fontFamily: 'Ringstun',
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
        zIndex: 1000
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

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#190a29',
        height: '90%' // Mesmo height do main
    },
});
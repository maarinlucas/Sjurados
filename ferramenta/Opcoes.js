import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useNavigation } from "@react-navigation/native";
import { auth, db } from '../firebase/index'
import { ref, get, child } from "firebase/database";
import { signOut } from "firebase/auth";
import Historico from './Historico'



export default function Opcoes() {
    const [activeButton, setActiveButton] = useState('Opções');
    const [isLoading, setIsLoading] = useState(false);

    const [batalhas, setBatalha] = useState([
        { id: 1, mc1: 'Kant', mc2: 'Orochi', ponto1: 34, ponto2: 55, errExecucao1: 2, errExecucao2: 3, errConclusao1: 1, errConclusao2: 3, dataDaBatalha: '03/01/2025' },
        { id: 2, mc1: 'Xamuel', mc2: 'Jhony', ponto1: 14, ponto2: 15, errExecucao1: 2, errExecucao2: 3, errConclusao1: 1, errConclusao2: 3, dataDaBatalha: '03/01/2025' }
    ]);

    const [userName, setUserName] = useState("Opções");
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular, // Regular (normal weight)
        Montserrat_700Bold, // Bold weight
        'BlowBrush': require('../assets/fonts/blowbrush.ttf'),
        'Ringstun': require("../assets/fonts/ringstun.ttf"),
    });

    // Se as fontes ainda não estiverem carregadas, exibe uma tela de carregamento.
    if (!fontsLoaded) {
        return <Text>Carregando...</Text>;
    }

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
            <View style={styles.main}>




             
                <View style={styles.parte2}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogout}
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

                            <Text style={styles.textBtn}>Sair</Text>
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
                    onPress={() => {setActiveButton('Opções')}}
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

});


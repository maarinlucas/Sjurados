import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator, Linking } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useNavigation } from "@react-navigation/native";
import { auth } from '../firebase/index';

export default function Opcoes() {
    const [activeButton, setActiveButton] = useState('Opções');
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
        'Ringstun': require("../assets/fonts/ringstun.ttf"),
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            setIsLoading(false);
        });

        return unsubscribe;
    }, [navigation]);

    // Efeito para o carregamento inicial
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    if (!fontsLoaded) {
        return <Text>Carregando...</Text>;
    }

    const navigateHome = () => {
        setActiveButton('Home');

        navigation.navigate('Home');

    }

    const navigateBatalha = () => {
        setActiveButton('Adicionar Batalha');

        navigation.navigate('Batalha');

    }

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigation.reset({
                index: 0,
                routes: [{ name: "Inicio" }],
            });
            Alert.alert("Você foi deslogado");
        } catch (error) {
            Alert.alert(error);
        }
    };

    const abrirPrivacidade = async () => {
        try {
            const url = 'http://politicaprivacidadesjurados.infinityfreeapp.com/?i=1';
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert("Erro", "Não foi possível abrir o link da política de privacidade");
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível abrir o link da política de privacidade");
        }
    };

    const abrirContato = async () => {
        try {
            const email = 'royalx481@gmail.com';
            const url = `mailto:${email}`;

            // Verificar se o dispositivo suporta o esquema mailto
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url); // Abre o aplicativo de e-mail
            } else {
                Alert.alert(
                    'Erro',
                    'Nenhum aplicativo de email está configurado ou disponível neste dispositivo.'
                );
            }
        } catch (error) {
            Alert.alert(
                'Erro',
                `Ocorreu um problema ao tentar abrir o email: ${error.message}`
            );
            console.error('Erro ao abrir email:', error);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            ) : (
                <View style={styles.main}>
                    <View style={styles.header}>
                        <Text style={styles.textMain}>Opções</Text>
                        <Text style={styles.text}>Gerencie sua conta e preferências</Text>
                    </View>

                    <View style={styles.parte2}>
                        <TouchableOpacity
                            style={[styles.button, isLoading && styles.buttonDisabled]}
                            onPress={abrirPrivacidade}
                            disabled={isLoading}
                        >
                            <View style={styles.buttonContent}>
                                <Image
                                    source={require('../assets/icons/privacidade.png')}
                                    style={styles.buttonIcon}
                                />
                                <Text style={styles.textBtn}>Política de Privacidade</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, isLoading && styles.buttonDisabled]}
                            onPress={abrirContato}
                            disabled={isLoading}
                        >
                            <View style={styles.buttonContent}>
                                <Image
                                    source={require('../assets/icons/suporte.png')}
                                    style={styles.buttonIcon}
                                />
                                <Text style={styles.textBtn}>Suporte</Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={[styles.button, isLoading && styles.buttonDisabled]}
                            onPress={handleLogout}
                            disabled={isLoading}
                        >
                            <View style={styles.buttonContent}>
                                <Image
                                    source={require('../assets/icons/sair.png')}
                                    style={styles.buttonIcon}
                                />
                                <Text style={styles.textBtn}>Sair</Text>
                            </View>
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
                        source={require('../assets/icons/home.png')}
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
                    onPress={navigateBatalha}
                    disabled={isLoading}
                >
                    <Image
                        source={require('../assets/icons/add.png')}
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
                    onPress={() => { setActiveButton('Opções') }}
                    disabled={isLoading}
                >
                    <Image
                        source={require('../assets/icons/options.png')}
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
        height: '90%',

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
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%',
        gap: 45,
    },
    button: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex',
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 6,
        backgroundColor: '#704BFF',
    },
    textBtn: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Montserrat_700Bold',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '700',
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#190a29',
        height: '90%'
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    header: {
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
        tintColor: '#FFFFFF'
    },
});


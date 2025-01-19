import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, TextInput, Linking, Alert, ActivityIndicator } from "react-native";
import { useFonts } from 'expo-font';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

import { useNavigation } from "@react-navigation/native";
import { auth } from "./firebase/index";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
} from "firebase/auth";


export default function Home() {
    const navigation = useNavigation();
    const [isFocused, setIsFocused] = useState(false)
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);



    const [fontsLoaded] = useFonts({
        Montserrat_400Regular, // Regular (normal weight)
        Montserrat_700Bold, // Bold weight
        'Ringstun': require('./assets/fonts/ringstun.ttf'),
    });

    // Se as fontes ainda não estiverem carregadas, exibe uma tela de carregamento.

    const handleRecuperarSenha = async () => {
        if (!email) {
            Alert.alert("Erro", "Por favor, insira seu e-mail");
            return;
        }

        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert(
                "Sucesso",
                "Um e-mail de recuperação de senha foi enviado para seu endereço"
            );
            navigation.navigate("Inicio");
        } catch (error) {
            let mensagemErro = "Erro ao enviar e-mail de recuperação";
            if (error.code === 'auth/user-not-found') {
                mensagemErro = "Não existe uma conta com este e-mail";
            } else if (error.code === 'auth/invalid-email') {
                mensagemErro = "E-mail inválido";
            }
            Alert.alert("Erro", mensagemErro);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./assets/imagens/background.jpg')} // Substitua pelo caminho da sua imagem no projeto
                style={styles.background}
                imageStyle={{ opacity: 0.4 }}
            >
                <View
                    style={styles.header}
                >
                    <TouchableOpacity onPress={() => { navigation.navigate("Inicio"); }}>
                        <Image
                            source={require("./assets/imagens/back.png")} // Substitua pelo caminho da sua imagem
                            style={styles.back}
                        />
                    </TouchableOpacity>
                    <Text style={styles.textMain}>Recuperaração de Senha</Text>

                </View>

                <View style={styles.parte1}>

                    <View style={styles.parte1}>
                        <Image
                            source={require("./assets/imagens/logo.png")} // Substitua pelo caminho da sua imagem
                            style={styles.logo}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, isFocused && styles.inputFocused]}
                            placeholder="E-mail cadastrado"
                            placeholderTextColor="#A0A0A0"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            value={email}
                            onChangeText={setEmail}
                            maxLength={50}
                        />
                        <View>
                            <Image
                                source={require("./assets/imagens/envelope.png")} // Substitua pelo caminho da sua imagem
                                style={styles.inputIcon}
                            />
                        </View>
                    </View>





                </View>
                <View style={styles.parte2}>

                    <TouchableOpacity
                        style={styles.BtnContainer}
                        disabled={isLoading}
                        onPress={handleRecuperarSenha}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <Text style={styles.BtnTextb}>Recuperar</Text>
                        )}

                    </TouchableOpacity>
                </View>
            </ImageBackground>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    logo: {
        width: 100, // Largura do botão
        height: 155, // Altura do botão
        resizeMode: "contain",
    },
    background: {
        flex: 1, // Ocupa toda a tela
        paddingTop: 45,
        paddingRight: 23,
        paddingBottom: 45,
        paddingLeft: 24,
    },
    header: {
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    back: {
        width: 30, // Largura do botão
        height: 30, // Altura do botão
        resizeMode: "contain",
    },
    textMain: {
        flex: 1, // Faz o texto ocupar o espaço restante
        color: '#FFF', // Cor branca (substituindo var(--White, #FFF))
        textAlign: 'center', // Alinhamento do texto no centro
        fontSize: 23,// Tamanho da fonte
        fontStyle: 'normal', // Estilo normal da fonte
        fontWeight: '400', // Peso da fonte

        fontFamily: 'Ringstun',
        paddingRight: 20,

    },
    parte1: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 50,
    },
    logo: {
        width: 90, // Largura do botão
        height: 145, // Altura do botão
        resizeMode: "contain",
        marginTop: 40,
    },
    parte2: {
        width: '100%',
        height: '100%',
        paddingBottom: 40,
        paddingTop: 36,
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
    text: {
        color: '#A5A5A5', // Cor Light-gray
        fontFamily: 'Montserrat_400Regular', // Fonte Montserrat
        fontSize: 10, // Tamanho da fonte
        fontStyle: 'normal', // Estilo da fonte
        fontWeight: '300', // Peso da fonte (Regular) 
    },
    mudarSenha: {
        width: '100%',
        alignItems: 'flex-end',
        paddingTop: 7
    },
    BtnsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        height: 50,

    },
    Btn: {
        // Garante que o gradiente não ultrapasse as bordas arredondadas
        width: '48%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex',
        paddingRight: 10,
        paddingLeft: 10,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        flexDirection: "row", // Coloca a imagem e o TextInput lado a lado
        borderRadius: 6,

    },
    BtnContainer: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex',
        paddingRight: 30,
        paddingLeft: 30,
        overflow: 'hidden',
        backgroundColor: '#704BFF',
        flexDirection: "row", // Coloca a imagem e o TextInput lado a lado
        borderRadius: 6,
    },
    BtnText: {
        color: '#ffffff',
        fontSize: 11
    },
    BtnTextb: {
        fontSize: 16, // Tamanho da fonte
        color: '#ffffff',
    },

    BtnPressed: {
        backgroundColor: '#704BFF', // Cor de fundo quando pressionado
        borderColor: '#704BFF', // Cor da borda quando pressionado
    },


});


import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useFonts } from 'expo-font';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useNavigation } from "@react-navigation/native";

export default function Home() {

    const navigation = useNavigation();
    const [isFocused, setIsFocused] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Controla a visibilidade do texto

    // Função para alternar o estado de 'clicado'
    const handlePress = () => {
        setIsPasswordVisible(!isPasswordVisible); // Alterna entre mostrar e esconder
        setClicked(!clicked);
    };

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular, // Regular (normal weight)
        Montserrat_700Bold, // Bold weight
        'BlowBrush': require('./assets/fonts/blowbrush.otf'),
    });

    const logar = async () => {
        setIsLoading(true);
        // Simula uma operação assíncrona antes de navegar
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        navigation.navigate("Home");
    }

    // Se as fontes ainda não estiverem carregadas, exibe uma tela de carregamento.
    if (!fontsLoaded) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./assets/imagens/background.jpg')} // Substitua pelo caminho da sua imagem no projeto
                style={styles.background}
                imageStyle={{ opacity: 0.4 }}
            >

                <TouchableOpacity onPress={() => { navigation.navigate("Inicio"); }}>
                    <Image
                        source={require("./assets/imagens/back.png")} // Substitua pelo caminho da sua imagem
                        style={styles.back}
                    />
                </TouchableOpacity>
                <View style={styles.parte1}>
                    <Image
                        source={require("./assets/imagens/logo.png")} // Substitua pelo caminho da sua imagem
                        style={styles.logo}
                    />
                </View>
                <View style={styles.parte2}>


                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, isFocused && styles.inputFocused]} // Aplica o estilo condicional
                            placeholder="E-mail"
                            placeholderTextColor="#A0A0A0"
                            onFocus={() => setIsFocused(true)} // Remove a borda quando o input está em foco
                            onBlur={() => setIsFocused(false)} // Restaura a borda quando perde o foco
                        />
                        <View>
                            <Image
                                source={require("./assets/imagens/envelope.png")} // Substitua pelo caminho da sua imagem
                                style={styles.inputIcon}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, isFocused && styles.inputFocused]} // Aplica o estilo condicional
                            placeholder="Senha"
                            placeholderTextColor="#A0A0A0"
                            secureTextEntry={!isPasswordVisible} // Esconde ou revela o texto
                            onFocus={() => setIsFocused(true)} // Remove a borda quando o input está em foco
                            onBlur={() => setIsFocused(false)} // Restaura a borda quando perde o foco
                        />
                        <TouchableOpacity onPress={handlePress}>
                            <Image
                                source={
                                    isPasswordVisible
                                        ? require("./assets/imagens/olho.png") // Imagem para mostrar a senha
                                        : require("./assets/imagens/olho.png") // Imagem para esconder a senha
                                }
                                style={styles.inputIcon}
                            />
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity style={styles.mudarSenha}>
                        <Text style={styles.text}>Esqueceu a senha?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.BtnContainer}
                        onPress={logar}
                        disabled={isLoading} // Desativa o botão enquanto carrega
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <>
                                <Image
                                    source={require("./assets/imagens/entrar.png")} // Substitua pelo caminho da sua imagem
                                    style={styles.btnIcon}
                                />
                                <Text style={styles.BtnText}>Entrar</Text>
                            </>
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
    background: {
        flex: 1, // Ocupa toda a tela
        paddingTop: 45,
        paddingRight: 23,
        paddingBottom: 45,
        paddingLeft: 24,
    },
    back: {
        width: 27, // Largura do botão
        height: 27, // Altura do botão
        resizeMode: "contain",
    },
    parte1: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100, // Largura do botão
        height: 155, // Altura do botão
        resizeMode: "contain",
        marginTop: 40,
    },
    parte2: {
        width: '100%',
        height: '100%',
        paddingBottom: 40,
        paddingTop: 40,
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
        fontSize: 14, // Tamanho da fonte
        fontStyle: 'normal', // Estilo da fonte
        fontWeight: '300', // Peso da fonte (Regular) 
        marginTop: 7
    },
    mudarSenha: {
        width: '100%',
        alignItems: 'flex-end',
        paddingTop: 7
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


});


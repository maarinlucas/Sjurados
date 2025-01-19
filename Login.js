import { useState, useEffect } from "react";
import { auth, db } from "./firebase/index";
import { getDatabase, ref, set, update, get } from 'firebase/database';

import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from 'date-fns'; // Importando a função de formatação
import { ptBR } from 'date-fns/locale';

import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert } from "react-native";
import { useFonts } from 'expo-font';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useNavigation } from "@react-navigation/native";

export default function Login() {

    const navigation = useNavigation();
    const [isFocused, setIsFocused] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Controla a visibilidade do texto
    const [user2, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Função para alternar o estado de 'clicado'
    const handlePress = () => {
        setIsPasswordVisible(!isPasswordVisible); // Alterna entre mostrar e esconder
        setClicked(!clicked);
    };

   

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular, // Regular (normal weight)
        Montserrat_700Bold, // Bold weight
        'Ringstun': require("./assets/fonts/ringstun.ttf"),
      });

    

    useEffect(() => {
        const loadCredentials = async () => {
            try {
                // Recupera email e senha armazenados no AsyncStorage
                const savedEmail = await AsyncStorage.getItem("loginEmail");
                const savedPassword = await AsyncStorage.getItem("loginPassword");

                if (savedEmail) setEmail(savedEmail); // Seta o email no estado
                if (savedPassword) setPassword(savedPassword); // Seta a senha no estado


            } catch (error) {
                console.error("Erro ao carregar credenciais: ", error);
            }
        };



        loadCredentials();


    }, []);

    useEffect(() => {

        // Monitorando o estado de autenticação
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // O usuário está autenticado
                setUser(currentUser);
                navigation.navigate('Home'); // Redireciona para Home caso já esteja logado

            } else {
                // Usuário não autenticado
                setUser(null);

            }
        });

        // Limpar a assinatura quando o componente for desmontado
        return () => unsubscribe();
    }, [navigation]);


    const logar = async () => {
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const loginTime = format(new Date(), "dd/MM/yyyy HH:mm:ss", { locale: ptBR });

            if (user.emailVerified) {
                // Armazena email e senha no AsyncStorage              
                const userRef = ref(db, "cadastroS/" + user.uid);
                await AsyncStorage.setItem("loginEmail", email);
                await AsyncStorage.setItem("loginPassword", password);

                // Obtem o número único do dispositivo
                /*   const deviceId = await DeviceInfo.getUniqueId();
                  const loginTime = format(new Date(), "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
   */
                // Armazenando dados no Realtime Database

                // Caminho onde os dados serão armazenados

                const snapshot = await get(userRef);

                /* const logRef = ref(db, `logins/${user.uid}-${deviceId}`); 
                await set(logRef, {
                    email: email,
                    deviceId: deviceId,
                    loginTime: loginTime,
                }); */
           /*      if (snapshot.exists()) {
                    const nome = snapshot.val().nome; // Obtenha o campo 'nome'

                    if (nome) {
                        // Agora crie a referência usando 'nome'
                        const logRef = ref(db, `logins/${user.uid}-${nome}`);

                        // Defina os dados no caminho novo
                        await set(logRef, {
                            email: email,
                            loginTime: loginTime,
                        });

                        console.log("Dados salvos com sucesso no caminho:", `logins/${user.uid}-${nome}`);
                    } else {
                        console.log("O campo 'nome' não existe para este usuário.");
                    }
                } else {
                    console.log("Nenhum dado encontrado para o usuário:", user.uid);
                } */

                // Referência ao caminho no Realtime Database (por exemplo, "cadastroS/emailDoUsuario")


                // Atualizando o campo específico (por exemplo, "nome" ou "senha")
                await update(userRef, {
                    senha: password, // Substitui o valor da senha
                });



                navigation.navigate("Home");
                setIsLoading(false);
            } else {
                // Se o e-mail não estiver verificado, desloga o usuário
                await auth.signOut();
                setIsLoading(false);
                Alert.alert("Por favor, verifique seu e-mail antes de fazer login.");
            }


        } catch (error) {
            setIsLoading(false);
            if (error instanceof FirebaseError) {
                let errorMessage;

                switch (error.code) {
                    case "auth/invalid-credential":
                        errorMessage = "A senha e/ou email inseridos não são válidos.";
                        break;
                    case "auth/invalid-email":
                        errorMessage = "O e-mail inserido não é válido.";
                        break;
                    case "auth/user-disabled":
                        errorMessage = "Esta conta foi desativada. Entre em contato com o suporte.";
                        break;
                    case "auth/user-not-found":
                        errorMessage = "Nenhuma conta encontrada com este e-mail.";
                        break;
                    case "auth/network-request-failed":
                        errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão com a internet.";
                        break;
                    case "auth/too-many-requests":
                        errorMessage = "O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou tentar novamente mais tarde.";
                        break;
                    default:
                        errorMessage = `Erro inesperado: ${error.message}`;
                        break;
                }

                Alert.alert("Erro ao realizar login", errorMessage);
                await auth.signOut();
            } else {
                console.error("Erro não identificado:", error);
                console.log("Tipo de erro:", error);
                console.log("Instância de FirebaseError:", error instanceof FirebaseError);
                // Caso não seja um erro do Firebase, exibe uma mensagem genérica
                Alert.alert("Erro desconhecido", "Não foi possível realizar o login.");
                await auth.signOut();
            }
        }
    }

    // Se as fontes ainda não estiverem carregadas, exibe uma tela de carregamento.

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
                            autoCapitalize="none"
                            style={[styles.input, isFocused && styles.inputFocused]} // Aplica o estilo condicional
                            placeholder="E-mail"
                            placeholderTextColor="#A0A0A0"
                            onFocus={() => setIsFocused(true)} // Remove a borda quando o input está em foco
                            onBlur={() => setIsFocused(false)} // Restaura a borda quando perde o foco
                            value={email}
                            onChangeText={setEmail}
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
                            autoCapitalize="none"
                            style={[styles.input, isFocused && styles.inputFocused]} // Aplica o estilo condicional
                            placeholder="Senha"
                            placeholderTextColor="#A0A0A0"
                            secureTextEntry={!isPasswordVisible} // Esconde ou revela o texto
                            onFocus={() => setIsFocused(true)} // Remove a borda quando o input está em foco
                            onBlur={() => setIsFocused(false)} // Restaura a borda quando perde o foco
                            value={password}
                            onChangeText={setPassword}
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


                    <TouchableOpacity 
                        style={styles.mudarSenha} 
                        onPress={() => navigation.navigate("Recuperar")}
                    >
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
        backgroundColor: '#000000',

    },
    background: {
        flex: 1, // Ocupa toda a tela
        paddingTop: 45,
        paddingRight: 23,
        paddingBottom: 45,
        paddingLeft: 24
    },
    back: {
        width: 30, // Largura do botão
        height: 30,// Altura do botão
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
        fontSize: 15, // Tamanho da fonte
        fontStyle: 'normal', // Estilo da fonte
        fontWeight: '300', // Peso da fonte (Regular) 
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#A5A5A5',
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


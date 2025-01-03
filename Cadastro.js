import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, TextInput, Linking, Alert, ActivityIndicator } from "react-native";
import { useFonts } from 'expo-font';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Checkbox } from 'expo-checkbox';
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "./firebase/index";
import { ref, set, get, child } from 'firebase/database';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";


export default function Home() {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [activeButton, setActiveButton] = useState('jurado');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mcOuJurado = (buttonId) => {

    setActiveButton(activeButton === buttonId ? null : buttonId);
  };
  const linkTermos = () => {
    // Coloque o URL que você deseja abrir
    const url = 'politicaprivacidadesjurados.infinityfreeapp.com';

    // Verifica se a URL pode ser aberta
    Linking.openURL(url).catch(err => console.error("Erro ao abrir o link", err));
  };

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular, // Regular (normal weight)
    Montserrat_700Bold, // Bold weight
    'BlowBrush': require('./assets/fonts/blowbrush.ttf'),
  });

  // Se as fontes ainda não estiverem carregadas, exibe uma tela de carregamento.
  if (!fontsLoaded) {
    return <Text>Carregando...</Text>;
  }

  const criarConta = async () => {
    // Obter identificador único do dispositivo
    setIsLoading(true);

    if (password !== password2) {
      Alert.alert("Erro", "As senhas não coincidem.");
      setIsLoading(false);
    } else if (!email || !name || !number || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      setIsLoading(false);
    } else if (isChecked == false) {
      Alert.alert("Erro", "Aceite os termos de uso e privacidade para comtinuar.");
      setIsLoading(false);
    } else {
      try {


        // Autenticação do usuário
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const currentDate = new Date().toLocaleString();
        await set(ref(db, `cadastroS/${user.uid}-${name}`), {
          nome: name,
          email: email,
          celular: number,
          senha: password, // Nota: Evite armazenar senhas em texto claro em produção
          dataCadastro: currentDate,
          mcJurado: activeButton
        });

        await sendEmailVerification(user);
        Alert.alert(
          "Cadastro realizado",
          `Um e-mail de verificação foi enviado para ${email}.`
        );
        setIsLoading(false);
        navigation.navigate("Inicio"); // Substitua "LoginScreen" pelo nome correto da sua tela de login
      } catch (error) {
        // Tratamento de erros personalizados
        switch (error.code) {
          case "auth/email-already-in-use":
            Alert.alert("Erro", "Este e-mail já está em uso. Tente outro.");
            setIsLoading(false);
            break;
          case "auth/invalid-email":
            Alert.alert("Erro", "E-mail inválido. Verifique o formato.");
            setIsLoading(false);
            break;
          case "auth/weak-password":
            Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
            setIsLoading(false);
            break;
          default:
            Alert.alert("Erro", `Erro ao realizar o cadastro: ${error.message}`);
            setIsLoading(false);
        }
      }
    }
  }


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
          <Text style={styles.textMain}>Criar Conta</Text>

        </View>

        <View style={styles.parte1}>


          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              style={[styles.input, isFocused && styles.inputFocused]} // Aplica o estilo condicional
              placeholder="Nome"
              placeholderTextColor="#A0A0A0"
              onFocus={() => setIsFocused(true)} // Remove a borda quando o input está em foco
              onBlur={() => setIsFocused(false)} // Restaura a borda quando perde o foco
              value={name}
              onChangeText={setName}
            />
            <View>
              <Image
                source={require("./assets/imagens/nome.png")} // Substitua pelo caminho da sua imagem
                style={styles.inputIcon}
              />
            </View>
          </View>


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
              placeholder="Telefone"
              placeholderTextColor="#A0A0A0"
              onFocus={() => setIsFocused(true)} // Remove a borda quando o input está em foco
              onBlur={() => setIsFocused(false)} // Restaura a borda quando perde o foco
              value={number}
              onChangeText={setNumber}
            />
            <View>
              <Image
                source={require("./assets/imagens/telefone.png")} // Substitua pelo caminho da sua imagem
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
              onFocus={() => setIsFocused(true)} // Remove a borda quando o input está em foco
              onBlur={() => setIsFocused(false)} // Restaura a borda quando perde o foco
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity>
              <Image
                source={require("./assets/imagens/olho.png")} // Substitua pelo caminho da sua imagem
                style={styles.inputIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              style={[styles.input, isFocused && styles.inputFocused]} // Aplica o estilo condicional
              placeholder="Confirmar senha"
              placeholderTextColor="#A0A0A0"
              onFocus={() => setIsFocused(true)} // Remove a borda quando o input está em foco
              onBlur={() => setIsFocused(false)} // Restaura a borda quando perde o foco
              value={password2}
              onChangeText={setPassword2}
            />
            <TouchableOpacity>
              <Image
                source={require("./assets/imagens/olho.png")} // Substitua pelo caminho da sua imagem
                style={styles.inputIcon}
              />
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.parte2}>

          <View style={styles.BtnsContainer}>

            <TouchableOpacity
              style={[styles.Btn, activeButton === 'mc' && styles.BtnPressed]} // Aplica a cor de fundo e borda quando pressionado
              onPress={() => mcOuJurado('mc')}
            >
              <Image
                source={require('./assets/imagens/save.png')} // Substitua pelo caminho da sua imagem
                style={styles.btnIcon}
              />
              <Text style={styles.BtnText}>Sou MC</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.Btn, activeButton === 'jurado' && styles.BtnPressed]} // Aplica a cor de fundo e borda quando pressionado
              onPress={() => mcOuJurado('jurado')}
            >
              <Image
                source={require('./assets/imagens/lapis.png')} // Substitua pelo caminho da sua imagem
                style={styles.btnIcon}
              />
              <Text style={styles.BtnText}>Sou jurado</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={isChecked}
              onValueChange={setIsChecked}
              style={styles.checkbox}

            />
            <TouchableOpacity style={styles.termos} onPress={linkTermos}>
              <Text style={styles.termosText}>

                <Text>Declaro que li e concordo com os </Text>
                <Text style={styles.linkText}>termos de uso e privacidade</Text><Text> do aplicativo.</Text>
              </Text>
            </TouchableOpacity>



          </View>
          <TouchableOpacity
            style={styles.BtnContainer}
            disabled={isLoading}
            onPress={criarConta}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.BtnTextb}>Criar conta</Text>
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
  header: {
    width: '100%',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  back: {
    width: 27, // Largura do botão
    height: 27, // Altura do botão
    resizeMode: "contain",
  },
  textMain: {
    flex: 1, // Faz o texto ocupar o espaço restante
    color: '#FFF', // Cor branca (substituindo var(--White, #FFF))
    textAlign: 'center', // Alinhamento do texto no centro
    fontSize: 22,// Tamanho da fonte
    fontStyle: 'normal', // Estilo normal da fonte
    fontWeight: '400', // Peso da fonte
    lineHeight: 25, // Altura da linha
    fontFamily: 'BlowBrush',
    paddingRight: 20,

  },
  parte1: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 76,
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
    marginTop: 25,

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
  btnIcon: {
    width: 12, // Largura da imagem
    height: 12, // Altura da imagem
    marginRight: 8, // Espaço entre a imagem e o campo de entrada
  },
  BtnPressed: {
    backgroundColor: '#704BFF', // Cor de fundo quando pressionado
    borderColor: '#704BFF', // Cor da borda quando pressionado
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 35
  },
  checkbox: {
    width: 27,
    height: 27,
    backgroundColor: 'black'
  },
  termos: {
    width: '90%',
  },
  termosText: {
    color: '#A5A5A5', // Cor Light-gray
    fontFamily: 'Montserrat_400Regular', // Fonte Montserrat
    fontSize: 12, // Tamanho da fonte
    fontStyle: 'normal', // Estilo da fonte
    textAlign: 'left',
    paddingLeft: 25

  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#A5A5A5', // Cor Light-gray
    fontSize: 12, // Tamanho da fonte
  }

});


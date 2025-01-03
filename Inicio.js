import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";


export default function Inicio() {
  const [isLoading, setIsLoading] = useState(false);
/*   const [carregando, setCarregando] = useState(null); */
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular, // Regular (normal weight)
    Montserrat_700Bold, // Bold weight
    'BlowBrush': require('./assets/fonts/blowbrush.ttf'),
  });

  // Se as fontes ainda não estiverem carregadas, exibe uma tela de carregamento.
  

  


  const paginaLogin = async () => {
    setIsLoading(true);
    // Simula uma operação assíncrona antes de navegar
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigation.navigate("Login");
  }


  if (!fontsLoaded) {
    return (

      <ImageBackground
        source={require('./assets/imagens/background.jpg')} // Substitua pelo caminho da sua imagem no projeto
        style={styles.background}
      >
        <ActivityIndicator color="#FFF" size="large" />
      </ImageBackground>


    )
  }

  return (

    <ImageBackground
      source={require('./assets/imagens/background.jpg')} // Substitua pelo caminho da sua imagem no projeto
      style={styles.background}
    >
      <View style={styles.parte1}>
        <Text style={styles.textMain}>Seja a batida que move o mundo{'\n'}
          mesmo quando o silêncio{'\n'}
          tenta te parar.</Text>
        <Text style={styles.textCitaçao}>Sonhos são reais.{'\n'}
          - Tupac Shakur</Text>
      </View>
      <View tyle={styles.parte2}>

        <TouchableOpacity
          style={styles.button}
          onPress={paginaLogin}
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

            <Text style={styles.textBtn}>Fazer login</Text>
          )}


        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate("Cadastro"); }}>
          <Text style={styles.textCriar}>Criar uma conta</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>


  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1, // Ocupa toda a tela
    alignItems: "center",
    justifyContent: 'flex-end',
    paddingTop: 45,
    paddingRight: 23,
    paddingBottom: 45,
    paddingLeft: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    // Garante que o gradiente não ultrapasse as bordas arredondadas
    width: 215,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'inline-flex',
    paddingRight: 30,
    paddingLeft: 30,
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
    lineHeight: 20, // Altura da linha
  },
  gradient: {
    flex: 1, // Preenche todo o botão
    justifyContent: 'center', // Centraliza o texto verticalmente
    alignItems: 'center', // Centraliza o texto horizontalmente
  },
  textMain: {
    color: '#FFF', // Cor branca (substituindo var(--White, #FFF))
    textAlign: 'center', // Alinhamento do texto no centro
    fontSize: 22, // Tamanho da fonte
    fontStyle: 'normal', // Estilo normal da fonte
    lineHeight: 25, // Altura da linha
    marginBottom: 10,
    fontFamily: 'BlowBrush'
  },
  textCitaçao: {
    color: '#A5A5A5', // Cor Light-gray
    textAlign: 'center', // Alinhamento centralizado
    fontFamily: 'Montserrat_400Regular', // Fonte Montserrat
    fontSize: 14, // Tamanho da fonte
    fontStyle: 'normal', // Estilo da fonte
    fontWeight: '300', // Peso da fonte (Regular)
    lineHeight: 13, // Altura da linha
    marginBottom: 20,
  },
  textCriar: {
    color: '#FFF', // Cor White
    textAlign: 'center', // Alinhamento centralizado
    fontFamily: 'Montserrat_400Regular', // Fonte Montserrat
    fontSize: 16, // Tamanho da fonte
    fontStyle: 'normal', // Estilo normal
    fontWeight: '400', // Peso regular da fonte
    textDecorationLine: 'underline', // Sublinha o texto
    textDecorationStyle: 'solid', // Estilo da linha de sublinhado
    textDecorationSkipInk: 'none', // Não ignora tinta para sublinhado (não suportado diretamente, mas pode ser omitido)
    textDecorationThickness: 1, // Espessura do sublinhado, sendo 1 o padrão em React Native
    textUnderlineOffset: 0, // Posição do sublinhado, 0 é o padrão,
  },
});


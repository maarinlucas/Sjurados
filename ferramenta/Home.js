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
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home() {
  const [activeButton, setActiveButton] = useState('Home');
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);



  const [batalhas, setBatalha] = useState([]);

  const loadData = async () => {
    try {
      const existingData = await AsyncStorage.getItem('batalhas'); // Recupera os dados
      const parsedData = existingData ? JSON.parse(existingData) : []; // Converte para array
      setBatalha(parsedData); // Atualiza o estado com os dados carregados

    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    }
  };

  useEffect(() => {
    loadData(); // Carrega os dados ao montar a tela
  }, []);

  const [userName, setUserName] = useState("Usuário");
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular, // Regular (normal weight)
    Montserrat_700Bold, // Bold weight
    'Ringstun': require("../assets/fonts/ringstun.ttf"),
  });

  // Se as fontes ainda não estiverem carregadas, exibe uma tela de carregamento.


  const navigateOpcoes = () => {
    setActiveButton('Opções');

    navigation.navigate('Opcoes');


  }

  const navigateBatalha = () => {
    setActiveButton('Adicionar Batalha');

    navigation.navigate('Batalha');

  }

  const handleAddBatalhaButton = () => {
    setIsLoadingAdd(true);
    setActiveButton('Adicionar Batalha');
    setIsLoadingAdd(false);
    navigation.navigate('Batalha');
  }

  const deleteData = async (id) => {
    try {
      const existingData = await AsyncStorage.getItem('batalhas');
      const parsedData = existingData ? JSON.parse(existingData) : [];

      // Filtra a batalha a ser excluída
      const updatedData = parsedData.filter(item => item.id !== id);

      await AsyncStorage.setItem('batalhas', JSON.stringify(updatedData)); // Atualiza o AsyncStorage
      setBatalha(updatedData); // Atualiza o estado local

    } catch (error) {
      console.error('Erro ao excluir os dados:', error);
    }
  };


  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const dbRef = ref(db);
          const snapshot = await get(child(dbRef, `cadastroS/${uid}`));
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserName(data.nome || "Usuário");
          } else {
            console.log("Nenhum dado encontrado para este usuário.");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar o nome do usuário:", error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      setIsLoadingScreen(false);
    });

    return unsubscribe;
  }, [navigation]);

  // Efeito para o carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingScreen(false);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {(isLoadingScreen || isLoadingUser) ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      ) : (
        <View style={styles.main}>
          {batalhas.length > 0 ? (
            <>
              <View style={styles.parte1b}>
                <Text style={styles.textMain}>Salve, {userName}!</Text>
                <Text style={styles.text}>Clique na batalha para mais informações</Text>
                <FlatList
                  style={{ width: '100%' }}
                  data={batalhas}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => <Historico data={item} onDelete={deleteData} />}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.parte1}>
                <Text style={styles.textMain}>Salve, {userName}!</Text>
                <Text style={styles.text}>Você ainda não tem batalhas salvas</Text>
              </View>
              <View style={styles.parte2}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={navigateBatalha}
                  disabled={isLoadingAdd}
                >
                  <LinearGradient
                    colors={['#842ED8', '#DB28A9', '#9D1DCA']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[StyleSheet.absoluteFill, { borderRadius: 8 }]}
                  />
                  {isLoadingAdd ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <Text style={styles.textBtn}>Adicionar batalha</Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      )}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.navItem,
            activeButton === 'Home' && styles.navItemActive,
          ]}
          onPress={() => setActiveButton('Home')}
          disabled={isLoadingScreen}
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
          disabled={isLoadingScreen}
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
          onPress={navigateOpcoes}
          disabled={isLoadingScreen}
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
    height: '90%'
  },
  parte1: {
    alignItems: 'flex-start',

  },
  parte1b: {
    alignItems: 'flex-start',
    height: '105%'

  },
  textMain: {
    color: '#FFFFFF', // Cor branca (substituindo var(--White, #FFF))
    fontSize: 29,// Tamanho da fonte
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#190a29',
    height: '90%'
  },
});


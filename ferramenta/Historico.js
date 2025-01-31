import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Historico({ data, onDelete }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageMC1, setSelectedImageMC1] = useState(null);
  const [selectedImageMC2, setSelectedImageMC2] = useState(null);

  const pickImage = async (mcNumber) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissão para acessar suas fotos!');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        const storageKey = `battle_${data.id}_mc${mcNumber}`;
        await AsyncStorage.setItem(storageKey, imageUri);
        mcNumber === 1 ? setSelectedImageMC1(imageUri) : setSelectedImageMC2(imageUri);
      }
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
    }
  };

  const loadSavedImages = async () => {
    try {
      const imagemc1 = await AsyncStorage.getItem(`battle_${data.id}_mc1`);
      const imagemc2 = await AsyncStorage.getItem(`battle_${data.id}_mc2`);

      if (imagemc1) setSelectedImageMC1(imagemc1);
      if (imagemc2) setSelectedImageMC2(imagemc2);
    } catch (error) {
      console.error('Erro ao carregar as imagens:', error);
    }
  };

  useEffect(() => {
    loadSavedImages();
  }, []);

  // Carregando a fonte
  const [fontsLoaded] = useFonts({
    'Ringstun': require('../assets/fonts/ringstun.ttf'),
    'BlowBrush': require('../assets/fonts/blowbrush.ttf') // Certifique-se de que o caminho está correto
  });

  // Verifica se as fontes foram carregadas
  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  const handleImagePress = (mcNumber) => {
    if ((mcNumber === 1 && selectedImageMC1) || (mcNumber === 2 && selectedImageMC2)) {
      pickImage(mcNumber);
    }
  };




  



  return (
    <View style={styles.batalhas}>
      <TouchableOpacity style={styles.batalha} onPress={() => setModalVisible(true)}>
        <View style={styles.nomeMc}>
          <View style={styles.mcContainer}>
          { (data.mc1RoundsVencidos > data.mc2RoundsVencidos || data.mc1RoundsVencidos == data.mc2RoundsVencidos) && (
              <Image
                source={require('../assets/imagens/trofeu.png')}
                style={[styles.trofeuIcon, { marginRight: 5 }]}
              />
            )}
            <Text style={[styles.textMc, { fontFamily: 'Ringstun' }]}>{data.mc1}</Text>
          </View>
        </View>

        <View style={styles.placarData}>
          <Text style={[styles.textData, { marginBottom: 10 }]}>{data.data}</Text>
          <Text style={styles.textPontos}>
            {Math.ceil(data.pontoTotal1)} X {Math.ceil(data.pontoTotal2)}
          </Text>
        </View>

        <View style={styles.nomeMc}>
          <View style={styles.mcContainer}>
            <Text style={[styles.textMc, { fontFamily: 'Ringstun' }]}>{data.mc2}</Text>
            {(data.mc2RoundsVencidos > data.mc1RoundsVencidos || data.mc2RoundsVencidos == data.mc1RoundsVencidos) && (
              <Image
                source={require('../assets/imagens/trofeu.png')}
                style={[styles.trofeuIcon, { marginLeft: 5 }]}
              />
            )}
          </View>
        </View>

        {/* Botão de excluir */}
        {/* <TouchableOpacity onPress={() => onDelete(data.id)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Excluir</Text>
        </TouchableOpacity> */}
      </TouchableOpacity>
      

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        
      >
        <View style={styles.modalContainer}>



          <View style={styles.header}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Text style={styles.textMain}>Dados da batalha
              </Text>
           
            </View>

            <Text style={styles.text}>Veja os dados completos da batalha</Text>
          </View>

          <View style={styles.modalContent}>

            <Text style={[styles.modalText, { marginVertical: 40 }]}>{data.data}</Text>



            <View style={styles.imagesContainer}>

              <View style={styles.mcImageSection}>

                <View style={styles.imageContainer}>
                  {selectedImageMC1 ? (
                    <Image source={{ uri: selectedImageMC1 }} style={styles.battleImage} />
                  ) : (
                    <TouchableOpacity onPress={() => pickImage(1)} style={styles.imagePlaceholder}>
                      <Text style={styles.imagePlaceholderText}>+</Text>
                      <Text style={[styles.imagePlaceholderText, { fontSize: 16 }]}>
                        Foto
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={[styles.mcName, { marginTop: 15, fontSize: 20, fontFamily: 'sans-serif', fontWeight: 'bold', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                  {(data.mc1RoundsVencidos > data.mc2RoundsVencidos || data.mc1RoundsVencidos == data.mc2RoundsVencidos) && (
                    <Image
                      source={require('../assets/imagens/trofeu.png')}
                      style={styles.trofeuIcon2a}
                    />
                  )}
                  <Text style={styles.mcName}>{data.mc1}</Text>
                </View>
              </View>

              <Text style={styles.modalText}>vs</Text>

              <View style={styles.mcImageSection}>


                <View style={styles.imageContainer}>
                  {selectedImageMC2 ? (
                    <Image source={{ uri: selectedImageMC2 }} style={styles.battleImage} />
                  ) : (
                    <TouchableOpacity onPress={() => pickImage(2)} style={styles.imagePlaceholder}>
                      <Text style={styles.imagePlaceholderText}>+</Text>
                      <Text style={[styles.imagePlaceholderText, { fontSize: 16 }]}>
                        Foto
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={[styles.mcName, { marginTop: 15, fontSize: 20, fontFamily: 'sans-serif', fontWeight: 'bold', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                  <Text style={styles.mcName}>{data.mc2}</Text>
                  {(data.mc2RoundsVencidos > data.mc1RoundsVencidos || data.mc2RoundsVencidos == data.mc1RoundsVencidos) && (
                    <Image
                      source={require('../assets/imagens/trofeu.png')}
                      style={styles.trofeuIcon2b}
                    />
                  )}
                </View>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.progressBarsContainer}>

              <Text style={styles.criterioText}>Rounds vencidos</Text>
              <View style={styles.criterioContainer}>

                <Text style={styles.modalTextPontos}>{data.mc1RoundsVencidos}</Text>
                
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${(data.mc1RoundsVencidos / (data.mc1RoundsVencidos + data.mc2RoundsVencidos)) * 100}%`
                      }
                    ]}
                  />
                </View>

                <Text style={styles.modalTextPontos}>{data.mc2RoundsVencidos}</Text>
              </View>

              <Text style={styles.criterioText}>Flow</Text>
              <View style={styles.criterioContainer}>

                <Text style={styles.modalTextPontos}>{data.flowTotal1}</Text>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${(data.flowTotal1 / (data.flowTotal1 + data.flowTotal2)) * 100}%`
                      }
                    ]}
                  />
                </View>
                <Text style={styles.modalTextPontos}>{data.flowTotal2}</Text>
              </View>

              <Text style={styles.criterioText}>Técnica</Text>
              <View style={styles.criterioContainer}>

                <Text style={styles.modalTextPontos}>{data.tecnicaTotal1}</Text>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${(data.tecnicaTotal1 / (data.tecnicaTotal1 + data.tecnicaTotal2)) * 100}%`
                      }
                    ]}
                  />
                </View>
                <Text style={styles.modalTextPontos}>{data.tecnicaTotal2}</Text>
              </View>

              <Text style={styles.criterioText}>Palco</Text>
              <View style={styles.criterioContainer}>
                <Text style={styles.modalTextPontos}>{data.palcoTotal1}</Text>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${(data.palcoTotal1 / (data.palcoTotal1 + data.palcoTotal2)) * 100}%`
                      }
                    ]}
                  />
                </View>
                <Text style={styles.modalTextPontos}>{data.palcoTotal2}</Text>
              </View>


              <Text style={styles.criterioText}>Pontuação Total</Text>
              <View style={styles.criterioContainer}>
                <Text style={styles.modalTextPontos}>{data.pontoTotal1}</Text>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${(data.pontoTotal1 / (data.pontoTotal1 + data.pontoTotal2)) * 100}%` // Cor dourada para destacar
                      }
                    ]}
                  />
                </View>
                <Text style={styles.modalTextPontos}>{data.pontoTotal2}</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: '#704BFF' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, { backgroundColor: '#FF0000' }]}
                onPress={() => onDelete(data.id)}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>

          </View>




        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  batalhas: {
    width: "100%",
    backgroundColor: '#red',
  },
  header: {
    alignItems: 'flex-start',
  },
  textMain: {
    color: '#FFFFFF',
    fontSize: 29,
    fontFamily: 'Ringstun',
  },
  text: {
    color: '#A5A5A5',
    fontSize: 14,
    fontWeight: '300',
    marginTop: 4
  },
  placarData: {
    width: '40%',
  },
  batalha: {
    flexDirection: "row",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 25,
    height: 110,
  },
  nomeMc: {
    height: "100%",
    paddingTop: 39,
    width: '30%'
  },
  textMc: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 12,
    fontFamily: 'Ringstun',
    textAlign: 'center'
  },
  textData: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: 'Ringstun',
    textAlign: 'center'
  },
  textPontos: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: 'Ringstun',
    textAlign: 'center',
    letterSpacing: 2
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
  deleteButton: {
    borderRadius: 5,
  },
  deleteIcon: {
    width: 27,
    height: 27,
    tintColor: '#FF0000',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mcContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trofeuIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  trofeuIcon2a: {
    width: 20,
    height: 20,
    marginRight: 5,
    marginBottom: 12
  },
  trofeuIcon2b: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginBottom: 12
  },
  modalContainer: {
    paddingTop: 30,
    paddingRight: 40,
    paddingBottom: 30,
    paddingLeft: 40,
    backgroundColor: '#190a29',
    height: '100%',
  },
  closeButton: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: '#190a29',
  },
  modalText: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Ringstun',
    marginBottom: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  mcImageSection: {
    alignItems: 'center',
  },
  mcName: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Ringstun',
    marginBottom: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  battleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'Ringstun',
  },
  progressBarsContainer: {
    width: '100%',
    rowGap: 6,
    justifyContent: 'center',
    
  },
  criterioContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  criterioText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  modalTextPontos: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Ringstun',
    marginBottom: 10,
    width: '20%',
    textAlign: 'center'
  },
  progressBarBackground: {
    width: '60%',
    height: 12,
    backgroundColor: '#D8B3FF',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#704BFF',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ffffff',
    marginVertical: 7,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,

  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
    minWidth: 135,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Ringstun',
    fontWeight: 'bold',
  },
});


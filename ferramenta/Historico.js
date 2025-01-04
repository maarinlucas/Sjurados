import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

export default function Historico({ data, onDelete }) {
  // Carregando a fonte
  const [fontsLoaded] = useFonts({
    'Ringstun': require('../assets/fonts/ringstun.ttf'),
    'BlowBrush': require('../assets/fonts/blowbrush.ttf') // Certifique-se de que o caminho está correto
  });

  // Verifica se as fontes foram carregadas
  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <View style={styles.batalhas}>
      <TouchableOpacity style={styles.batalha}>
        <View style={styles.nomeMc}>
          <Text style={styles.textMc}>{data.mc1}</Text>
        </View>

        <View style={styles.placarData}>
          <Text style={styles.textData}>{data.data}</Text>
          <Text style={styles.textPontos}>
            {data.ponto1} X {data.ponto2}
          </Text>
        </View>

        <View style={styles.nomeMc}>
          <Text style={styles.textMc}>{data.mc2}</Text>
        </View>

        {/* Botão de excluir */}
        <TouchableOpacity onPress={() => onDelete(data.id)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Excluir</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  batalhas: {
    width: "100%",
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
  },
  textMc: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "BlowBrush", // Nome da fonte
    textAlign: 'center'
  },
  textData: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "BlowBrush", // Nome da fonte
    textAlign: 'center'
  },
  textPontos: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "BlowBrush", // Nome da fonte
    textAlign: 'center',
    letterSpacing: 2
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

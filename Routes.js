import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Inicio from "./Inicio";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Home from "./ferramenta/Home";
import Opcoes from "./ferramenta/Opcoes";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Inicio"
      >
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Opcoes" component={Opcoes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

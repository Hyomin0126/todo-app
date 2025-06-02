import { StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import tabConfig from "./configs/tabConfig";
import { TodosProvider } from "./Components/TodosProvider";

const Stack = createNativeStackNavigator({});
const Tabs = createBottomTabNavigator();

export default function App() {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const routeConfig = tabConfig.find(
        (config) => config.name === route.name
      );

      const iconNmae = focused
        ? routeConfig.focuedIcon
        : routeConfig.unfocusedIcon;
      const IconComponent = routeConfig.iconComponent;

      return <IconComponent name={iconNmae} size={size} color={color} />;
    },
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: "bold",
    },
    headerStyle: {
      elevation: 0,

      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    tabBarLabelStyle: {
      fontSize: 13,
      paddingBottom: 10,
      fontWeight: "bold",
    },
    tabBarStyle: {},
    tabBarInactiveTintColor: "grey",
    tabBarActiveTintColor: "black",
  });

  return (
    <TodosProvider>
      <NavigationContainer>
        <Tabs.Navigator screenOptions={screenOptions}>
          {tabConfig.map((routeConfig) => (
            <Tabs.Screen
              key={routeConfig.name}
              name={routeConfig.name}
              component={routeConfig.component}
              options={{ title: routeConfig.title }}
            />
          ))}
        </Tabs.Navigator>
      </NavigationContainer>
    </TodosProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

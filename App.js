import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";

import tabConfig from "./configs/tabConfig";
import { TodosProvider } from "./Components/TodosProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoadingContext, {
  AppLoadingProvider,
} from "./Components/AppLoadingProvider";

const { width, height } = Dimensions.get("window");

const CustomHeader = ({ title }) => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const Stack = createNativeStackNavigator({});
const Tabs = createBottomTabNavigator();

const AppWithNavigation = () => {
  const { fontsLoaded } = useContext(AppLoadingContext);

  if (!fontsLoaded) {
    return null;
  }

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
      fontFamily: "customFont",
    },
    tabBarStyle: {
      height: "9%",
    },
    tabBarInactiveTintColor: "grey",
    tabBarActiveTintColor: "black",
  });
  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={screenOptions}>
        {tabConfig.map((routeConfig) => (
          <Tabs.Screen
            key={routeConfig.name}
            name={routeConfig.name}
            component={routeConfig.component}
            options={{
              title: routeConfig.title,
              header: () => <CustomHeader title={routeConfig.title} />,
            }}
          />
        ))}
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AppLoadingProvider>
      <TodosProvider>
        <AppWithNavigation />
      </TodosProvider>
    </AppLoadingProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    height: height * 0.13,
  },
  headerBox: {
    height: height * 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "customFont",
  },
});

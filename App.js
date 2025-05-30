import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <Button
        title="Add Task"
        onPress={() => navigation.navigate("TodoWrite")}
      />
    </View>
  );
};

const TodoWriteScreen = ({ navigation }) => {
  const [todo, setTodo] = useState("");

  return (
    <>
      <TextInput
        multiline
        onChangeText={setTodo}
        value={todo}
        placeholder="Please add your task"
        style={{
          flex: 0.3,
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          borderWidth: 2,
          margin: 10,
        }}
      />
      <Pressable
        onPress={() => {
          navigation.navigate("Details", { params: { todo } });
          setTodo("");
        }}
      >
        <Text
          style={{
            padding: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
            borderWidth: 2,
            width: "30%",
            textAlign: "center",
            fontWeight: "bold",
            margin: 10,
          }}
        >
          Add
        </Text>
      </Pressable>
    </>
  );
};

const DetailScreen = ({ navigation, route }) => {
  const todo = route.params?.todo;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>Detail Screen</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Task List : {todo}
      </Text>
      <Button
        title="Go back Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

const Stack = createNativeStackNavigator({});
const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/*<Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#F4511E",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <Pressable onPress={() => alert("Clicked")}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Menu</Text>
            </Pressable>
          ),
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Main",
          }}
        />
        <Stack.Screen name="TodoWrite" component={TodoWriteScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator> */}
      <Tabs.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 13,
            paddingBottom: 10,
            fontWeight: "bold",
          },
          tabBarStyle: {},
          tabBarInactiveTintColor: "grey",
          tabBarActiveTintColor: "black",
          tabBarTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <Pressable onPress={() => alert("Clicked")}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Menu</Text>
            </Pressable>
          ),
        }}
      >
        <Tabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Main",
            tabBarIcon: (focused) => (
              <FontAwesome name="home" size={28} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="Add"
          component={TodoWriteScreen}
          options={{
            title: "Add Task",
            tabBarIcon: (focused) => (
              <MaterialIcons
                name="format-list-bulleted-add"
                size={28}
                color="black"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Details"
          component={DetailScreen}
          options={{
            title: "Add Task",
            tabBarIcon: (focused) => (
              <Feather name="list" size={28} color="black" />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
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

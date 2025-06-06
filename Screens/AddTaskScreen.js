import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useState } from "react";
import TodosContext from "../Components/TodosProvider";
import AppLoadingContext from "../Components/AppLoadingProvider";

const { width, height } = Dimensions.get("window");

const AddTaskScreen = ({ navigation }) => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useContext(TodosContext);
  const { fontsLoaded } = useContext(AppLoadingContext);

  const handleAddTodo = () => {
    if (!todo.trim()) {
      Alert.alert("Please write your task");
      return;
    }

    addTodo(todo);
    navigation.navigate("TaskList");
    setTodo("");
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={styles.inputBox}>
            <TextInput
              multiline
              onChangeText={setTodo}
              value={todo}
              placeholder="Please write your task"
              style={styles.textInput}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "center",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <Pressable style={styles.presseableBtn} onPress={handleAddTodo}>
              <Text style={styles.text}>Add</Text>
            </Pressable>
            <Pressable
              style={styles.presseableBtn}
              onPress={() => {
                navigation.navigate("Home");
                setTodo("");
              }}
            >
              <Text style={styles.text}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    minHeight: height * 0.25,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "customFont",
  },
  presseableBtn: {
    padding: 10,
    width: "50%",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "customFont",
  },
});

export default AddTaskScreen;

import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import TodosContext from "../Components/TodosProvider";

const AddTaskScreen = ({ navigation }) => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useContext(TodosContext);

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
      <TextInput
        multiline
        onChangeText={setTodo}
        value={todo}
        placeholder="Please write your task"
        style={styles.inputBox}
      />
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
    </>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    minHeight: 200,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
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
  },
});

export default AddTaskScreen;

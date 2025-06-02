import { Text, View, StyleSheet } from "react-native";
import React, { useContext } from "react";
import TodosContext from "../Components/TodosProvider";

const TaskListScreen = ({ route }) => {
  const { todos } = useContext(TodosContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <View key={todo.id} style={styles.listBox}>
            <Text>No: {todo.id}</Text>
            <Text>Date: {todo.regDate}</Text>
            <Text>Task: {todo.content}</Text>
          </View>
        ))
      ) : (
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Nothing to do</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listBox: {
    borderWidth: 2,
    width: "90%",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});

export default TaskListScreen;

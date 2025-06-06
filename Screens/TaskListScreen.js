import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import TodosContext from "../Components/TodosProvider";
import { ListItem, Icon } from "@rneui/themed";
import AppLoadingContext from "../Components/AppLoadingProvider";

const { width, height } = Dimensions.get("window");

const TodoListItem = ({ todo, onModifyTodo, onRemoveTodo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { fontsLoaded } = useContext(AppLoadingContext);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View
      style={{
        marginVertical: 5,
        marginHorizontal: 10,
        borderWidth: 2,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <ListItem.Swipeable
        bottomDivider
        style={styles.listBox}
        leftContent={(reset) => (
          <Pressable
            style={{ ...styles.pressableBtn, backgroundColor: "blue" }}
            onPress={() => onModifyTodo(todo, reset)}
          >
            <Icon name="edit" color="white" />
            <Text style={styles.btnText}>Edit</Text>
          </Pressable>
        )}
        rightContent={(reset) => (
          <Pressable
            style={{ ...styles.pressableBtn, backgroundColor: "red" }}
            onPress={() => onRemoveTodo(todo.id, reset)}
          >
            <Icon name="delete" color="white" />
            <Text style={styles.btnText}>Delete</Text>
          </Pressable>
        )}
      >
        <ListItem.Content>
          <ListItem.Title>No: {todo.id}</ListItem.Title>
          <Text>Date: {todo.regDate}</Text>
          <Pressable onPress={toggleExpand} style={styles.contentBox}>
            <Text numberOfLines={isExpanded ? null : 2} ellipsizeMode="tail">
              Task: {todo.content}
            </Text>
          </Pressable>
        </ListItem.Content>
      </ListItem.Swipeable>
    </View>
  );
};

const TodoModifytModal = ({
  modalVisible,
  setModalVisible,
  modifiedContent,
  setModifiedContent,
  onModifyTodo,
  closeModal,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pressable style={styles.modalBox}>
              <View style={styles.modalInner}>
                <TextInput
                  multiline
                  maxLength={200}
                  style={styles.modalInput}
                  placeholder="Please write your task to edit"
                  placeholderTextColor="gray"
                  value={modifiedContent}
                  onChangeText={setModifiedContent}
                />
              </View>
              <View style={styles.modalBtnBox}>
                <TouchableOpacity onPress={onModifyTodo}>
                  <Text style={styles.modalBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal}>
                  <Text style={styles.modalBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const TaskListScreen = () => {
  const { todos, removeTodo, modifyTodo } = useContext(TodosContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [modifiedContent, setModifiedContent] = useState("");

  const openModifyModal = (todo, reset) => {
    setSelectedTodoId(todo.id);
    setModifiedContent(todo.content);
    reset();
    setModalVisible(true);
  };
  const handleModifyTodo = () => {
    if (selectedTodoId !== null) {
      modifyTodo(selectedTodoId, modifiedContent);
    }
    setModifiedContent(null);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModifiedContent(modifiedContent);
    setModalVisible(false);
  };

  const handelRemoveTodo = (id, reset) => {
    Alert.alert(
      "Delete Task",
      "Do you want to delete this task?",
      [
        {
          text: "Delete",
          onPress: () => {
            removeTodo(id);
            reset();
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => reset(),
          style: "cancel",
        },
      ],
      {
        //Android
        cancelable: true,
        onDismiss: () => reset(),
      }
    );
  };

  return (
    <View style={styles.taskListContaioner}>
      {todos.length > 0 ? (
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TodoListItem
              todo={item}
              onModifyTodo={openModifyModal}
              onRemoveTodo={handelRemoveTodo}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Nothing to do</Text>
      )}
      <TodoModifytModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modifiedContent={modifiedContent}
        setModifiedContent={setModifiedContent}
        onModifyTodo={handleModifyTodo}
        closeModal={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskListContaioner: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listBox: {},
  pressableBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderRadius: 10,
  },
  modalInner: {
    flex: 0.1,
    width: width * 0.8,
    minHeight: height * 0.3,
  },
  modalInput: {
    padding: 10,
    fontSize: 15,
    fontFamily: "customFont",
  },
  modalBtnBox: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 15,
    paddingRight: 20,
  },
  modalBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "customFont",
  },
});

export default TaskListScreen;

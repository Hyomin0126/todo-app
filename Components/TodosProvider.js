import { useRef, useState, createContext } from "react";
import { dateToStr } from "../Utilities/utility";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const testTodo = [
    {
      id: 1,
      content: "Test Content 1",
      regDate: dateToStr(new Date()),
    },
    {
      id: 2,
      content: "Test Content 2",
      regDate: dateToStr(new Date()),
    },
    {
      id: 3,
      content: "Test Content 3",
      regDate: dateToStr(new Date()),
    },
    {
      id: 4,
      content: "Test Content 1",
      regDate: dateToStr(new Date()),
    },
    {
      id: 5,
      content: "Test Content 2",
      regDate: dateToStr(new Date()),
    },
    {
      id: 6,
      content: "Test Content 3",
      regDate: dateToStr(new Date()),
    },
    {
      id: 7,
      content: "Test Content 1",
      regDate: dateToStr(new Date()),
    },
    {
      id: 8,
      content: "Test Content 2",
      regDate: dateToStr(new Date()),
    },
    {
      id: 9,
      content: "Test Content 3",
      regDate: dateToStr(new Date()),
    },
    {
      id: 10,
      content: "Test Content 1",
      regDate: dateToStr(new Date()),
    },
    {
      id: 11,
      content: "Test Content 2",
      regDate: dateToStr(new Date()),
    },
    {
      id: 12,
      content: "Test Content 3",
      regDate: dateToStr(new Date()),
    },
  ];

  // const [todos, setTodos] = useState([]);
  // const lastTodoIdRef = useRef(0);

  const [todos, setTodos] = useState([...testTodo]);
  const lastTodoIdRef = useRef(testTodo.length);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;
    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date()),
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id != id);
    setTodos(newTodos);
  };

  const modifyTodo = (id, newContent) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, content: newContent } : todo
    );

    setTodos(newTodos);
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo, removeTodo, modifyTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;

import { useRef, useState, createContext } from "react";
import { dateToStr } from "../Utilities/utility";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const lastTodoIdRef = useRef(0);

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

  return (
    <TodosContext.Provider value={{ todos, addTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;

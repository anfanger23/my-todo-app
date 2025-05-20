import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  // 🆕 Tilføj filter state til filtrering i TodoList
  const [filter, setFilter] = useState({
    type: '',              // 'hurtig' eller 'stor'
    tag: '',               // fx 'Skole' eller 'Hjem'
    showTodayOnly: false,  // checkbox
  });

  // Tilføj ny opgave
  const addTodo = ({
    title,
    type,
    estimatedMinutes,
    deadline,
    dailyLimit,
    tags = []
  }) => {
    const newTodo = {
      id: uuidv4(),
      title,
      type,
      estimatedMinutes: type === 'stor' ? Number(estimatedMinutes) : Number(estimatedMinutes) || 15,
      deadline: type === 'stor' ? deadline : null,
      dailyLimit: type === 'stor' ? Number(dailyLimit) : null,
      tags,
      plannedBlocks: [],
      isDone: false,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  // Skift status
  const toggleDone = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // Slet opgave
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleDone,
        deleteTodo,
        filter,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
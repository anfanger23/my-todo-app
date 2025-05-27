import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const [filter, setFilter] = useState({
    type: '',
    tag: '',
    showTodayOnly: false,
  });

  const addTodo = ({
    title,
    type,
    estimatedMinutes,
    deadline,
    tags = []
  }) => {
    const newTodo = {
      id: uuidv4(),
      title,
      type,
      estimatedMinutes: type === 'stor' ? Number(estimatedMinutes) : Number(estimatedMinutes) || 15,
      deadline: type === 'stor' ? deadline : null,
      tags,
      isDone: false,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleDone = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 🆕 Log arbejdstid på stor opgave
  const logTime = (id, minutes) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id && todo.type === 'stor' && !todo.isDone) {
          const remaining = Math.max(todo.estimatedMinutes - minutes, 0);
          return {
            ...todo,
            estimatedMinutes: remaining,
            isDone: remaining === 0,
          };
        }
        return todo;
      })
    );
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
        logTime,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filter: {
    type: '',
    tag: '',
    showTodayOnly: false,
  },
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare({ title, type, estimatedMinutes, deadline, tags }) {
        return {
          payload: {
            id: nanoid(),
            title,
            type,
            estimatedMinutes: type === 'stor'
              ? Number(estimatedMinutes)
              : Number(estimatedMinutes) || 15,
            deadline: type === 'stor' ? deadline : null,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            isDone: false,
            createdAt: new Date().toISOString().split('T')[0],
            plannedBlocks: [],
          },
        };
      },
    },

    toggleDone(state, action) {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) todo.isDone = !todo.isDone;
    },

    deleteTodo(state, action) {
      state.items = state.items.filter(t => t.id !== action.payload);
    },

    setFilter(state, action) {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },

    //reducer til logning af arbejdstid
    logTime(state, action) {
      const { id, minutes } = action.payload;
      const todo = state.items.find(t => t.id === id);
      if (todo && todo.type === 'stor' && !todo.isDone) {
        todo.estimatedMinutes = Math.max(todo.estimatedMinutes - minutes, 0);
        if (todo.estimatedMinutes === 0) {
          todo.isDone = true;
        }
      }
    },
  },
});

export const { addTodo, toggleDone, deleteTodo, setFilter, logTime } = todosSlice.actions;
export default todosSlice.reducer;
export const selectTodos = (state) => state.todos.items;
export const selectFilter = (state) => state.todos.filter;
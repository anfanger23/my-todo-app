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
      prepare({ title, type, estimatedMinutes, deadline, dailyLimit, tags }) {
        return {
          payload: {
            id: nanoid(),
            title,
            type,
            estimatedMinutes: type === 'stor'
              ? Number(estimatedMinutes)
              : Number(estimatedMinutes) || 15,
            deadline: type === 'stor' ? deadline : null,
            dailyLimit: type === 'stor' ? Number(dailyLimit) : null,
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
  },
});

export const { addTodo, toggleDone, deleteTodo, setFilter } = todosSlice.actions;
export default todosSlice.reducer;
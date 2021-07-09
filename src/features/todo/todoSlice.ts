import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoState } from 'utils/types/todo';

const initialState: TodoState = {
  todos: [],
  filteredTodos: [],
  filterType: 'All',
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    updateTodos: (state: TodoState, action: PayloadAction<Array<Todo>>) => {
      state.todos = action.payload;
    },
    updateFilteredTodos: (state: TodoState, action: PayloadAction<Array<Todo>>) => {
      state.filteredTodos = action.payload;
    },
    updateFilterType: (state: TodoState, action: PayloadAction<string>) => {
      state.filterType = action.payload;
    }
  }
});

export const { updateTodos, updateFilteredTodos, updateFilterType } = todoSlice.actions;

export default todoSlice.reducer;
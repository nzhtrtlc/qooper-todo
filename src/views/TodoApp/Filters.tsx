import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { updateFilteredTodos, updateFilterType } from 'features/todo/todoSlice';
import { Todo } from 'utils/types/todo';

const FiltersWrapper = styled.div`
  margin-bottom: 15px;

  button {
    min-width: 50px;
    font-size: 13px;
    margin-right: 5px;
    outline: none;
    background-color: transparent;
    color: white;
    border: 1px solid silver;
    padding: 10px;
    border-radius: 20px;

    &[data-active="true"] {
      background-color: #fe3c78;

      &:hover {
        background-color: #fe3c78;
      }
    }

    &:hover {
      cursor: pointer;
      background-color: #3c3a3e;
    }
  }
`

function Filters(): JSX.Element {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector(state => state.todo);
  const filters = ['All', 'Completed', 'Todos'];
  const { filterType, todos } = todoState;
  const updateFilter = useCallback(
    (filterName: string) => {
      let filteredTodos = todos;
      if (filterType === 'All') {
        dispatch(updateFilteredTodos(todos));
      }
      if (filterType === 'Completed') {
        filteredTodos = todos.filter((todo: Todo) => todo.isCompleted);
      } else if (filterType === 'Todos') {
        filteredTodos = todos.filter((todo: Todo) => !todo.isCompleted);
      }
      dispatch(updateFilteredTodos(filteredTodos));
      dispatch(updateFilterType(filterName));
    },
    [todos, filterType, dispatch],
  );
  useEffect(() => {
    updateFilter(filterType);
  }, [todos, filterType, updateFilter]);
  return (
    <FiltersWrapper>
      {filters.map(f =>
        <button key={f} onClick={() => updateFilter(f)} data-active={filterType === f}>{f}</button>
      )}
    </FiltersWrapper>
  )
}

export default Filters;
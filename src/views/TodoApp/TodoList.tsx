import TodoItem from './TodoItem';
import React, { useEffect } from 'react';
import { db, firebase } from 'utils/firebase';
import { Todo } from 'utils/types/todo';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'utils/hooks';
import { updateTodos } from 'features/todo/todoSlice';

const NoItems = styled.h3`
  color: #ECEFF1;
  text-align: center;
  font-weight: 100;
`

const sortTodosByCompleted = ((a: Todo, b: Todo) => {
  return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
})

function TodoList(): JSX.Element {
  const dispatch = useDispatch();
  const todoState = useAppSelector(state => state.todo);
  useEffect(() => {
    return db.onSnapshot((todo: firebase.firestore.QuerySnapshot) => {
        const todoItems: Array<Todo> = [];
        todo.docs.forEach(item => todoItems.push({
          id: item.id,
          text: item.data().text,
          isCompleted: item.data().isCompleted
        }));
        dispatch(updateTodos(todoItems));
      }
    );
  }, [dispatch]);
  const { todos, filteredTodos, filterType } = todoState;
  const renderTodos = filterType === 'All' ? todos : filteredTodos;
  console.log('TodoList.tsx');
  return (
    <div className="todo-list">
      {renderTodos.length === 0 && <NoItems className="no-items">There are no items yet</NoItems>}
      {[...renderTodos] // array spread used to avoid immutable problem in sort() function
        .sort(sortTodosByCompleted)
        .map((todo: Todo) =>
          <TodoItem id={todo.id}
                    key={todo.id}
                    isCompleted={todo.isCompleted}
                    value={todo.text}
          />
        )}
    </div>
  )
}

export default TodoList;
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { db, firebase } from 'utils/firebase';
import React, { useEffect, useState } from 'react';

const Dashboard = styled.div`
  padding-top: 75px;

  .dashboard-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .dashboard-col {
    flex: 0 0 50%;
    max-width: 50%;
  }

  .new-todo input {
    width: 100%;
    outline: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid #B3B3B3;
    margin-bottom: 25px;
    padding: 12px 20px;
    font-size: 18px;
    color: #fff;
  }

  .todo-list-item-checked .todo-list-item-check path {
    fill: #fff;
  }

  .todo-list-item-checked .todo-list-item-check circle {
    stroke: #4c6bf7;
    fill: #4c6bf7;
  }

  .todo-list-item-checked .todo-list-item-check:hover svg circle {
    stroke: #fff;
    fill: transparent;
    transition: .3s ease;
  }

  .todo-list-item-checked .todo-list-item-check:hover svg path {
    fill: #fff;
    transition: .3s ease;
  }
`

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

function TodoApp(): JSX.Element {
  const newEntryRef: React.RefObject<any> = React.createRef();
  const [todos, setTodos] = useState(Array<Todo>());
  useEffect(() => {
    const unsubscribe = db.onSnapshot((todo: firebase.firestore.QuerySnapshot) => {
        const items: Array<Todo> = [];
        todo.docs.forEach(item => items.push({
          id: item.id,
          text: item.data().text,
          isCompleted: item.data().isCompleted
        }));
        setTodos(items);
      }
    )
    return unsubscribe;
  }, []);
  const onSave = () => {
    db.add({
      isCompleted: false,
      text: newEntryRef.current.value.trim()
    });
  }
  return (
    <Dashboard>
      <div className="dashboard-row">
        <div className="dashboard-col">
          <div className="new-todo">
            <input type="text" ref={newEntryRef} placeholder="New ToDo" onKeyPress={e => {
              if (e.key === 'Enter') {
                console.log('heyt');
                onSave()
              }
            }}/>
          </div>

          <div className="todo-list">
            {todos.map(t =>
              <TodoItem id={t.id}
                        key={t.id}
                        isCompleted={t.isCompleted}
                        value={t.text}
              />
            )}
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default TodoApp;
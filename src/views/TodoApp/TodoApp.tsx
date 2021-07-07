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
    padding: 12px 0;
    font-size: 18px;
    color: #fff;
  }
`

const Filters = styled.div`
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
      &:hover{
        background-color: #fe3c78;
      }
    }

    &:hover {
      cursor: pointer;
      background-color: #3c3a3e;
    }
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
  const [filteredTodos, setFilteredTodos] = useState(Array<Todo>());
  const [selectedFilter, setSelectedFilter] = useState('All');
  useEffect(() => {
    return db.onSnapshot((todo: firebase.firestore.QuerySnapshot) => {
        const items: Array<Todo> = [];
        todo.docs.forEach(item => items.push({
          id: item.id,
          text: item.data().text,
          isCompleted: item.data().isCompleted
        }));
        setTodos(items);
      }
    );
  }, []);
  const onSave = () => {
    db.add({
      isCompleted: false,
      text: newEntryRef.current.value.trim()
    });
  }

  const updateFilter = (filterName: string) => {
    setSelectedFilter(filterName);
    if (filterName === 'All') {
      setFilteredTodos([]);
    }
    if (filterName === 'Completed') {
      setFilteredTodos(todos.filter(t => t.isCompleted));
    } else if (filterName === 'Todos') {
      setFilteredTodos(todos.filter(t => !t.isCompleted));
    }
  }
  const filters = ['All', 'Completed', 'Todos'];
  const renderTodos = filteredTodos.length > 0 ? filteredTodos : todos;
  return (
    <Dashboard>
      <div className="dashboard-row">
        <div className="dashboard-col">
          <div className="new-todo">
            <input type="text" ref={newEntryRef} placeholder="New todo item.." onKeyPress={e => {
              if (e.key === 'Enter') {
                onSave();
              }
            }}/>
          </div>

          <Filters>
            {filters.map(f =>
              <button key={f} onClick={() => updateFilter(f)} data-active={selectedFilter === f}>{f}</button>
            )}
          </Filters>
          <div className="todo-list">
            {renderTodos.map(t =>
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
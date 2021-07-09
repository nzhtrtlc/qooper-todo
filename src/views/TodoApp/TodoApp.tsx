import React from 'react';
import styled from 'styled-components';
import NewTodo from './NewTodo';
import TodoList from './TodoList';
import Filters from './Filters';

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

function TodoApp(): JSX.Element {
  return (
    <Dashboard>
      <div className="dashboard-row">
        <div className="dashboard-col">
          <NewTodo/>
          <Filters/>
          <TodoList/>
        </div>
      </div>
    </Dashboard>
  )
}

export default TodoApp;
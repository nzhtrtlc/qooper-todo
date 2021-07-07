import styled, { ThemedStyledProps } from 'styled-components';
import { CheckIcon, CrossIcon } from 'components/icons';
import classNames from 'classnames';
import EditInput from './EditInput';
import { db } from '../../utils/firebase';
import { useState } from 'react';

interface TodoItemProps {
  value: string;
  id: string;
  isCompleted: boolean;
}

const TodoListItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  background-color: #242526;
  padding: 12px 20px;
  color: #B3B3B3;
  border-radius: 7px;
  cursor: pointer;
  transition: .3s ease;

  input {
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid silver;
    color: white !important;
    background-color: ${(props: { isEditing: boolean }) => props.isEditing ? 'transparent' : '#3a3b3c'}
  }


  .todo-list-item-content {
    flex: 1 0 auto;
  }
`

const ItemCheck = styled.div`
  flex: 0 0 35px;
  max-width: 35px;

  & > svg:first-child circle:first-child,
  & > svg:first-child path:first-child {
    transition: .3s ease;
    fill: ${(props: { completed?: boolean }) => props.completed ? '#4c6bf7' : 'none'}
  }

  &:hover svg circle {
    stroke: #4c6bf7;
    transition: .3s ease;
  }

  &:hover svg path {
    fill: #4c6bf7;
    transition: .3s ease;
  }
`
const ItemRemove = styled.div`
  flex: 0 0 35px;
  max-width: 35px;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;

  & + svg:first-child circle:first-child,
  & + svg:first-child path:first-child {
    transition: .3s ease;
  }

  &:hover svg circle {
    stroke: #fe3c78;
    transition: .3s ease;
  }

  &:hover svg path {
    fill: #fe3c78;
    transition: .3s ease;
  }
`


function TodoItem(props: TodoItemProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const itemClass = classNames({
    'todo-list-item-checked': props.isCompleted
  })
  return (
    <TodoListItem isEditing={true} onClick={() => setIsEditing(true)}>
      <ItemCheck completed={props.isCompleted}>
        <CheckIcon/>
      </ItemCheck>
      <div className="todo-list-item-content">
        <EditInput editDone={() => setIsEditing(false)} id={props.id} isEditing={isEditing} value={props.value}/>
      </div>
      <ItemRemove onClick={() => db.doc(props.id).delete()}>
        <CrossIcon/>
      </ItemRemove>
    </TodoListItem>
  )
}

export default TodoItem;
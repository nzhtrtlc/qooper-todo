import styled from 'styled-components';
import { CheckIcon, CrossIcon } from 'components/icons';
import EditTodo from './EditTodo';
import { db } from 'utils/firebase';
import { useState } from 'react';
import { TodoItemProps } from 'utils/types/todo'

const TodoListItem = styled.div<{ isEditing: boolean; isCompleted: boolean }>`
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
    background-color: ${props => props.isEditing ? 'transparent' : '#3a3b3c'}
  }

  span {
    text-decoration: ${props => props.isCompleted ? 'line-through' : 'initial'};
  }


  .todo-list-item-content {
    flex: 1 0 auto;
    padding: 10px;
  }
`

const ItemCheck = styled.div<{ completed: boolean }>`
  flex: 0 0 35px;
  max-width: 35px;

  path {
    display: ${props => props.completed ? 'block' : 'none'};
  }

  & > svg:first-child circle:first-child,
  & > svg:first-child path:first-child {
    transition: .3s ease;
    fill: ${props => props.completed ? '#4c6bf7' : 'none'}
  }

  &:hover svg circle {
    stroke: #4c6bf7;
    transition: .3s ease;
  }

  &:hover svg path {
    fill: #4c6bf7;
    transition: .3s ease;
    display: ${props => props.completed ? 'none' : 'block'};
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
  const onCompleteClick = () => {
    db.doc(props.id).update({ isCompleted: !props.isCompleted });
  }
  const onEditClick = () => {
    setIsEditing(true);
  }
  const onEditDone = () => {
    setIsEditing(false);
  }
  const onDeleteClick = () => {
    db.doc(props.id).delete();
  }
  return (
    <TodoListItem isEditing={isEditing} isCompleted={props.isCompleted}>
      <ItemCheck completed={props.isCompleted}
                 className={props.isCompleted ? 'check-icon-checked': 'check-icon'}
                 onClick={onCompleteClick}>
        <CheckIcon/>
      </ItemCheck>
      <div className="todo-list-item-content" onClick={onEditClick}>
        <EditTodo editDone={onEditDone} id={props.id} isEditing={isEditing} value={props.value}/>
      </div>
      <ItemRemove onClick={onDeleteClick} className="remove-icon">
        <CrossIcon/>
      </ItemRemove>
    </TodoListItem>
  )
}

export default TodoItem;
import React, { useState } from 'react';
import { db } from 'utils/firebase';

interface EditTodoProps {
  isEditing: boolean;
  value: string;
  id: string;
  editDone: any;
}

function EditTodo(props: EditTodoProps) {
  const [textValue, setTextValue] = useState(props.value);
  const editTodo = () => {
    if (textValue.trim().length > 0) {
      db.doc(props.id).update({ text: textValue });
      props.editDone();
    }
  }
  if (props.isEditing) {
    return <input type="text"
                  defaultValue={props.value}
                  autoFocus={props.isEditing}
                  onChange={e => setTextValue(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && editTodo()}
                  onBlur={props.editDone}
    />
  }
  return <span>{props.value}</span>
}

export default EditTodo;
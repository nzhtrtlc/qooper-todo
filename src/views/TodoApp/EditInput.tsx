import React, { useState } from 'react';
import { db } from 'utils/firebase';

interface EditInputProps {
  isEditing: boolean;
  value: string;
  id: string;
  editDone: any;
}

function EditInput(props: EditInputProps) {
  const [textValue, setTextValue] = useState(props.value);
  const editTodo = () => {
    db.doc(props.id).update({ text: textValue });
    props.editDone();
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

export default EditInput;
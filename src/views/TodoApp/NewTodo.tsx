import { KeyboardEvent, useState } from 'react';
import { db } from 'utils/firebase';
import { useAppSelector } from 'utils/hooks';

function NewTodo() {
  const [value, setValue] = useState<string>('');
  const uid = useAppSelector(state => state.user.uid);
  const onSave = () => {
    if (value.trim().length > 0)
      db.add({
        isCompleted: false,
        text: value.trim(),
        uid
      });
    setValue('');
  }
  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSave();
    }
  }
  return (
    <div className="new-todo">
      <input type="text"
             onChange={e => setValue(e.target.value)}
             placeholder="Type a task"
             value={value}
             onKeyPress={onKeyPress}
             data-testid="new-todo-input"
      />
    </div>
  )
}

export default NewTodo;
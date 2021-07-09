interface Todo {
  id: string;
  uid: string;
  text: string;
  isCompleted: boolean;
}

interface TodoState {
  todos: Array<Todo>;
  filteredTodos: Array<Todo>;
  filterType: string;
}

interface TodoItemProps {
  value: string;
  id: string;
  isCompleted: boolean;
}

export type {
  Todo,
  TodoState,
  TodoItemProps
}
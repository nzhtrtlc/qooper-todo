interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface TodoState {
  todos: Array<Todo>;
  filteredTodos: Array<Todo>;
  filterType: string;
}

export type {
  Todo,
  TodoState
}
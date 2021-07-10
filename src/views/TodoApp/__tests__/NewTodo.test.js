import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import NewTodo from "../NewTodo";

describe("NewTodo", () => {
  const mockStore = configureStore();
  let store;
  let NewTodoWrapper = ({ store }) => (
    <Provider store={store}>
      <NewTodo/>
    </Provider>
  )

  it("should render new todo input", () => {
    store = mockStore({ user: { uid: "11" }, todo: { todos: [], filteredTodos: [], filterType: "All" } })
    const { getByTestId } = render(
      <NewTodoWrapper store={store}/>
    );
    const input = getByTestId('new-todo-input');
    expect(input).toBeInTheDocument()
    expect(input.getAttribute('placeholder')).toEqual('Type a task')
  })
})
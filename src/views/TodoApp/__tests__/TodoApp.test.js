import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import TodoApp from "../TodoApp";

describe("TodoApp", () => {
  const mockStore = configureStore();
  let store;
  let TodoAppWrapper = ({ store }) => (
    <Provider store={store}>
      <TodoApp/>
    </Provider>
  )

  it("should render TodoApp", () => {
    store = mockStore({
      user: { uid: "xx", displayName: "test-user" },
      todo: { todos: [], filteredTodos: [], filterType: "All" }
    })
    const { getByText, getByTestId } = render(
      <TodoAppWrapper store={store}/>
    );
    expect(getByText("There are no items yet")).toBeInTheDocument()
    expect(getByText("All")).toBeInTheDocument()
    expect(getByText("Completed")).toBeInTheDocument()
    expect(getByText("Todos")).toBeInTheDocument()
    expect(getByTestId("new-todo-input")).toBeInTheDocument()
  })
})
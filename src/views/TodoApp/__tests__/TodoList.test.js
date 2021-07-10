import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TodoList from "../TodoList";

describe("TodoList", () => {
  const mockStore = configureStore();
  let store;
  let initialState = {
    user: { uid: 1 },
    todo: {
      todos: [],
      filteredTodos: [],
      filterType: "All"
    }
  }

  beforeEach(() => {
    store = mockStore("");
  })

  let TodoListWrapper = ({ store }) => (
    <Provider store={store}>
      <TodoList/>
    </Provider>
  )

  it("should render empty list message when there are no any todos", () => {
    store = mockStore(initialState);
    const { getByText } = render(
      <TodoListWrapper store={store}/>
    );
    expect(getByText("There are no items yet")).toBeInTheDocument()
  });

  it("should render 1 todo item", () => {
    initialState = {
      user: { uid: 1 },
      todo: {
        todos: [
          { text: "buy milk", isCompleted: false, uid: "unique-1", id: "0001" },
        ],
        filteredTodos: [],
        filterType: "All"
      }
    }
    store = mockStore(initialState);
    const { getByText, container } = render(
      <TodoListWrapper store={store}/>
    );
    expect(getByText("buy milk")).toBeInTheDocument();
    expect(container.querySelectorAll(".todo-list > div")).toHaveLength(1)
  });

  it("should render 2 todo item", () => {
    initialState = {
      user: { uid: 1 },
      todo: {
        todos: [
          { text: "buy cola", isCompleted: false, uid: "unique-1", id: "0001" },
          { text: "buy cookie", isCompleted: false, uid: "unique-2", id: "0002" }
        ],
        filteredTodos: [],
        filterType: "All"
      }
    }
    store = mockStore(initialState);
    const { container, getByText } = render(
      <TodoListWrapper store={store}/>
    );
    expect(getByText("buy cola")).toBeInTheDocument();
    expect(getByText("buy cookie")).toBeInTheDocument();
    expect(container.querySelectorAll(".todo-list > div")).toHaveLength(2)
  });
})
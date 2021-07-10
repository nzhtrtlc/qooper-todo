import { render } from "@testing-library/react";
import Filters from "../Filters";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("Filters", () => {
  const mockStore = configureStore();
  let store;
  let FiltersWrapper = ({ store }) => (
    <Provider store={store}>
      <Filters/>
    </Provider>
  )

  it("should render all 3 filters", () => {
    store = mockStore({ user: { uid: "11" }, todo: { todos: [], filteredTodos: [], filterType: "All" } })
    const { getByText, container } = render(
      <FiltersWrapper store={store}/>
    );
    expect(container.querySelectorAll("button")).toHaveLength(3);
    expect(getByText("All")).toBeInTheDocument()
    expect(getByText("Completed")).toBeInTheDocument()
    expect(getByText("Todos")).toBeInTheDocument()
  })

  it("should select the filter as -> All", () => {
    store = mockStore({ user: { uid: "11" }, todo: { todos: [], filteredTodos: [], filterType: "All" } })
    const { container } = render(
      <FiltersWrapper store={store}/>
    );
    expect(container.querySelector("button[data-active=true]").textContent).toEqual("All")
  })

  it("should select the filter as -> Completed", () => {
    store = mockStore({ user: { uid: "11" }, todo: { todos: [], filteredTodos: [], filterType: "Completed" } })
    const { container } = render(
      <FiltersWrapper store={store}/>
    );
    expect(container.querySelector("button[data-active=true]").textContent).toEqual("Completed")
  })

  it("should select the filter as -> Todos", () => {
    store = mockStore({ user: { uid: "11" }, todo: { todos: [], filteredTodos: [], filterType: "Todos" } })
    const { container } = render(
      <FiltersWrapper store={store}/>
    );
    expect(container.querySelector("button[data-active=true]").textContent).toEqual("Todos")
  })
})
import { render } from "@testing-library/react"
import Header from "../Header";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";

describe("Components Tests", () => {
  let mockStore = configureStore(), store
  it("should render Header in SignIn page", () => {
    store = mockStore({
      user: { uid: undefined, displayName: "test-user" },
      todo: { todos: [], filteredTodos: [], filterType: "All" }
    })
    const historyMock = {
      push: jest.fn(),
      location: { pathname: "/signIn" },
      listen: jest.fn()
    };
    const { container, getByText } =
      render(
        <Router history={historyMock}>
          <Provider store={store}>
            <Header/>
          </Provider>
        </Router>
      )
    expect(getByText("Sign In")).toBeInTheDocument()
    expect(container.querySelector(".header-user > div")).toBeNull()
  })

  it("should render Header in app page", () => {
    store = mockStore({
      user: { uid: "1", displayName: "test-user-2" },
      todo: { todos: [], filteredTodos: [], filterType: "All" }
    })
    const historyMock = {
      push: jest.fn(),
      location: { pathname: "/" },
      listen: jest.fn()
    };
    const { container, getByText } =
      render(
        <Router history={historyMock}>
          <Provider store={store}>
            <Header/>
          </Provider>
        </Router>
      )
    expect(getByText("Todo App")).toBeInTheDocument()
    expect(container.querySelector(".header-user > div").textContent).toEqual("test-user-2")
  })
})
import { store } from "utils/store";

describe("Redux Todo Tests", () => {

  it("should dispatch updateFilter action", () => {
    expect(store.getState().todo.filterType).toEqual("All");
    store.dispatch({ type: "todo/updateFilterType", payload: "Completed" });
    expect(store.getState().todo.filterType).toEqual("Completed");
  })

  it("should dispatch updateFilteredTodos action", () => {
    expect(store.getState().todo.filteredTodos).toEqual([]);
    store.dispatch({ type: "todo/updateFilteredTodos", payload: [1] });
    expect(store.getState().todo.filteredTodos).toEqual([1]);
  })

  it("should dispatch updateTodos action", () => {
    expect(store.getState().todo.todos).toEqual([]);
    store.dispatch({ type: "todo/updateTodos", payload: [1,2] });
    expect(store.getState().todo.todos).toEqual([1,2]);
  })
})
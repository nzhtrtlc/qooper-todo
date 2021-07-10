import { render } from "@testing-library/react"
import TodoItem from "../TodoItem"

describe("TodoItem", () => {

  it("should render TodoItem with text and check icon and remove icon", () => {
    const { getByText, container } = render(
      <TodoItem id={1} isCompleted={false} value="learn unit test"/>
    );
    expect(getByText("learn unit test")).toBeInTheDocument()
    expect(container.querySelectorAll(".remove-icon")).toHaveLength(1)
    expect(container.querySelectorAll(".check-icon")).toHaveLength(1)
    expect(Array.from(container.querySelectorAll("div svg"))).toHaveLength(2)
  })

  it("should render TodoItem as completed", () => {
    const { container } = render(
      <TodoItem id={1} isCompleted={true} value="learn unit test"/>
    );
    expect(container.querySelectorAll(".check-icon")).toHaveLength(0)
    expect(container.querySelectorAll(".check-icon-checked")).toHaveLength(1)
  })

  it("should remove TodoItem", () => {
    const { getByText, container } = render(
      <TodoItem id={1} isCompleted={true} value="pay the bills"/>
    );
  })
})
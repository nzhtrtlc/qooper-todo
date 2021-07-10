import { render } from "@testing-library/react";
import EditTodo from "../EditTodo";

describe("EdiTodo", () => {

  it("should render EditTodo item as default", () => {
    const { getByText, container } = render(
      <EditTodo id={1} value="get some sleep"
                editDone={() => jest.fn()}
                isEditing={false}
      />
    );
    expect(getByText("get some sleep")).toBeInTheDocument()
  })

  it("should render EditTodo with input", () => {
    const { container } = render(
      <EditTodo id={1} value="get some sleep"
                editDone={() => jest.fn()}
                isEditing={true}
      />
    );
    const input = container.querySelectorAll('input');
    expect(Array.from(input)).toHaveLength(1);
    expect(input[0].type).toEqual('text');
    expect(input[0].value).toEqual('get some sleep');
  })
})
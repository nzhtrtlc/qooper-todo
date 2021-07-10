import { render } from "@testing-library/react"
import { Loading } from "../index";

describe("Components Tests", () => {
  it("should render Loading", () => {
    const { getByText, getByAltText } =
      render(
        <Loading/>
      )
    expect(getByAltText("loading")).toBeInTheDocument()
    expect(getByText("Loading")).toBeInTheDocument()
  })
})
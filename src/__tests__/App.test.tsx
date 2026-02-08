import { render, screen } from "@testing-library/react";
import App from "../app/App";

describe("App", () => {
  it("renders the hero headline", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /build bold ideas/i
      })
    ).toBeInTheDocument();
  });
});

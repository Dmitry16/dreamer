import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatusBadge from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders draft status", () => {
    render(<StatusBadge status="draft" />);
    expect(screen.getByText("Draft")).toBeInTheDocument();
  });

  it("renders structured status", () => {
    render(<StatusBadge status="structured" />);
    expect(screen.getByText("Structured")).toBeInTheDocument();
  });

  it("renders associated status", () => {
    render(<StatusBadge status="associated" />);
    expect(screen.getByText("Associated")).toBeInTheDocument();
  });

  it("renders interpreted status", () => {
    render(<StatusBadge status="interpreted" />);
    expect(screen.getByText("Interpreted")).toBeInTheDocument();
  });

  it("renders integrated status", () => {
    render(<StatusBadge status="integrated" />);
    expect(screen.getByText("Integrated")).toBeInTheDocument();
  });

  it("renders as a badge component", () => {
    const { rerender } = render(<StatusBadge status="draft" />);
    const badge = screen.getByText("Draft");
    expect(badge).toBeInTheDocument();

    rerender(<StatusBadge status="integrated" />);
    expect(screen.getByText("Integrated")).toBeInTheDocument();
  });
});

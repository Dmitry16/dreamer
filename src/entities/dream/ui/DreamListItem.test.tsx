import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Timestamp } from "firebase/firestore";
import DreamListItem from "./DreamListItem";
import type { DreamDoc, DreamId } from "../model";

describe("DreamListItem", () => {
  const mockDream: { id: DreamId; data: DreamDoc } = {
    id: "dream-1",
    data: {
      rawText: "I was flying over mountains and lakes...",
      dreamedAt: Timestamp.fromDate(new Date("2024-01-15T08:30:00")),
      createdAt: Timestamp.fromDate(new Date("2024-01-15T09:00:00")),
      status: "draft",
      mood: "curious",
      lifeContext: "Work stress",
    },
  };

  it("renders dream excerpt", () => {
    render(<DreamListItem dream={mockDream} onClick={() => {}} />);
    expect(screen.getByText(/I was flying over mountains/)).toBeInTheDocument();
  });

  it("renders status badge", () => {
    render(<DreamListItem dream={mockDream} onClick={() => {}} />);
    expect(screen.getByText("Draft")).toBeInTheDocument();
  });

  it("renders dream date", () => {
    render(<DreamListItem dream={mockDream} onClick={() => {}} />);
    // Date formatting may vary, but check for date presence
    expect(screen.getByText(/Jan|January/)).toBeInTheDocument();
  });

  it("truncates long dream text", () => {
    const longDream = {
      ...mockDream,
      data: {
        ...mockDream.data,
        rawText: "A".repeat(200),
      },
    };
    render(<DreamListItem dream={longDream} onClick={() => {}} />);
    const text = screen.getByText(/A+/);
    expect(text.textContent?.length).toBeLessThan(200);
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<DreamListItem dream={mockDream} onClick={handleClick} />);
    screen.getByRole("button").click();
    expect(handleClick).toHaveBeenCalledWith("dream-1");
  });

  it("renders different status correctly", () => {
    const interpretedDream = {
      ...mockDream,
      data: { ...mockDream.data, status: "interpreted" as const },
    };
    render(<DreamListItem dream={interpretedDream} onClick={() => {}} />);
    expect(screen.getByText("Interpreted")).toBeInTheDocument();
  });
});

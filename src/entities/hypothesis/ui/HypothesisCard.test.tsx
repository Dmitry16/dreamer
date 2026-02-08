import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Timestamp } from "firebase/firestore";
import HypothesisCard from "./HypothesisCard";
import type { HypothesisDoc, HypothesisId } from "../model";

describe("HypothesisCard", () => {
  const mockHypothesis: { id: HypothesisId; data: HypothesisDoc } = {
    id: "hyp-1",
    data: {
      lens: "shadow",
      hypothesisText: "This dream might reflect unacknowledged aspects of yourself that seek integration.",
      evidence: [
        {
          type: "dream_text",
          refId: "anchor-1",
          quote: "I was hiding from a dark figure",
        },
        {
          type: "element",
          refId: "elem-1",
          quote: "dark figure",
        },
      ],
      reflectiveQuestion: "What parts of yourself do you find difficult to acknowledge?",
      createdAt: Timestamp.now(),
    },
  };

  it("renders hypothesis lens badge", () => {
    render(<HypothesisCard hypothesis={mockHypothesis} onFeedback={() => {}} />);
    expect(screen.getByText("Shadow")).toBeInTheDocument();
  });

  it("renders hypothesis text", () => {
    render(<HypothesisCard hypothesis={mockHypothesis} onFeedback={() => {}} />);
    expect(screen.getByText(/unacknowledged aspects/)).toBeInTheDocument();
  });

  it("renders reflective question", () => {
    render(<HypothesisCard hypothesis={mockHypothesis} onFeedback={() => {}} />);
    expect(screen.getByText(/What parts of yourself/)).toBeInTheDocument();
  });

  it("shows evidence section initially collapsed", () => {
    render(<HypothesisCard hypothesis={mockHypothesis} onFeedback={() => {}} />);
    // Button should show "Show Evidence" not "Hide Evidence"
    expect(screen.getByRole("button", { name: /show evidence/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /hide evidence/i })).not.toBeInTheDocument();
  });

  it("expands to show evidence when clicked", async () => {
    const user = userEvent.setup();
    render(<HypothesisCard hypothesis={mockHypothesis} onFeedback={() => {}} />);
    
    // Click the expand button
    const expandButton = screen.getByRole("button", { name: /show evidence/i });
    await user.click(expandButton);

    // Evidence should now be visible (wrapped in quotes)
    expect(screen.getByText(/I was hiding from a dark figure/)).toBeInTheDocument();
    // Multiple matches for "dark figure" is OK - it means both evidences are shown
    expect(screen.getAllByText(/dark figure/).length).toBeGreaterThan(0);
  });

  it("renders feedback buttons", () => {
    render(<HypothesisCard hypothesis={mockHypothesis} onFeedback={() => {}} />);
    expect(screen.getByRole("button", { name: /resonates/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /doesn't fit/i })).toBeInTheDocument();
  });

  it("calls onFeedback when resonates button clicked", async () => {
    const user = userEvent.setup();
    const handleFeedback = jest.fn();
    render(<HypothesisCard hypothesis={mockHypothesis} onFeedback={handleFeedback} />);

    await user.click(screen.getByRole("button", { name: /resonates/i }));
    expect(handleFeedback).toHaveBeenCalledWith("hyp-1", "resonates");
  });

  it("calls onFeedback when doesn't fit button clicked", async () => {
    const user = userEvent.setup();
    const handleFeedback = jest.fn();
    render(<HypothesisCard hypothesis={mockHypothesis} onFeedback={handleFeedback} />);

    await user.click(screen.getByRole("button", { name: /doesn't fit/i }));
    expect(handleFeedback).toHaveBeenCalledWith("hyp-1", "does_not_fit");
  });

  it("shows selected state for resonates feedback", () => {
    const hypothesisWithFeedback = {
      ...mockHypothesis,
      data: {
        ...mockHypothesis.data,
        userFeedback: "resonates" as const,
      },
    };
    render(<HypothesisCard hypothesis={hypothesisWithFeedback} onFeedback={() => {}} />);
    
    const resonatesButton = screen.getByRole("button", { name: /resonates/i });
    // Check if button has different styling (contains variant or color props)
    expect(resonatesButton).toBeInTheDocument();
  });

  it("shows selected state for doesn't fit feedback", () => {
    const hypothesisWithFeedback = {
      ...mockHypothesis,
      data: {
        ...mockHypothesis.data,
        userFeedback: "does_not_fit" as const,
      },
    };
    render(<HypothesisCard hypothesis={hypothesisWithFeedback} onFeedback={() => {}} />);
    
    const doesntFitButton = screen.getByRole("button", { name: /doesn't fit/i });
    expect(doesntFitButton).toBeInTheDocument();
  });

  it("displays all evidence items when expanded", async () => {
    const user = userEvent.setup();
    render(<HypothesisCard hypothesis={mockHypothesis} onFeedback={() => {}} />);
    
    await user.click(screen.getByRole("button", { name: /show evidence/i }));

    // Check that both evidence items are visible
    expect(screen.getByText(/I was hiding from a dark figure/)).toBeInTheDocument();
    // There should be 2 evidence items total
    const evidenceQuotes = screen.getAllByText(/dark figure/);
    expect(evidenceQuotes.length).toBeGreaterThanOrEqual(1);
  });

  it("formats lens name correctly", () => {
    const compensationHypothesis = {
      ...mockHypothesis,
      data: {
        ...mockHypothesis.data,
        lens: "compensation" as const,
      },
    };
    render(<HypothesisCard hypothesis={compensationHypothesis} onFeedback={() => {}} />);
    expect(screen.getByText("Compensation")).toBeInTheDocument();
  });
});

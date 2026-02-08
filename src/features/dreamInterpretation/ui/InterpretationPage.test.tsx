import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Timestamp } from "firebase/firestore";
import InterpretationPage from "./InterpretationPage";
import type { DreamId, HypothesisDoc, HypothesisId } from "../../../shared/types/domain";

// Mock HypothesisCard component
jest.mock("../../../entities/hypothesis/ui", () => ({
  default: ({ hypothesis, onFeedback }: any) => (
    <div data-testid={`hypothesis-${hypothesis.id}`}>
      <div>{hypothesis.data.hypothesisText}</div>
      <button onClick={() => onFeedback(hypothesis.id, "resonates")}>
        Resonates
      </button>
      <button onClick={() => onFeedback(hypothesis.id, "does_not_fit")}>
        Doesn't Fit
      </button>
    </div>
  ),
}));

describe("InterpretationPage", () => {
  const mockDreamId: DreamId = "dream-1";
  const mockUid = "user-1";

  const mockHypotheses: Array<{ id: HypothesisId; data: HypothesisDoc }> = [
    {
      id: "hyp-1",
      data: {
        lens: "shadow",
        hypothesisText: "This dream might reflect unacknowledged aspects.",
        evidence: [],
        reflectiveQuestion: "What parts of yourself do you find difficult to acknowledge?",
        createdAt: Timestamp.now(),
      },
    },
    {
      id: "hyp-2",
      data: {
        lens: "compensation",
        hypothesisText: "This dream might compensate for waking attitudes.",
        evidence: [],
        reflectiveQuestion: "How might this dream balance your waking perspective?",
        createdAt: Timestamp.now(),
      },
    },
  ];

  const mockLoadHypotheses = jest.fn();
  const mockGenerateHypotheses = jest.fn();
  const mockSaveFeedback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state initially", () => {
    mockLoadHypotheses.mockImplementation(() => new Promise(() => {})); // Never resolves
    render(
      <InterpretationPage
        dreamId={mockDreamId}
        uid={mockUid}
        onLoadHypotheses={mockLoadHypotheses}
        onGenerateHypotheses={mockGenerateHypotheses}
        onSaveFeedback={mockSaveFeedback}
      />
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows generate button when no hypotheses exist", async () => {
    mockLoadHypotheses.mockResolvedValue([]);
    render(
      <InterpretationPage
        dreamId={mockDreamId}
        uid={mockUid}
        onLoadHypotheses={mockLoadHypotheses}
        onGenerateHypotheses={mockGenerateHypotheses}
        onSaveFeedback={mockSaveFeedback}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /generate interpretations/i })).toBeInTheDocument();
    });
  });

  it("calls generate hypotheses when button clicked", async () => {
    const user = userEvent.setup();
    mockLoadHypotheses.mockResolvedValue([]);
    mockGenerateHypotheses.mockResolvedValue(mockHypotheses);

    render(
      <InterpretationPage
        dreamId={mockDreamId}
        uid={mockUid}
        onLoadHypotheses={mockLoadHypotheses}
        onGenerateHypotheses={mockGenerateHypotheses}
        onSaveFeedback={mockSaveFeedback}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /generate interpretations/i })).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /generate interpretations/i }));

    expect(mockGenerateHypotheses).toHaveBeenCalledWith(mockDreamId, mockUid);
  });

  it("displays hypotheses when loaded", async () => {
    mockLoadHypotheses.mockResolvedValue(mockHypotheses);
    render(
      <InterpretationPage
        dreamId={mockDreamId}
        uid={mockUid}
        onLoadHypotheses={mockLoadHypotheses}
        onGenerateHypotheses={mockGenerateHypotheses}
        onSaveFeedback={mockSaveFeedback}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId("hypothesis-hyp-1")).toBeInTheDocument();
      expect(screen.getByTestId("hypothesis-hyp-2")).toBeInTheDocument();
    });

    expect(screen.getByText(/unacknowledged aspects/)).toBeInTheDocument();
    expect(screen.getByText(/compensate for waking attitudes/)).toBeInTheDocument();
  });

  it("saves feedback when user provides it", async () => {
    const user = userEvent.setup();
    mockLoadHypotheses.mockResolvedValue(mockHypotheses);
    mockSaveFeedback.mockResolvedValue(undefined);

    render(
      <InterpretationPage
        dreamId={mockDreamId}
        uid={mockUid}
        onLoadHypotheses={mockLoadHypotheses}
        onGenerateHypotheses={mockGenerateHypotheses}
        onSaveFeedback={mockSaveFeedback}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId("hypothesis-hyp-1")).toBeInTheDocument();
    });

    // Click "Resonates" on first hypothesis
    const resonatesButtons = screen.getAllByRole("button", { name: /resonates/i });
    await user.click(resonatesButtons[0]);

    expect(mockSaveFeedback).toHaveBeenCalledWith(mockDreamId, "hyp-1", "resonates");
  });

  it("shows disclaimer about hypotheses not being conclusions", async () => {
    mockLoadHypotheses.mockResolvedValue(mockHypotheses);
    render(
      <InterpretationPage
        dreamId={mockDreamId}
        uid={mockUid}
        onLoadHypotheses={mockLoadHypotheses}
        onGenerateHypotheses={mockGenerateHypotheses}
        onSaveFeedback={mockSaveFeedback}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId("hypothesis-hyp-1")).toBeInTheDocument();
    });

    // Should have text explaining these are not truths
    expect(
      screen.getByText(/these are invitations for reflection/i) ||
      screen.getByText(/not conclusions/i) ||
      screen.getByText(/testable possibilities/i)
    ).toBeInTheDocument();
  });

  it("shows error state when generation fails", async () => {
    const user = userEvent.setup();
    mockLoadHypotheses.mockResolvedValue([]);
    mockGenerateHypotheses.mockRejectedValue(new Error("Generation failed"));

    render(
      <InterpretationPage
        dreamId={mockDreamId}
        uid={mockUid}
        onLoadHypotheses={mockLoadHypotheses}
        onGenerateHypotheses={mockGenerateHypotheses}
        onSaveFeedback={mockSaveFeedback}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /generate interpretations/i })).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /generate interpretations/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to generate/i) || screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it("disables generate button while generating", async () => {
    const user = userEvent.setup();
    mockLoadHypotheses.mockResolvedValue([]);
    mockGenerateHypotheses.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(
      <InterpretationPage
        dreamId={mockDreamId}
        uid={mockUid}
        onLoadHypotheses={mockLoadHypotheses}
        onGenerateHypotheses={mockGenerateHypotheses}
        onSaveFeedback={mockSaveFeedback}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /generate interpretations/i })).toBeInTheDocument();
    });

    const generateButton = screen.getByRole("button", { name: /generate interpretations/i });
    await user.click(generateButton);

    await waitFor(() => {
      expect(generateButton).toBeDisabled();
    });
  });

  it("shows page title", async () => {
    mockLoadHypotheses.mockResolvedValue(mockHypotheses);
    render(
      <InterpretationPage
        dreamId={mockDreamId}
        uid={mockUid}
        onLoadHypotheses={mockLoadHypotheses}
        onGenerateHypotheses={mockGenerateHypotheses}
        onSaveFeedback={mockSaveFeedback}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/interpretation/i)).toBeInTheDocument();
    });
  });
});

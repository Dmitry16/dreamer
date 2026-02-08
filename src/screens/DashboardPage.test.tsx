import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Timestamp } from "firebase/firestore";
import DashboardPage from "./DashboardPage";

// Mock the firestore repository
const mockSubscribeDreams = jest.fn();
jest.mock("../services/firestore/firestoreRepo", () => ({
  subscribeDreams: (...args: any[]) => mockSubscribeDreams(...args),
}));

// Mock firebase config
jest.mock("../app/config/firebase", () => ({
  getDb: jest.fn(() => ({})),
  ensureAnonymousAuth: jest.fn(() => Promise.resolve({ uid: "test-uid" })),
}));

// Mock DreamListItem
jest.mock("../entities/dream/ui", () => ({
  default: ({ dream, onClick }: any) => (
    <div data-testid={`dream-${dream.id}`} onClick={() => onClick(dream.id)}>
      {dream.data.rawText.slice(0, 50)}...
      <span>{dream.data.status}</span>
    </div>
  ),
}));

describe("DashboardPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default: return empty array immediately to simulate loaded state
    mockSubscribeDreams.mockImplementation((_db: any, _uid: any, cb: any) => {
      setTimeout(() => cb([]), 0);
      return () => {};
    });
  });

  it("renders page title", async () => {
    render(<DashboardPage />);
    await waitFor(() => {
      expect(screen.getByText(/Dream History/i)).toBeInTheDocument();
    });
  });

  it("renders Record a Dream button", async () => {
    render(<DashboardPage />);
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Record a Dream/i })).toBeInTheDocument();
    });
  });

  it("shows loading state initially", () => {
    // Don't call the callback immediately for this test
    mockSubscribeDreams.mockImplementation(() => () => {});
    render(<DashboardPage />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows empty state when no dreams exist", async () => {
    render(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText(/No dreams yet/i)).toBeInTheDocument();
    });
  });

  it("renders dream list when dreams exist", async () => {
    mockSubscribeDreams.mockImplementation((_db: any, _uid: any, cb: any) => {
      setTimeout(() => {
        cb([
          {
            id: "dream-1",
            data: {
              rawText: "I was flying over mountains",
              dreamedAt: Timestamp.now(),
              createdAt: Timestamp.now(),
              status: "draft",
            },
          },
        ]);
      }, 0);
      return () => {};
    });

    render(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByTestId("dream-dream-1")).toBeInTheDocument();
    });
  });
});

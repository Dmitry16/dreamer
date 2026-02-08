import { render } from "@testing-library/react";
import App from "../app/App";

// Mock the firestore repository
jest.mock("../services/firestore/firestoreRepo", () => ({
  subscribeDreams: jest.fn(() => () => {}),
}));

// Mock firebase config
jest.mock("../app/config/firebase", () => ({
  getDb: jest.fn(() => ({})),
  ensureAnonymousAuth: jest.fn(() => Promise.resolve({ uid: "test-uid" })),
}));

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});

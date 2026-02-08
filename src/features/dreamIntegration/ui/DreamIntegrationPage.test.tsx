import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import DreamIntegrationPage from "./DreamIntegrationPage";
import type { DreamId } from "../../../shared/types/domain";

describe("DreamIntegrationPage", () => {
  it("shows a soft prompt when no dream is active", () => {
    render(
      <MemoryRouter>
        <DreamIntegrationPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /integration/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/choose a dream to continue integration/i)
    ).toBeInTheDocument();
  });

  it("renders the integration sections when a dream is provided", () => {
    render(
      <MemoryRouter>
        <DreamIntegrationPage dreamId={"dream-1" as DreamId} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /reflective summary/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /reflective questions/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /practice suggestion/i })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/journal/i)
    ).toBeInTheDocument();
  });
});

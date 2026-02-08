import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../app/App";

const OPEN_MENU_NAME = /open menu/i;
const NAV_LABEL = /primary navigation/i;
const NAV_ITEMS = [
  "Dashboard",
  "Record a Dream",
  "Dream Breakdown",
  "Associations",
  "Interpretation",
  "Integration",
  "Settings"
];

describe("Navigation", () => {
  it("shows the app title and menu toggle", () => {
    render(<App />);

    expect(screen.getByText("Dreamer")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: OPEN_MENU_NAME })).toBeInTheDocument();
  });

  it("opens the navigation panel with required destinations", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: OPEN_MENU_NAME }));

    const navigation = await screen.findByRole("navigation", { name: NAV_LABEL });

    NAV_ITEMS.forEach((item) => {
      expect(within(navigation).getByRole("link", { name: item })).toBeInTheDocument();
    });
  });

  it("omits the dream session view when no dream is active", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: OPEN_MENU_NAME }));

    const navigation = await screen.findByRole("navigation", { name: NAV_LABEL });
    expect(
      within(navigation).queryByRole("link", { name: /dream session view/i })
    ).not.toBeInTheDocument();
  });
});

import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Firestore } from "firebase/firestore";
import type { ComponentProps } from "react";

import DreamEntryPage from "./DreamEntryPage";
import type { DreamId } from "../../../shared/types/domain";

const setup = (overrides?: Partial<ComponentProps<typeof DreamEntryPage>>) => {
  const createDream = jest.fn(async () => ({ dreamId: "dream-1" as DreamId }));
  const updateDream = jest.fn(async () => undefined);
  const db = {} as Firestore;
  const uid = "user-1";

  const user = userEvent.setup();

  render(
    <DreamEntryPage
      db={db}
      uid={uid}
      autosaveDelayMs={400}
      deps={{ createDream, updateDream }}
      {...overrides}
    />
  );

  const dreamText = screen.getByLabelText(/^dream$/i) as HTMLTextAreaElement;
  const moodInput = screen.getByLabelText(/waking mood/i) as HTMLInputElement;
  const lifeContextInput = screen.getByLabelText(/life context/i) as HTMLTextAreaElement;
  const continueButton = screen.getByRole("button", { name: /continue/i });

  return {
    createDream,
    updateDream,
    db,
    uid,
    user,
    dreamText,
    moodInput,
    lifeContextInput,
    continueButton,
  };
};

const waitForAutosave = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 450));
  });
};

describe("DreamEntryPage", () => {
  it("disables Continue until dream text is non-empty", async () => {
    const { user, dreamText, continueButton } = setup();

    expect(continueButton).toBeDisabled();

    await user.type(dreamText, "A vivid dream about a mountain.");

    expect(continueButton).toBeEnabled();
  });

  it("creates a draft on debounce when dream text is entered", async () => {
    const { user, dreamText, createDream, db, uid } = setup();

    await user.type(dreamText, "A vivid dream about a mountain.");

    await waitForAutosave();

    expect(createDream).toHaveBeenCalledWith(
      db,
      uid,
      expect.objectContaining({ rawText: "A vivid dream about a mountain." })
    );
  });

  it("updates the draft after creation when fields change", async () => {
    const { user, dreamText, moodInput, updateDream } = setup();

    await user.type(dreamText, "A vivid dream about a mountain.");

    await waitForAutosave();

    await user.clear(moodInput);
    await user.type(moodInput, "Curious");

    await waitForAutosave();

    expect(updateDream).toHaveBeenCalledWith(
      expect.any(Object),
      "user-1",
      "dream-1",
      expect.objectContaining({ mood: "Curious" })
    );
  });

  it("saves immediately on blur", async () => {
    const { user, dreamText, createDream } = setup();

    await user.type(dreamText, "A vivid dream about a mountain.");
    await user.tab();

    await waitForAutosave();

    expect(createDream).toHaveBeenCalled();
  });
});

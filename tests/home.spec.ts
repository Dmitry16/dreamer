import { expect, test } from "@playwright/test";

test("homepage shows hero title", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: /build bold ideas/i })
  ).toBeVisible();
});

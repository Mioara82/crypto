import { expect } from "@playwright/test";
import { test } from "../utils/fixtures";

test.beforeEach(async ({page}) => {
  await page.goto("/");
   await page.waitForSelector('nav[aria-label="Main site navigation"]');
})

test("Should display complete navigation menu", async ({ basePage }) => {
  await expect(basePage.navigation).toBeVisible();
  await expect(basePage.homeLink).toBeVisible();
  await expect(basePage.portfolioLink).toBeVisible();
  await expect(basePage.searchInput).toBeVisible();
  await expect(basePage.loginLink).toBeVisible();
});



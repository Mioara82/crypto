import { test as base, Page } from "@playwright/test";
import { BasePage } from "../pages/base.page";

type PageFixtures = {
  basePage: BasePage;
};

export const test = base.extend<PageFixtures>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
});

import type { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly navigation: Locator;
  readonly homeLink: Locator;
  readonly portfolioLink: Locator;
  readonly searchInput: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigation = page.getByRole("navigation", {
      name: "Main site navigation",
    });
    this.homeLink = page.getByRole("link", { name: "Home" });
    this.portfolioLink = page.getByRole("link", { name: "Portfolio" });
    this.searchInput = page.getByRole("textbox", { name: "Search coins" });
    this.loginLink = page.getByRole("button", { name: "Login" });
  }
}

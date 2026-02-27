/**
 * @file BasePage.ts
 * @description Abstract base class for all Page Objects.
 *              Provides shared navigation and interaction helpers.
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { Page, Locator } from 'playwright';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL ?? 'https://the-internet.herokuapp.com';
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  async goto(path = ''): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // ── Interactions ───────────────────────────────────────────────────────────

  /** Clear an input and type new text */
  async clearAndFill(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(text);
  }

  /** Scroll element into view before clicking */
  async scrollAndClick(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  /** Wait for a locator to be visible */
  async waitForVisible(locator: Locator, timeout = 10_000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /** Take a named screenshot */
  async screenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path:     `reports/screenshots/${name}.png`,
      fullPage: true,
    });
  }
}

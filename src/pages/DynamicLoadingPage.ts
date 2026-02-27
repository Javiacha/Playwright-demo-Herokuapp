/**
 * @file DynamicLoadingPage.ts
 * @description Page Object for /dynamic_loading – waiting for async content.
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DynamicLoadingPage extends BasePage {
  readonly startButton: Locator;
  readonly loadingBar:  Locator;
  readonly finishText:  Locator;

  constructor(page: Page) {
    super(page);
    this.startButton = page.locator('button', { hasText: 'Start' });
    this.loadingBar  = page.locator('#loading');
    this.finishText  = page.locator('#finish');
  }

  /** Navigate to a specific example (1 or 2) */
  async navigate(example: 1 | 2 = 1): Promise<void> {
    await this.goto(`/dynamic_loading/${example}`);
  }

  async clickStart(): Promise<void> {
    await this.startButton.click();
  }

  async waitForContent(): Promise<void> {
    // Wait for the loading bar to disappear, then for finish text to appear
    await this.loadingBar.waitFor({ state: 'hidden', timeout: 15_000 });
    await this.finishText.waitFor({ state: 'visible', timeout: 15_000 });
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  async assertFinishTextVisible(text: string): Promise<void> {
    await expect(this.finishText).toContainText(text);
  }
}

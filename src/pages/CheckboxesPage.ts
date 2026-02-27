/**
 * @file CheckboxesPage.ts
 * @description Page Object for /checkboxes.
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckboxesPage extends BasePage {
  readonly checkboxes: Locator;

  constructor(page: Page) {
    super(page);
    this.checkboxes = page.locator('input[type="checkbox"]');
  }

  async navigate(): Promise<void> {
    await this.goto('/checkboxes');
  }

  async checkByIndex(index: number): Promise<void> {
    await this.checkboxes.nth(index).check();
  }

  async uncheckByIndex(index: number): Promise<void> {
    await this.checkboxes.nth(index).uncheck();
  }

  async isChecked(index: number): Promise<boolean> {
    return this.checkboxes.nth(index).isChecked();
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  async assertChecked(index: number): Promise<void> {
    await expect(this.checkboxes.nth(index)).toBeChecked();
  }

  async assertUnchecked(index: number): Promise<void> {
    await expect(this.checkboxes.nth(index)).not.toBeChecked();
  }

  async assertCheckboxCount(count: number): Promise<void> {
    await expect(this.checkboxes).toHaveCount(count);
  }
}

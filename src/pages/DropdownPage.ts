/**
 * @file DropdownPage.ts
 * @description Page Object for /dropdown – select element interaction.
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DropdownPage extends BasePage {
  readonly dropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.dropdown = page.locator('#dropdown');
  }

  async navigate(): Promise<void> {
    await this.goto('/dropdown');
  }

  async selectOption(value: string): Promise<void> {
    await this.dropdown.selectOption({ value });
  }

  async selectByLabel(label: string): Promise<void> {
    await this.dropdown.selectOption({ label });
  }

  async getSelectedOption(): Promise<string> {
    return this.dropdown.inputValue();
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  async assertSelectedValue(value: string): Promise<void> {
    await expect(this.dropdown).toHaveValue(value);
  }
}

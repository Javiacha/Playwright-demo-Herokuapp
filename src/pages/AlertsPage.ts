/**
 * @file AlertsPage.ts
 * @description Page Object for /javascript_alerts – JS alert, confirm, prompt.
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AlertsPage extends BasePage {
  readonly alertButton:   Locator;
  readonly confirmButton: Locator;
  readonly promptButton:  Locator;
  readonly result:        Locator;

  constructor(page: Page) {
    super(page);
    this.alertButton   = page.locator('button', { hasText: 'Click for JS Alert' });
    this.confirmButton = page.locator('button', { hasText: 'Click for JS Confirm' });
    this.promptButton  = page.locator('button', { hasText: 'Click for JS Prompt' });
    this.result        = page.locator('#result');
  }

  async navigate(): Promise<void> {
    await this.goto('/javascript_alerts');
  }

  /** Trigger a simple alert and auto-accept it */
  async triggerAndAcceptAlert(): Promise<void> {
    this.page.once('dialog', dialog => dialog.accept());
    await this.alertButton.click();
  }

  /** Trigger a confirm dialog and accept it */
  async triggerAndAcceptConfirm(): Promise<void> {
    this.page.once('dialog', dialog => dialog.accept());
    await this.confirmButton.click();
  }

  /** Trigger a confirm dialog and dismiss it */
  async triggerAndDismissConfirm(): Promise<void> {
    this.page.once('dialog', dialog => dialog.dismiss());
    await this.confirmButton.click();
  }

  /** Trigger a prompt, type text, and accept */
  async triggerPromptAndType(text: string): Promise<void> {
    this.page.once('dialog', dialog => dialog.accept(text));
    await this.promptButton.click();
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  async assertResult(text: string): Promise<void> {
    await expect(this.result).toContainText(text);
  }
}

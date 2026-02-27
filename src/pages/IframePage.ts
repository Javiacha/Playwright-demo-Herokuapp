/**
 * @file IframePage.ts
 * @description Page Object for /iframe – interacting with content inside an iframe.
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { Page, Locator, FrameLocator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class IframePage extends BasePage {
  readonly iframeLocator: FrameLocator;
  readonly editorBody:    Locator;

  constructor(page: Page) {
    super(page);
    // The TinyMCE editor lives inside an iframe
    this.iframeLocator = page.frameLocator('#mce_0_ifr');
    this.editorBody    = this.iframeLocator.locator('#tinymce');
  }

  async navigate(): Promise<void> {
    await this.goto('/iframe');
    // Wait for the iframe editor to be ready
    await this.editorBody.waitFor({ state: 'visible', timeout: 15_000 });
  }

  async clearEditor(): Promise<void> {
    await this.editorBody.click();
    await this.page.keyboard.press('Control+a');
    await this.page.keyboard.press('Delete');
  }

  async typeInEditor(text: string): Promise<void> {
    await this.editorBody.click();
    await this.editorBody.type(text);
  }

  async getEditorText(): Promise<string> {
    return (await this.editorBody.textContent()) ?? '';
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  async assertEditorContains(text: string): Promise<void> {
    await expect(this.editorBody).toContainText(text);
  }
}

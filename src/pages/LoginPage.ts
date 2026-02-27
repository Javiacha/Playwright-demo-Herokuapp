/**
 * @file LoginPage.ts
 * @description Page Object for /login – form authentication.
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton:   Locator;
  readonly flashMessage:  Locator;
  readonly logoutButton:  Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton   = page.locator('button[type="submit"]');
    this.flashMessage  = page.locator('#flash');
    this.logoutButton  = page.locator('a[href="/logout"]');
  }

  async navigate(): Promise<void> {
    await this.goto('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.clearAndFill(this.usernameInput, username);
    await this.clearAndFill(this.passwordInput, password);
    await this.loginButton.click();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  async assertLoginSuccess(): Promise<void> {
    await expect(this.flashMessage).toContainText('You logged into a secure area');
    await expect(this.logoutButton).toBeVisible();
  }

  async assertLoginFailure(): Promise<void> {
  await expect(this.flashMessage).toContainText('invalid');
}

  async assertLoggedOut(): Promise<void> {
    await expect(this.flashMessage).toContainText('You logged out');
    await expect(this.loginButton).toBeVisible();
  }
}

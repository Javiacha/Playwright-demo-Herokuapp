/**
 * @file login.steps.ts
 * @description Step definitions for login.feature
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { Given, When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

Given('I am on the login page', async function (this: PlaywrightWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('I log in with username {string} and password {string}',
  async function (this: PlaywrightWorld, username: string, password: string) {
    await loginPage.login(username, password);
  }
);

When('I click the logout button', async function (this: PlaywrightWorld) {
  await loginPage.logout();
});

Then('I should see a success message', async function (this: PlaywrightWorld) {
  await loginPage.assertLoginSuccess();
});

Then('the logout button should be visible', async function (this: PlaywrightWorld) {
  await loginPage.assertLoginSuccess();
});

Then('I should see an error message', async function (this: PlaywrightWorld) {
  await loginPage.assertLoginFailure();
});

Then('I should be logged out successfully', async function (this: PlaywrightWorld) {
  await loginPage.assertLoggedOut();
});

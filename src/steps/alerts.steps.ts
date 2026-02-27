/**
 * @file alerts.steps.ts
 * @description Step definitions for alerts.feature
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { Given, When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world';
import { AlertsPage } from '../pages/AlertsPage';

let alertsPage: AlertsPage;

Given('I am on the javascript alerts page', async function (this: PlaywrightWorld) {
  alertsPage = new AlertsPage(this.page);
  await alertsPage.navigate();
});

When('I trigger and accept the JS alert', async function (this: PlaywrightWorld) {
  await alertsPage.triggerAndAcceptAlert();
});

When('I trigger and accept the JS confirm', async function (this: PlaywrightWorld) {
  await alertsPage.triggerAndAcceptConfirm();
});

When('I trigger and dismiss the JS confirm', async function (this: PlaywrightWorld) {
  await alertsPage.triggerAndDismissConfirm();
});

When('I trigger the JS prompt and type {string}', async function (this: PlaywrightWorld, text: string) {
  await alertsPage.triggerPromptAndType(text);
});

Then('the result should contain {string}', async function (this: PlaywrightWorld, text: string) {
  await alertsPage.assertResult(text);
});

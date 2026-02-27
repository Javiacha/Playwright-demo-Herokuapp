/**
 * @file checkboxes.steps.ts
 * @description Step definitions for checkboxes.feature
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { Given, When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world';
import { CheckboxesPage } from '../pages/CheckboxesPage';

let checkboxesPage: CheckboxesPage;

Given('I am on the checkboxes page', async function (this: PlaywrightWorld) {
  checkboxesPage = new CheckboxesPage(this.page);
  await checkboxesPage.navigate();
});

When('I check checkbox number {int}', async function (this: PlaywrightWorld, index: number) {
  await checkboxesPage.checkByIndex(index - 1); // convert to 0-based
});

When('I uncheck checkbox number {int}', async function (this: PlaywrightWorld, index: number) {
  await checkboxesPage.uncheckByIndex(index - 1);
});

Then('there should be {int} checkboxes on the page', async function (this: PlaywrightWorld, count: number) {
  await checkboxesPage.assertCheckboxCount(count);
});

Then('checkbox number {int} should be checked', async function (this: PlaywrightWorld, index: number) {
  await checkboxesPage.assertChecked(index - 1);
});

Then('checkbox number {int} should be unchecked', async function (this: PlaywrightWorld, index: number) {
  await checkboxesPage.assertUnchecked(index - 1);
});

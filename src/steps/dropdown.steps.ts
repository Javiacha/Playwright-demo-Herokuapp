/**
 * @file dropdown.steps.ts
 * @description Step definitions for dropdown.feature
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { Given, When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world';
import { DropdownPage } from '../pages/DropdownPage';

let dropdownPage: DropdownPage;

Given('I am on the dropdown page', async function (this: PlaywrightWorld) {
  dropdownPage = new DropdownPage(this.page);
  await dropdownPage.navigate();
});

When('I select option with value {string}', async function (this: PlaywrightWorld, value: string) {
  await dropdownPage.selectOption(value);
});

When('I select option with label {string}', async function (this: PlaywrightWorld, label: string) {
  await dropdownPage.selectByLabel(label);
});

Then('the selected value should be {string}', async function (this: PlaywrightWorld, value: string) {
  await dropdownPage.assertSelectedValue(value);
});

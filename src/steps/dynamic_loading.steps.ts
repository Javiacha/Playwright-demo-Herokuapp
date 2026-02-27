/**
 * @file dynamic_loading.steps.ts
 * @description Step definitions for dynamic_loading.feature
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { Given, When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world';
import { DynamicLoadingPage } from '../pages/DynamicLoadingPage';

let dynamicPage: DynamicLoadingPage;

Given('I am on the dynamic loading page example {int}',
  async function (this: PlaywrightWorld, example: 1 | 2) {
    dynamicPage = new DynamicLoadingPage(this.page);
    await dynamicPage.navigate(example);
  }
);

When('I click the start button', async function (this: PlaywrightWorld) {
  await dynamicPage.clickStart();
});

When('I wait for the content to load', async function (this: PlaywrightWorld) {
  await dynamicPage.waitForContent();
});

Then('I should see the text {string}', async function (this: PlaywrightWorld, text: string) {
  await dynamicPage.assertFinishTextVisible(text);
});

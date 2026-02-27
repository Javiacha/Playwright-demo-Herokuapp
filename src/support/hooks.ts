/**
 * @file hooks.ts
 * @description Cucumber hooks – handles browser lifecycle and screenshot on failure.
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { Before, After, AfterStep, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { PlaywrightWorld } from './world';
import * as fs from 'fs';

setDefaultTimeout(30_000);

// Ensure reports and screenshots directories exist
['reports', 'reports/screenshots'].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

Before(async function (this: PlaywrightWorld) {
  await this.openBrowser();
});

After(async function (this: PlaywrightWorld, scenario) {
  // Take a screenshot on failure and attach it to the report
  if (scenario.result?.status === Status.FAILED) {
    const screenshotPath = `reports/screenshots/${scenario.pickle.name.replace(/\s+/g, '_')}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });

    const screenshot = fs.readFileSync(screenshotPath);
    this.attach(screenshot, 'image/png');
  }

  await this.closeBrowser();
});

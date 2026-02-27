/**
 * @file world.ts
 * @description Cucumber World – provides shared browser/page context to all steps.
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from 'playwright';
import * as dotenv from 'dotenv';

dotenv.config();

export interface CustomWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

export class PlaywrightWorld extends World implements CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  /**
   * Launches the browser based on the BROWSER env variable.
   * Defaults to chromium.
   */
  async openBrowser(): Promise<void> {
    const browserName = process.env.BROWSER ?? 'chromium';
    const headless = process.env.HEADED !== 'true';

    const launchers: Record<string, typeof chromium> = { chromium, firefox, webkit };
    const launcher = launchers[browserName] ?? chromium;

    this.browser = await launcher.launch({ headless, slowMo: 0 });
    this.context = await this.browser.newContext({
      baseURL:   process.env.BASE_URL ?? 'https://the-internet.herokuapp.com',
      viewport:  { width: 1280, height: 720 },
      locale:    'en-US',
    });
    this.page = await this.context.newPage();
  }

  async closeBrowser(): Promise<void> {
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(PlaywrightWorld);

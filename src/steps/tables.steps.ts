/**
 * @file tables.steps.ts
 * @description Step definitions for tables.feature
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { Given, When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world';
import { TablesPage } from '../pages/TablesPage';
import { Locator } from 'playwright';

let tablesPage: TablesPage;

Given('I am on the tables page', async function (this: PlaywrightWorld) {
  tablesPage = new TablesPage(this.page);
  await tablesPage.navigate();
});

function getTable(tablesPage: TablesPage, tableNumber: number): Locator {
  return tableNumber === 1 ? tablesPage.table1 : tablesPage.table2;
}

When('I sort table {int} by column {string}',
  async function (this: PlaywrightWorld, tableNum: number, column: string) {
    const table = getTable(tablesPage, tableNum);
    await tablesPage.sortByColumn(table, column);
  }
);

Then('table {int} should have {int} rows',
  async function (this: PlaywrightWorld, tableNum: number, count: number) {
    const table = getTable(tablesPage, tableNum);
    await tablesPage.assertRowCount(table, count);
  }
);

Then('table {int} row {int} column {int} should contain {string}',
  async function (this: PlaywrightWorld, tableNum: number, row: number, col: number, text: string) {
    const table = getTable(tablesPage, tableNum);
    await tablesPage.assertCellContains(table, row, col, text);
  }
);

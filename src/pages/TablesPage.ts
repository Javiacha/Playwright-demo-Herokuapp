/**
 * @file TablesPage.ts
 * @description Page Object for /tables – sorting and reading table data.
 * @author Javier Acha <javiacha@yahoo.com>
 */

import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TablesPage extends BasePage {
  readonly table1: Locator;
  readonly table2: Locator;

  constructor(page: Page) {
    super(page);
    this.table1 = page.locator('#table1');
    this.table2 = page.locator('#table2');
  }

  async navigate(): Promise<void> {
    await this.goto('/tables');
  }

  /** Click a column header to sort by it */
  async sortByColumn(table: Locator, columnName: string): Promise<void> {
    await table.locator('th', { hasText: columnName }).click();
  }

  /** Get all values from a specific column (by header name) in table1 */
  async getColumnValues(table: Locator, columnName: string): Promise<string[]> {
    const headers = await table.locator('thead th').allTextContents();
    const colIndex = headers.findIndex(h => h.trim().includes(columnName));

    if (colIndex === -1) throw new Error(`Column "${columnName}" not found`);

    const cells = await table.locator(`tbody tr td:nth-child(${colIndex + 1})`).allTextContents();
    return cells.map(c => c.trim());
  }

  /** Get the number of rows in a table body */
  async getRowCount(table: Locator): Promise<number> {
    return table.locator('tbody tr').count();
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  async assertRowCount(table: Locator, count: number): Promise<void> {
    await expect(table.locator('tbody tr')).toHaveCount(count);
  }

  async assertCellContains(table: Locator, row: number, col: number, text: string): Promise<void> {
    const cell = table.locator(`tbody tr:nth-child(${row}) td:nth-child(${col})`);
    await expect(cell).toContainText(text);
  }
}

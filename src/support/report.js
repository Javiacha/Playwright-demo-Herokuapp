/**
 * @file report.js
 * @description Generates a rich HTML report from the cucumber JSON output.
 * @author Javier Acha <javiacha@yahoo.com>
 */

const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
  jsonDir:    'reports/',
  reportPath: 'reports/html-report/',
  metadata: {
    browser:  { name: process.env.BROWSER ?? 'chromium', version: 'latest' },
    device:   'Desktop',
    platform: { name: process.env.OS ?? 'windows', version: '11' },
  },
  customData: {
    title: 'Test Execution Report',
    data: [
      { label: 'Project',     value: 'Herokuapp Playwright + Cucumber' },
      { label: 'Author',      value: 'Javier Acha' },
      { label: 'Environment', value: process.env.ENV ?? 'dev' },
      { label: 'Executed',    value: new Date().toISOString() },
    ],
  },
  pageTitle:   'Herokuapp Test Report',
  reportName:  'Playwright + Cucumber Framework — Javier Acha',
  displayDuration: true,
  durationInMS:    true,
});

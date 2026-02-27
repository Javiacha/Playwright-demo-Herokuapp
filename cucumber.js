module.exports = {
  default: {
    require: [
      'src/support/world.ts',
      'src/support/hooks.ts',
      'src/steps/**/*.ts',
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html',
    ],
    formatOptions: { snippetInterface: 'async-await' },
    paths: ['src/features/**/*.feature'],
    parallel: 2,
    timeout: 30000,
  },
};

export default {
    requireModule: ['ts-node/register'],
    require: ['./step-definitions/**/*.ts', './support/**/*.ts'],
    format: [
      'json:test-results/json/cucumber_report.json',
      '@cucumber/pretty-formatter'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    publishQuiet: true
  };
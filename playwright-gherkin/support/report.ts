import reporter from "cucumber-html-reporter";

const options: reporter.Options = {
  theme: "bootstrap",
  jsonFile: "test-results/json/cucumber_report.json",
  output: "test-results/reports/cucumber_report.html",
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false, 
  name: "ヤスケ テストレポート",
  metadata: {
    "App Name": "Panic Alert Automation",
    "Test Environment": "Stage",
    "Browser": "Chromium",
    "Platform": process.platform,
    "Executed": "Remote",
  },
};

reporter.generate(options);
console.log("✅ Cucumber HTML Report generated at: test-results/reports/cucumber_report.html");

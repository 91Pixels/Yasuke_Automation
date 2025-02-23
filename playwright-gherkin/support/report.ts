import reporter from "cucumber-html-reporter";
import fs from "fs";

const jsonReportPath = "test-results/json/cucumber_report.json";
const outputReportPath = "test-results/reports/cucumber_report.html";

// Read the JSON report and modify it to include retry attempts
const rawData = fs.readFileSync(jsonReportPath, "utf8");
const reportData = JSON.parse(rawData);

// Enhance report metadata to include retry information
let retryCount = 0;

// Loop through scenarios to count retries
reportData.forEach((feature: any) => {
  feature.elements.forEach((scenario: any) => {
    const retries = scenario.steps.filter((step: any) => step.result.retryCount).length;
    retryCount += retries;
    if (retries > 0) {
      scenario.name += ` (Retried ${retries} times)`;
    }
  });
});

// Save the modified JSON with retry info
fs.writeFileSync(jsonReportPath, JSON.stringify(reportData, null, 2));

const options: reporter.Options = {
  theme: "bootstrap",
  jsonFile: jsonReportPath,
  output: outputReportPath,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  name: "ヤスケ テストレポート - QA Mike",
  metadata: {
    "App Name": "Panic Alert Automation",
    "Test Environment": "Stage",
    "Browser": "Chromium",
    "Platform": process.platform,
    "Executed": "Remote",
    "Total Retries": retryCount.toString(), 
  },
};

reporter.generate(options);
console.log(`✅ Cucumber HTML Report generated at: ${outputReportPath}`);
console.log(`🔄 Total retry attempts in the report: ${retryCount}`);

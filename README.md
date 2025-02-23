# ヤスケ テストレポート (Yazuke Testing Framework)

## Overview
ヤスケ テストレポート (Yazuke Testing Framework) is an automated testing framework that integrates Playwright with Cucumber to provide an efficient and structured approach to end-to-end testing using the Gherkin syntax.

This README is intended for GitHub to document the project and its functionality.

## Author
This framework was created by **Michael A. Camacho**.

## Features
- **Gherkin Syntax Support**: Write test cases in a human-readable format.
- **Playwright Integration**: Automate browser interactions across different environments.
- **Cucumber Report Generation**: Generate structured and detailed test reports.
- **TypeScript Support**: Write test cases with TypeScript for better maintainability.

## Installation
To set up the framework, run the following command:
```sh
npm install
```

## Running Tests
Execute tests using the following command:
```sh
npm run test
```

## Generating Reports
To generate a detailed test report:
```sh
npm run report
```

## Project Structure
```
├── features/             # Gherkin feature files
│   ├── button-colors.feature  # Test cases for button colors
│   ├── login.feature          # Test cases for login functionality
│
├── step-definitions/     # Step definitions for test execution
│   ├── button-color.steps.ts  # Steps for button color tests
│   ├── login.steps.ts         # Steps for login tests
│
├── support/             # Additional support scripts and utilities
│   ├── hooks.ts          # Hooks for setting up and tearing down tests
│   ├── report.ts         # Script for generating reports
│
├── test-results/        # Test result storage
│   ├── json/            # JSON formatted test results
│   ├── reports/         # Directory for HTML reports
│   │   ├── cucumber_report.html  # Generated Cucumber test report
│   ├── screenshots/     # Screenshots taken during tests
│
├── package-lock.json    # Dependency lock file
├── package.json         # Project dependencies and scripts
├── cucumber.js          # Cucumber configuration
├── README.md            # Project documentation (this file)
├── tsconfig.json        # TypeScript configuration
```

## Dependencies
- `@playwright/test`: Playwright for automated browser testing
- `@cucumber/cucumber`: Cucumber for BDD-style testing
- `ts-node`: TypeScript execution environment
- `cucumber-html-reporter`: For generating HTML test reports

## Contributing
Contributions are welcome! Feel free to submit issues and pull requests.

## License
This project is licensed under the ISC License.


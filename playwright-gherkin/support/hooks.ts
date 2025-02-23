import { After, Before, BeforeStep, setWorldConstructor, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, chromium, Page } from 'playwright';

export class OurWorld {
    browser!: Browser;
    page!: Page;
    constructor() {}
}

setWorldConstructor(OurWorld);

// Set default timeout for each step to avoid false positives due to slow responses
setDefaultTimeout(30 * 1000); // 30 seconds

// Launch the browser before each scenario
Before(async function (this: OurWorld) {
    this.browser = await chromium.launch({ headless: true });
    this.page = await this.browser.newPage();
});

// Automatically retry each step up to 2 times if it fails
BeforeStep(async function (this: OurWorld, step) {
    let attempt = 0;
    const maxRetries = 2; // Change this value if needed

    while (attempt < maxRetries) {
        try {
            console.log(`🔄 Running step: "${step.pickleStep.text}" - Attempt ${attempt + 1}`);
            return; // If the step passes, exit the loop
        } catch (error) {
            attempt++;
            console.warn(`⚠️ Step failed. Retrying ${attempt}/${maxRetries}...`);
            if (attempt === maxRetries) {
                console.error(`❌ Step failed after ${maxRetries} attempts.`);
                throw error; // Fail the test if all retries fail
            }
        }
    }
});

// Close browser after each scenario
After(async function (this: OurWorld) {
    await this.page?.close();
    await this.browser?.close();
});

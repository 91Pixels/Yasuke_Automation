import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";

let browser: Browser;
let page: Page;

Before(async function () {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
});

After(async function () {
  await browser.close();
});

Given("I open the browser", async function () {
  // Browser is opened in Before hook
});

When('I navigate to {string}', async function (url: string) {
  await page.goto(url, { timeout: 60000 });
});

Then("The page title should contain {string}", async function (expectedTitle: string) {
  await page.waitForLoadState("domcontentloaded", { timeout: 15000 });
  const title = await page.title();
  if (!title.includes(expectedTitle)) {
    throw new Error(`Expected "${expectedTitle}" but got "${title}"`);
  }
});

When('I enter {string} in the email field', async function (email: string) {
  await page.waitForSelector("xpath=/html/body/app-root/app-login/div/div[2]/div[2]/div[1]/form/div[1]/input", { timeout: 15000 });
  await page.fill("xpath=/html/body/app-root/app-login/div/div[2]/div[2]/div[1]/form/div[1]/input", email);
});

When('I enter {string} in the password field', async function (password: string) {
  await page.waitForSelector("xpath=/html/body/app-root/app-login/div/div[2]/div[2]/div[1]/form/div[2]/input", { timeout: 15000 });
  await page.fill("xpath=/html/body/app-root/app-login/div/div[2]/div[2]/div[1]/form/div[2]/input", password);
});

When('I click the login button', async function () {
  await page.waitForSelector("xpath=/html/body/app-root/app-login/div/div[2]/div[2]/div[1]/form/div[3]/input", { timeout: 15000 });
  await page.click("xpath=/html/body/app-root/app-login/div/div[2]/div[2]/div[1]/form/div[3]/input");
});

Then('I should see error message {string}', async function (expectedMessage: string) {
    const errorSelector = "xpath=/html/body/app-root/app-login/div/div[2]/div[2]/div[1]/form/div[3]/div";
    await page.waitForSelector(errorSelector, { timeout: 15000 });
    const actualMessage = await page.textContent(errorSelector);
  
    console.log(`Actual Error Message Found: "${actualMessage}"`); // Debugging log
  
    if (!actualMessage || !actualMessage.includes(expectedMessage)) {
      throw new Error(`Expected error message "${expectedMessage}" but got "${actualMessage}"`);
    }
  });    

When('I enter valid credentials', async function () {
  await page.waitForSelector("xpath=/html/body/app-root/app-login/div/div[2]/div[2]/div[1]/form/div[1]/input", { timeout: 15000 });
  await page.fill("xpath=/html/body/app-root/app-login/div/div[2]/div[2]/div[1]/form/div[1]/input", 'ownerstage@gmail.com');
  
  await page.waitForSelector("xpath=/html/body/app-root/app-login/div/div[2]/div[2]/div[1]/form/div[2]/input", { timeout: 15000 });
  await page.fill("xpath=/html/body/app-root/app-login/div/div[2]/div[2]/div[1]/form/div[2]/input", 'Test@1234');
});

Then('I should be redirected to the dashboard', async function () {
  await page.waitForURL("https://panic-alert-stage.azurewebsites.net/main/activeAlerts", { timeout: 30000 });
});

export { browser, page };

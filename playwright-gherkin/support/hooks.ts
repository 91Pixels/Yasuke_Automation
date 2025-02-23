import { After, Before, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, chromium, Page } from 'playwright';

export class OurWorld {
    browser!: Browser;
    page!: Page;
    constructor() {}
}

setWorldConstructor(OurWorld);

Before(async function (this: OurWorld) {
    this.browser = await chromium.launch({ headless: false });
});

After(async function (this: OurWorld) {
    await this.page?.close();
    await this.browser?.close();
});
import { Then } from "@cucumber/cucumber";
import { page } from "./login.steps.js";

// Function to convert HEX to RGB
function hexToRgb(hex: string): string {
  try {
    hex = hex.replace(/^#/, "");
    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
    return `rgb(${r}, ${g}, ${b})`;
  } catch (error) {
    console.error(`❌ Failed to convert hex color ${hex} to RGB:`, error);
    throw error;
  }
}

// Helper function to get the correct selector
function getSelector(selector: string): { type: 'xpath' | 'css', value: string } {
  // If it's the login button, use the known working selectors
  if (selector === '#login' || selector === "button[type='submit']") {
    return {
      type: 'xpath',
      value: "/html/body/app-root/app-login/div/div[2]/div[2]/div[1]/form/div[3]/input"
    };
  }
  
  // For other selectors, determine if it's xpath or css
  if (selector.startsWith('/')) {
    return { type: 'xpath', value: selector };
  }
  return { type: 'css', value: selector };
}

// Step to verify button color
Then('the button {string} should have the color {string}', async function (buttonSelector: string, expectedHexColor: string) {
  console.log('\n🔍 Starting button color verification...');
  
  const selector = getSelector(buttonSelector);
  console.log(`📌 Using ${selector.type.toUpperCase()} selector: "${selector.value}"`);
  
  try {
    // First check if the button exists
    console.log('⏳ Waiting for button to be visible...');
    const buttonExists = await page.waitForSelector(
      selector.type === 'xpath' ? `xpath=${selector.value}` : selector.value, 
      { 
        state: 'visible',
        timeout: 15000 
      }
    ).catch(() => null);

    if (!buttonExists) {
      throw new Error(`Button with ${selector.type} "${selector.value}" not found on page`);
    }

    // Get button's computed styles using JavaScript evaluation
    console.log('🎨 Getting button styles...');
    const buttonStyles = await page.evaluate((selectorInfo) => {
      let element: Element | null = null;
      
      if (selectorInfo.type === 'xpath') {
        const result = document.evaluate(
          selectorInfo.value,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        );
        const node = result.singleNodeValue;
        // Type check and cast
        if (node instanceof Element) {
          element = node;
        }
      } else {
        element = document.querySelector(selectorInfo.value);
      }

      if (!element) return null;
      
      const styles = getComputedStyle(element);
      return {
        backgroundColor: styles.backgroundColor,
        background: styles.background,
        display: styles.display,
        visibility: styles.visibility,
        opacity: styles.opacity,
        tagName: element.tagName,
        className: element.className,
        type: element.getAttribute('type')
      };
    }, selector);

    console.log('📊 Button properties:', buttonStyles);

    if (!buttonStyles) {
      throw new Error('Failed to get button styles');
    }

    const buttonColor = buttonStyles.backgroundColor;
    const expectedRgbColor = hexToRgb(expectedHexColor);

    console.log('\n🎯 Color Comparison:');
    console.log(`   Expected HEX: ${expectedHexColor} (#009bb6)`);
    console.log(`   Expected RGB: ${expectedRgbColor} (rgb(0, 155, 182))`);
    console.log(`   Actual Color: ${buttonColor}`);

    // Verify the color
    if (!buttonColor) {
      throw new Error('Button has no background color defined');
    }

    if (buttonColor !== expectedRgbColor) {
      console.error('\n❌ Color Mismatch Details:');
      const actualRGB = buttonColor.match(/\d+/g)?.map(Number);
      const expectedRGB = [0, 155, 182]; // #009bb6
      
      if (actualRGB) {
        console.error('RGB Difference Analysis:');
        console.error(`   Red:   Expected 0, Got ${actualRGB[0]}, Diff: ${0 - actualRGB[0]}`);
        console.error(`   Green: Expected 155, Got ${actualRGB[1]}, Diff: ${155 - actualRGB[1]}`);
        console.error(`   Blue:  Expected 182, Got ${actualRGB[2]}, Diff: ${182 - actualRGB[2]}`);
      }
      
      throw new Error(`Color mismatch! Expected: rgb(0, 155, 182), but got: ${buttonColor}`);
    }

    console.log('\n✅ Test Passed! Button color matches #009bb6');
    
    // Take a screenshot on success
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ 
      path: `./test-results/screenshots/button-color-pass-${timestamp}.png`,
      fullPage: true 
    });

  } catch (error) {
    console.error('\n❌ Test Failed!');
    console.error('Error details:', error);
    
    // Take screenshot on failure
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ 
      path: `./test-results/screenshots/button-color-fail-${timestamp}.png`,
      fullPage: true 
    });

    throw error;
  }
});

Then('I check the {string} checkbox', async function (checkbox: string) {
  await page.locator(checkbox).waitFor({state:'visible',timeout: 15000 });
  await page.locator(checkbox).check()
  await page.waitForLoadState('networkidle')
});

Then('I click the {string} button', async function (button: string) {
  await page.locator(button).waitFor({state:'visible',timeout: 15000 });
  await page.locator(button).click()
  await page.waitForLoadState('load')
  await page.waitForLoadState('networkidle')
});
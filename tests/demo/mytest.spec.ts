import { test, expect  } from '@playwright/test';

test('mytest', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  const title = await page.title();
  expect(title).toBe('CURA Healthcare Service');
  await expect(page.locator('//h1')).toHaveText('CURA Healthcare Service');
});

test('somethig goes here',{tag: "@smoke"},async ({ page }, testInfo) => {});

test.only('something goes here',async ({ page }) => {

  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  let appointmentLink = page.getByRole('link', { name: 'Make Appointment' });
  console.log(`== The type of locator for appointmentLink: ${typeof appointmentLink}. 
    The value of the locator ${JSON.stringify(appointmentLink)}`);
  //await appointmentLink.click();
}); // end of test
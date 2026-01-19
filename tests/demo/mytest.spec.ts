import { test, expect  } from '@playwright/test';

test('mytest', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  const title = await page.title();
  expect(title).toBe('CURA Healthcare Service');
  await expect(page.locator('//h1')).toHaveText('CURA Healthcare Service');
});

test('nyt links test',{tag: "@smoke"},async ({ page }, testInfo) => {
  await page.goto('https://www.nytimes.com/');
  const links = await page.getByRole('link').allTextContents();
  console.log(`== The number of links on the page: ${links.length}`);
 // console.log(`== The links are: ${links}`);
  for (const link of links) {
    console.log(`== The link is: ${link}`);
  }
});

test('something goes here',async ({ page }) => {

  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  let appointmentLink = page.getByRole('link', { name: 'Make Appointment' });
  console.log(`== The type of locator for appointmentLink: ${typeof appointmentLink}. 
    The value of the locator ${JSON.stringify(appointmentLink)}`);
  //await appointmentLink.click();
}); 

import { test, expect } from '@playwright/test';

test.describe('Make Appointment', () => {
  test.beforeEach('Login to the web app with valid credentials', async ({ page }) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await page.getByRole('link', { name: 'Make Appointment' }).click();
    const userName = page.getByPlaceholder('Username').last();
    const password = page.getByPlaceholder('Password').last();
    await userName.fill('John Doe');
    await password.fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    //await expect(page.url()).toContain('https://katalon-demo-cura.herokuapp.com/profile.php#login');
  });

  test.only('make appointment with non-default values', async ({ page }) => {
    //extract all link texts from a page 
    //const texts = await page.getByRole('link').allTextContents();
    //dropdown
    await expect(page.getByLabel('Facility')).toHaveValue('Tokyo CURA Healthcare Center');
    await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
    await (page.getByLabel('Facility')).selectOption({label: 'Seoul CURA Healthcare Center'});
    await (page.getByLabel('Facility').selectOption({index: 0}));
    await expect(page.getByLabel('Facility')).toHaveValue('Tokyo CURA Healthcare Center');
    //asert the count in the dropdown
    const count = await page.getByLabel('Facility').locator('option').count();
    await expect(count).toBe(3);
    let listOfDropdownOptions = await page.getByLabel('Facility').all(); 
    let arrayOfOptions: string[] = [];
    for (const option of listOfDropdownOptions) {
      let optionText = await option.textContent();
      if(optionText){
        arrayOfOptions.push(optionText);
      }
    }
    console.log(arrayOfOptions);
    //checkbox
    await page.getByText('Apply for hospital readmission').check();
    await page.getByText('Apply for hospital readmission').uncheck();
    //radio button
    //assert the default radio button is selected
    await expect(page.getByText('Medicare')).toBeChecked();
    await page.getByText('Medicaid').check();
    await expect(page.getByText('Medicare')).not.toBeChecked();
    //date picker
    await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
    await page.getByRole('cell', { name: '21' }).click();
    //multiline comment box
    await page.getByRole('textbox', { name: 'Comment' }).click();
    await page.getByRole('textbox', { name: 'Comment' }).fill('making comments for the appointment');
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    //confirmation button
    await expect(page.locator('h2')).toContainText('Appointment Confirmation');
    //assert the appointment is booked
    await expect(page.getByRole('link', { name: 'Go to Homepage' })).toBeVisible();
  });
});


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
    //dropdown
    await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
    //checkbox
    await page.getByText('Apply for hospital readmission').click();
    //radio button
    await page.getByText('Medicaid').click();
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


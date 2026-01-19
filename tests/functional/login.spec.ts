import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  const userName = page.getByPlaceholder('Username').last();
  const password = page.getByPlaceholder('Password').last();
  await userName.fill('John Doe');
  await password.fill('ThisisNotAPassword');
  await page.getByRole('button', { name: 'Login' }).click();
 // await expect(page.url()).toContain('https://katalon-demo-cura.herokuapp.com/profile.php#login');
});
import { test, expect } from '@playwright/test';

test.describe('inventory feature', () => {
    test.beforeEach('Login to the web app with valid credentials', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.url()).toContain('https://www.saucedemo.com/inventory.html');
    });
    test('Should confirm that all prices are non-zero values', async ({ page }) => {
        
    });
});
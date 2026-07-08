import { test, expect } from '@playwright/test';

const USER = {
  username: 'standard_user',
  password: 'secret_sauce',
};

const CUSTOMER = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345',
};

test.describe('Checkout', () => {
  test('Standard user can complete a purchase successfully', async ({ page }) => {
    // Navigate to SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // Log in
    await page.locator('[data-test="username"]').fill(USER.username);
    await page.locator('[data-test="password"]').fill(USER.password);
    await page.locator('[data-test="login-button"]').click();

    // Verify inventory page
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');

    // Add two products to the cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Verify cart badge
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // Open cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Verify selected items
    await expect(page.locator('[data-test="inventory-item-name"]')).toContainText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
    ]);

    // Proceed to checkout
    await page.locator('[data-test="checkout"]').click();

    // Enter customer information
    await page.locator('[data-test="firstName"]').fill(CUSTOMER.firstName);
    await page.locator('[data-test="lastName"]').fill(CUSTOMER.lastName);
    await page.locator('[data-test="postalCode"]').fill(CUSTOMER.postalCode);
    await page.locator('[data-test="continue"]').click();

    // Verify checkout overview
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

    // Complete checkout
    await page.locator('[data-test="finish"]').click();

    // Verify successful checkout
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
    await expect(page.locator('[data-test="complete-header"]')).toHaveText(
      'Thank you for your order!'
    );
  });
});
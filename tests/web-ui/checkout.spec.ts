import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

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
  test('Standard user can complete a purchase successfully @happy', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(USER.username, USER.password);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');

    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();

    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.openCart();

    await expect(cartPage.inventoryItems).toContainText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
    ]);

    await cartPage.checkout();

    await checkoutPage.fillCustomerInformation(
      CUSTOMER.firstName,
      CUSTOMER.lastName,
      CUSTOMER.postalCode
    );

    await checkoutPage.continue();

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(checkoutPage.title).toHaveText('Checkout: Overview');

    await checkoutPage.finish();

    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutPage.title).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.completeHeader).toHaveText(
      'Thank you for your order!'
    );
  });
});
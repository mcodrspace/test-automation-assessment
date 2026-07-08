import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

const LOCKED_OUT_USER = {
  username: 'locked_out_user',
  password: 'secret_sauce',
};

test.describe('Login', () => {
  test('Locked out user cannot log in @unhappy', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      LOCKED_OUT_USER.username,
      LOCKED_OUT_USER.password
    );

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});
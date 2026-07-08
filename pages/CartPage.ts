import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly inventoryItems: Locator;

  constructor(private readonly page: Page) {
    this.inventoryItems = page.locator('[data-test="inventory-item-name"]');
  }

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
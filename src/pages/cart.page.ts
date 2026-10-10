import { Page, Locator } from '@playwright/test';
import { escapeRegExp } from '../utils/regex.utils';

export class CartPage {
    constructor(private readonly page: Page) {}

    async proceedToCheckout(): Promise<void> {
        await this.page.locator('#shoppingCart').getByRole('button', { name: /^CHECKOUT/ }).click();
    }

    getCartItems(): Locator {
        return this.page.locator('#shoppingCart tbody tr');
    }

    getCartItem(productName: string): Locator {
        const productNamePattern = new RegExp(`^${escapeRegExp(productName)}$`, 'i');

        return this.getCartItems().filter({has: this.page.locator('label.productName').filter({ hasText: productNamePattern })});
    }

    getProductQuantity(productName: string): Locator {
        return this.getCartItem(productName).locator('td.quantityMobile label.ng-binding');
    }
}
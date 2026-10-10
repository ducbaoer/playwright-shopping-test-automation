import { Page } from '@playwright/test';

export class ProductPage {

    constructor(private readonly page: Page) {}

    async addToCart(): Promise<void> {
        await this.page.getByRole('button', { name: 'ADD TO CART' }).click();
    }

    async setQuantity(quantity: number): Promise<void> {
        await this.page.locator('input[name="quantity"]').fill(String(quantity));
    }
}
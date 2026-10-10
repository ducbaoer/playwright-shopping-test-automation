import { Page } from '@playwright/test';
import { escapeRegExp } from '../utils/regex.utils';

export class CategoryPage {

    constructor(private readonly page: Page) {}

    async selectProduct(productName: string): Promise<void> {
        const productNamePattern = new RegExp(`^${escapeRegExp(productName)}$`, 'i');

        await this.page.locator('a.productName').filter({ hasText: productNamePattern }).click();
    }
}
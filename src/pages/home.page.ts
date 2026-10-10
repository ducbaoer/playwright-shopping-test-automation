import { Page } from '@playwright/test';
import { getProductCategory } from '../config/product-catalog';
import { HeaderComponent } from './components/header.component';

export class HomePage {
    private readonly header: HeaderComponent;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderComponent(this.page);
    }

    async openCategory(productName: string): Promise<void> {
        const category = getProductCategory(productName);
        await this.header.navigateToHome();
        await this.page.getByRole('link', { name: `${category}Category`, exact: true }).click();
    }

    async openHomepage(): Promise<void> {
        await this.page.goto("/");
    }
}
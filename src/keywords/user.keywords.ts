import { Page, expect } from '@playwright/test';
import { HeaderComponent } from "../pages/components/header.component";
import { getCustomerTestData } from '../data/test-data-reader';
import { CustomerTestData } from '../data/test-data.types';
import { ShoppingListItem } from '../data/test-data.types';
import { RegistrationData } from '../pages/registration.page';
import { PaymentData } from '../data/test-data.types';
import { HomePage } from '../pages/home.page';
import { generateUsername } from '../utils/randomize.utils';

export class UserKeywords {
    private readonly header: HeaderComponent;
    private readonly customer: CustomerTestData;
    private readonly home: HomePage;

    constructor(private readonly page: Page, testCase: string) {
        this.header = new HeaderComponent(page);
        this.home = new HomePage(page);
        this.customer = getCustomerTestData(testCase);
    }

    async openUserMenu(): Promise<void> {
        await this.header.openUserMenu();
    }

    async openShoppingPage(): Promise<void> {
        await this.home.openHomepage();
    }

    async returnToHomePage(): Promise<void> {
        await this.header.navigateToHome();
    }

    async verifySiteTitle(): Promise<void> {
        await expect(this.page).toHaveTitle(/Advantage Shopping/);
    }

    getShoppingList(): ShoppingListItem[] {
        return this.customer.shoppingList;
    }

    getUsername(): string {
        return this.customer.usernamePrefix
    }

    getPassword(): string {
        return this.customer.password
    }

    generateRandomizedUser(): string {
        return this.customer.usernamePrefix = generateUsername(this.customer.usernamePrefix);
    }

    getRegistrationData(): RegistrationData {
        return {
            username: this.customer.usernamePrefix,
            email: this.customer.emailDomain,
            password: this.customer.password
        }
    }

    getPaymentData(): PaymentData {
        return this.customer.paymentData;
    }
}
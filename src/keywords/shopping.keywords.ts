import { Page, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { CategoryPage } from '../pages/category.page';
import { ProductPage } from '../pages/product.page';
import { ShoppingListItem } from '../data/test-data.types';
import { HeaderComponent } from '../pages/components/header.component';
import { CartPage } from '../pages/cart.page';
import { PaymentPage } from '../pages/payment.page';
import { PaymentData } from '../data/test-data.types';

export class ShoppingKeywords {
    private readonly homePage: HomePage;
    private readonly header: HeaderComponent;
    private readonly categoryPage: CategoryPage;
    private readonly productPage: ProductPage;
    private readonly cartPage: CartPage;
    private readonly paymentPage: PaymentPage;

    constructor(private readonly page: Page) {
        this.homePage = new HomePage(page);
        this.header = new HeaderComponent(page);
        this.categoryPage = new CategoryPage(page);
        this.productPage = new ProductPage(page);
        this.cartPage = new CartPage(page);
        this.paymentPage = new PaymentPage(page);
    }

    async addProductToCart(productName: string, quantity: number = 1): Promise<void> {
        await this.homePage.openCategory(productName);
        await this.categoryPage.selectProduct(productName);
        await this.productPage.setQuantity(quantity);
        await this.productPage.addToCart();
    }

    async addShoppingListToCart(shoppingList: ShoppingListItem[]): Promise<void> {
        for (const item of shoppingList) {
            await this.addProductToCart(item.productName, item.quantity);
        }
    }

    async openShoppingCart(): Promise<void> {
        await this.header.openShoppingCart();
    }

    async verifyAllProductsComplete(shoppingList: ShoppingListItem[]): Promise<void> {
        await expect(this.cartPage.getCartItems()).toHaveCount(shoppingList.length);

        for (const item of shoppingList) {
            await expect(this.cartPage.getCartItem(item.productName)).toBeVisible();
            await expect(this.cartPage.getProductQuantity(item.productName)).toHaveText(String(item.quantity));
        }
    }

    async checkoutShoppingCart(): Promise<void> {
        await this.cartPage.proceedToCheckout();
    }

    async selectShipping(): Promise<void> {
        await this.paymentPage.confirmShipping();
    }

    async fillinPaymentData(payment: PaymentData): Promise<void> {
        if (payment.paymentMethod === 'Safepay') {
            await this.paymentPage.fillSafepayData(payment.safepayUsername, payment.safepayPassword);
        }

        if (payment.paymentMethod === 'CreditCard') {
            await this.paymentPage.fillCreditCardData(payment.cardNumber, payment.cvv, payment.expiryMonth, payment.expiryYear, payment.cardholderName);
        }
    }

    async finishPurchase(): Promise<void> {
        await this.paymentPage.getPayNowButton().click();
    }

    async verifyPurchaseSuccessfull(): Promise<void> {
        await expect(this.page.getByText('Thank you for buying with')).toBeVisible();
    }

    async verifyProductCount(shoppingList: ShoppingListItem[], expectedCount: number): Promise<void> {
        let actualCount = 0;

        for (const item of shoppingList) {
            const quantity = this.cartPage.getProductQuantity(item.productName);
            await expect(quantity).toHaveText(String(item.quantity));

            actualCount += Number(await quantity.innerText());
        }

        expect(
            actualCount,
            `Expected ${expectedCount} products in shopping cart, but found ${actualCount}`
        ).toBe(expectedCount);
    }

    async verifyPaymentIsPossible(): Promise<void> {
        try {
            await expect(
                this.paymentPage.getPayNowButton(),
                'Payment form should allow submission'
            ).toBeEnabled({ timeout: 2000 });
        } catch (error) {
            const errors = await this.paymentPage.getValidationErrors();

            throw new Error(
                `Payment cannot be submitted.\n` +
                `Validation errors:\n` +
                (errors.length > 0
                    ? errors.map(e => `- ${e}`).join('\n')
                    : '- No validation errors displayed'),
                { cause: error }
            );
        }
    }
}
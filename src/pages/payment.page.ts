import { Page, Locator } from '@playwright/test';

export class PaymentPage {
    constructor(private readonly page: Page) {}

    async fillSafepayData(username: string, password: string): Promise<void> {
        await this.page.locator('input[name="safepay"]').check();
        await this.page.locator('input[name="safepay_username"]').fill(username);
        await this.page.locator('input[name="safepay_password"]').fill(password);
    }

    async fillCreditCardData(cardNumber: string, cvv: string, expiryMonth: string, expiryYear: string, cardholderName: string): Promise<void> {
        await this.page.locator('input[name="masterCredit"]').check();
        await this.page.locator('#creditCard').fill(cardNumber);
        await this.page.locator('input[name="cvv_number"]').fill(cvv);
        await this.page.locator('select[name="mmListbox"]').selectOption(`string:${expiryMonth}`);
        await this.page.locator('select[name="yyyyListbox"]').selectOption(`string:${expiryYear}`);
        await this.page.locator('input[name="cardholder_name"]').fill(cardholderName);
    }

    async confirmShipping(): Promise<void> {
        await this.page.getByRole('button', { name: 'NEXT' }).click();
    }

    getPayNowButton(): Locator {
        return this.page.locator(
            '#pay_now_btn_SAFEPAY:visible, ' +
            '#pay_now_btn_MasterCredit:visible, ' +
            '#pay_now_btn_ManualPayment:visible'
        );
    }

    async getValidationErrors(): Promise<string[]> {
        return this.page.locator('label.invalid:visible').allTextContents();
    }
}
import { Locator, Page } from '@playwright/test';

export interface RegistrationData {
    username: string;
    email: string;
    password: string;
}

export class RegistrationPage {
    private readonly usernameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly termsCheckbox: Locator;
    private readonly registerButton: Locator;

    constructor(private readonly page: Page) {
        this.usernameInput = page.locator('input[name="usernameRegisterPage"]');
        this.emailInput = page.locator('input[name="emailRegisterPage"]');
        this.passwordInput = page.locator('input[name="passwordRegisterPage"]');
        this.confirmPasswordInput = page.locator('input[name="confirm_passwordRegisterPage"]');
        this.termsCheckbox = page.locator('input[name="i_agree"]');
        this.registerButton = page.getByRole('button', { name: 'REGISTER' });
    }

    async fillRegistrationForm(data: RegistrationData): Promise<void> {
        await this.usernameInput.fill(data.username);
        await this.emailInput.fill(data.email);
        await this.passwordInput.fill(data.password);
        await this.confirmPasswordInput.fill(data.password);
    }

    async acceptTerms(): Promise<void> {
        await this.termsCheckbox.check();
    }

    async submitRegistration(): Promise<void> {
        await this.registerButton.click();
    }

    getRegisterButton(): Locator {
        return this.page.getByRole('button', { name: 'REGISTER', exact: true});
    }

    async getValidationErrors(): Promise<string[]> {
        return await this.page.locator('label.animated.invalid:visible').allTextContents();
    }

    getRegistrationError(): Locator {
        return this.page.locator('#registerCover label.center.block.smollMargin');
    }

    getRegistrationPage(): Locator {
        return this.page.locator('#registerPage');
    }
}
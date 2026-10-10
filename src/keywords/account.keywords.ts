import { Page, expect } from '@playwright/test';
import { HeaderComponent } from "../pages/components/header.component";
import { LoginDialog } from "../pages/components/login-dialog.component";
import { RegistrationData, RegistrationPage } from "../pages/registration.page";

export class AccountKeywords {
    private readonly header: HeaderComponent;
    private readonly loginDialog: LoginDialog;
    private readonly registrationPage: RegistrationPage;

    constructor(private readonly page: Page) {
        this.header = new HeaderComponent(page);
        this.loginDialog = new LoginDialog(page);
        this.registrationPage = new RegistrationPage(page);
    }

    async enterCredentials(username: string, password: string): Promise<void> {
        await this.loginDialog.enterUsername(username);
        await this.loginDialog.enterPassword(password);
    }

    async clickLogin(): Promise<void> {
        await this.loginDialog.submitLogin();
    }

    async loginAsCustomer(username: string, password: string): Promise<void> {
        await this.header.openUserMenu();
        await this.loginDialog.getDialogIndicator().waitFor({ state: 'visible' });
        await this.enterCredentials(username, password);
        await this.clickLogin();
    }

    async logoutCustomer(): Promise<void> {
        await this.header.openUserMenu();
        await this.header.getSignOut().waitFor({ state: 'visible' });
        await this.header.getSignOut().click();
    }

    async openCustomerAccount(): Promise<void> {
        await this.header.openUserMenu();
        await this.header.getMyAccount().click();
    }

    async openCustomerOrders(): Promise<void> {
        await this.header.openUserMenu();
        await this.header.getMyOrders().click();
    }

    async verifyCustomerIsLoggedIn(username: string): Promise<void> {
        await expect(this.header.getUsername()).toBeVisible();
        await expect(this.header.getUsername()).toHaveText(username);
    }

    async verifyNoCustomerIsLoggedIn(): Promise<void> {
        await expect(this.header.getUsername()).not.toBeVisible();
    }

    async verifyNoLoginErrorMessage(): Promise<void> {
        await expect(this.loginDialog.getErrorMessage()).not.toBeVisible();
    }

    async verifyShowLoginErrorMessage(): Promise<void> {
        await expect(this.loginDialog.getErrorMessage()).toBeVisible();
    }

/*     async verifyUsernameVisible(): Promise<void> {
        await expect(this.header.getUsername()).toBeVisible();
    }

    async verifyNotUsernameVisible(): Promise<void> {
        await expect(this.header.getUsername()).not.toBeVisible();
    } */

    async registerNewCustomer(data: RegistrationData): Promise<void> {
        await this.header.openUserMenu();
        await this.loginDialog.openRegistrationPage();
        await this.registrationPage.fillRegistrationForm(data);
        await this.registrationPage.acceptTerms();
    }

    async finishRegistration(): Promise<void> {
        await this.registrationPage.submitRegistration();
    }

    async verifyRegistrationIsPossible(): Promise<void> {
        try {
            await expect(
                this.registrationPage.getRegisterButton(),
                'Registration form should allow submission'
            ).toBeEnabled({ timeout: 2000 });
        } catch (error) {
            const errors = await this.registrationPage.getValidationErrors();

            throw new Error(
                `Registration cannot be submitted.\n` +
                `Validation errors:\n` +
                (errors.length > 0
                    ? errors.map(e => `- ${e}`).join('\n')
                    : '- No validation errors displayed'),
                { cause: error }
            );
        }
    }

    async verifyRegistrationSuccess(): Promise<void> {
        await expect(
            this.registrationPage.getRegistrationPage(),
            'Registration should redirect to the homepage'
        ).toBeHidden();
    }

    async verifySuccessfulLogin(): Promise<void> {
        const errorMessage = this.loginDialog.getErrorMessage();
        const dialog = this.loginDialog.getDialogIndicator();

        await expect(async () => {
            const errorVisible = await errorMessage.isVisible();
            const dialogClosed = !(await dialog.isVisible());

            expect(errorVisible || dialogClosed).toBeTruthy();
        }).toPass();

        await expect(dialog).toBeHidden();
        await expect(errorMessage).not.toBeVisible();
    }
}
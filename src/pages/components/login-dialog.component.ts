import { Locator, Page } from '@playwright/test';

export class LoginDialog {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;
  private readonly dialogIndicator: Locator;
  private readonly errorMessage: Locator;

  private readonly createNewAccountLink: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.signInButton = page.getByRole('button', { name: 'SIGN IN' });
    this.dialogIndicator = page.getByText('SIGN IN WITH FACEBOOK OR');
    this.errorMessage = page.locator('#signInResultMessage');
    this.createNewAccountLink = page.getByRole('link', { name: 'CREATE NEW ACCOUNT' })
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async submitLogin(): Promise<void> {
    await this.signInButton.click();
  }

  getDialogIndicator(): Locator {
    return this.dialogIndicator;
  }

  getErrorMessage(): Locator {
    return this.errorMessage;
  }

  async openRegistrationPage(): Promise<void> {
    await this.createNewAccountLink.click();
  }
}
import { Locator, Page } from '@playwright/test';

export class HeaderComponent {

  private readonly userMenu: Locator;
  private readonly username: Locator;

  constructor(private readonly page: Page) {
    this.userMenu = page.locator('#hrefUserIcon');
    this.username = page.locator('#menuUserLink span.hi-user');
  }

  async navigateToHome(): Promise<void> {
    await this.page.getByRole('link', { name: 'dvantage DEMO' }).click();
  }

  async openUserMenu(): Promise<void> {
    await this.userMenu.click();
  }

  getUserMenu(): Locator {
    return this.userMenu;
  }

  getUsername(): Locator {
    return this.username;
  }

  getMyAccount(): Locator {
    return this.page.getByRole('link', { name: 'My account' });
  }

  getMyOrders(): Locator {
    return this.page.getByRole('link', { name: 'My orders' });
  }

  getSignOut(): Locator {
    return this.page.getByRole('link', { name: 'Sign out' });
  }

  async openShoppingCart(): Promise<void> {
    await this.page.getByRole('link', { name: 'ShoppingCart' }).click();
  }
}
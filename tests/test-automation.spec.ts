import { test } from '@playwright/test';
import { AccountKeywords } from '../src/keywords/account.keywords';
import { ShoppingKeywords } from '../src/keywords/shopping.keywords';
import { UserKeywords } from '../src/keywords/user.keywords';

test('Scenario 1 - Register customer and purchase product', async ({ page }) => {
    const account = new AccountKeywords(page);
    const shopping = new ShoppingKeywords(page);
    const user = new UserKeywords(page, 'newCustomer');

    user.generateRandomizedUser();

    const username = user.getUsername();
    const password = user.getPassword();
    const shoppingList = user.getShoppingList();
    const paymentData = user.getPaymentData();

    // Open Homepage of shopping site
    await user.openShoppingPage();
    await user.verifySiteTitle();
    await account.verifyNoCustomerIsLoggedIn();

    // Step 1: Registration of new user
    await account.registerNewCustomer(user.getRegistrationData());
    await account.verifyRegistrationIsPossible();
    await account.finishRegistration();
    await account.verifyRegistrationSuccess();
    await account.verifyCustomerIsLoggedIn(username);

    await user.openShoppingPage();

    // Step 2: Login newly registrated user
    await account.loginAsCustomer(username, password);
    await account.verifyCustomerIsLoggedIn(username);

    // Step 3: Select 1 product and add to shopping cart
    await shopping.addShoppingListToCart(shoppingList);
    await shopping.openShoppingCart();
    await shopping.verifyProductCount(shoppingList, 1);
    await shopping.verifyAllProductsComplete(shoppingList);

    // Step 4: Pay for selected product
    await shopping.checkoutShoppingCart();
    await shopping.selectShipping();
    await shopping.fillinPaymentData(paymentData)
    await shopping.verifyPaymentIsPossible();
    await shopping.finishPurchase();
    await shopping.verifyPurchaseSuccessfull();

    // Step 5: Logout user
    await account.logoutCustomer();
    await account.verifyNoCustomerIsLoggedIn();
});

test('Scenario 2 - Purchase three products', async ({ page }) => {
    const account = new AccountKeywords(page);
    const shopping = new ShoppingKeywords(page);
    const user = new UserKeywords(page, 'existingCustomer');

    const username = user.getUsername();
    const password = user.getPassword();
    const shoppingList = user.getShoppingList();
    const paymentData = user.getPaymentData();

    // Open Homepage of shopping site
    await user.openShoppingPage();
    await user.verifySiteTitle();
    await account.verifyNoCustomerIsLoggedIn();

    // Step 1: Login user
    await account.loginAsCustomer(username, password);
    await account.verifySuccessfulLogin();
    await account.verifyCustomerIsLoggedIn(username);

    // Step 2: Select 3 products and add to shopping cart
    await shopping.addShoppingListToCart(shoppingList);
    await shopping.openShoppingCart();
    await shopping.verifyProductCount(shoppingList, 3);
    await shopping.verifyAllProductsComplete(shoppingList);

    // Step 3: Pay for selected product
    await shopping.checkoutShoppingCart();
    await shopping.selectShipping();
    await shopping.fillinPaymentData(paymentData)
    await shopping.verifyPaymentIsPossible();
    await shopping.finishPurchase();
    await shopping.verifyPurchaseSuccessfull();

    // Step 4: Logout user
    await account.logoutCustomer();
    await account.verifyNoCustomerIsLoggedIn();
});
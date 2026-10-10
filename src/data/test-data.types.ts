export interface CustomerTestDataCsv {
    testCase: string;
    usernamePrefix: string;
    emailDomain: string;
    password: string;
    product1: string;
    product2: string;
    product3: string;
    paymentMethod: string;
    safepayUsername: string;
    safepayPassword: string;
    cardNumber: string;
    cvv: string;
    expiryMonth: string;
    expiryYear: string;
    cardholderName: string;
}

export interface ShoppingListItem {
    productName: string;
    quantity: number;
}

export type PaymentMethod =
    | 'Safepay'
    | 'CreditCard';

export interface PaymentData {
    paymentMethod: string;
    safepayUsername: string;
    safepayPassword: string;
    cardNumber: string;
    cvv: string;
    expiryMonth: string;
    expiryYear: string;
    cardholderName: string;
}

export interface CustomerTestData {
    testCase: string;
    usernamePrefix: string;
    emailDomain: string;
    password: string;
    shoppingList: ShoppingListItem[];
    paymentData: PaymentData;
}
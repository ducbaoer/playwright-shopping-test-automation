import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

import {CustomerTestData, CustomerTestDataCsv, ShoppingListItem } from './test-data.types';


function createShoppingList(products: string[]): ShoppingListItem[] {
    const productQuantities = new Map<string, number>();

    for (const product of products) {
        if (!product) {
            continue;
        }

        const currentQuantity = productQuantities.get(product) ?? 0;

        productQuantities.set(product, currentQuantity + 1);
    }

    return Array.from(productQuantities, ([productName, quantity]) => ({
            productName,
            quantity
        })
    );
}


export function getCustomerTestData(testCase: string): CustomerTestData {

    const filePath = path.resolve('data/testdata.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const records: CustomerTestDataCsv[] = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });

    const testData = records.find(record => record.testCase === testCase);

    if (!testData) {
        throw new Error(
            `No test data found for test case "${testCase}"`
        );
    }

    return {
        testCase: testData.testCase,
        usernamePrefix: testData.usernamePrefix,
        emailDomain: testData.emailDomain,
        password: testData.password,

        shoppingList: createShoppingList([
            testData.product1,
            testData.product2,
            testData.product3
        ]),
        paymentData:{
            paymentMethod: testData.paymentMethod,
            safepayUsername: testData.safepayUsername,
            safepayPassword: testData.safepayPassword,
            cardNumber: testData.cardNumber,
            cvv: testData.cvv,
            expiryMonth: testData.expiryMonth,
            expiryYear: testData.expiryYear,
            cardholderName: testData.cardholderName
        }
    };
}
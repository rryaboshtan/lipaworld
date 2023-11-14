import { describe, expect, test } from 'vitest';
import { ERetailStatus, IMerchant } from '../../src/types/IMerchant';

describe('IMerchant interface', () => {
  test('has countryCode property', () => {
    const merchant: IMerchant = {
      countryCode: 'US',
      merchantId: '123',
      merchantName: 'My Merchant',
      categories: ['Category 1', 'Category 2'],
      subCategories: ['Subcategory 1', 'Subcategory 2'],
      retailStatus: ERetailStatus.Active,
      merchantLogo: 'https://example.com/logo.png',
      createdOn: new Date(),
      updatedOn: new Date(),
      createdBy: 'John Doe',
      updatedBy: 'Jane Doe',
    };
    expect(merchant.countryCode).equal('US');
  });

  test('has merchantId property', () => {
    const merchant: IMerchant = {
      countryCode: 'US',
      merchantId: '123',
      merchantName: 'My Merchant',
      categories: ['Category 1', 'Category 2'],
      subCategories: ['Subcategory 1', 'Subcategory 2'],
      retailStatus: ERetailStatus.Active,
      merchantLogo: 'https://example.com/logo.png',
      createdOn: new Date(),
      updatedOn: new Date(),
      createdBy: 'John Doe',
      updatedBy: 'Jane Doe',
    };
    expect(merchant.merchantId).equal('123');
  });

  test('has merchantName property', () => {
    const merchant: IMerchant = {
      countryCode: 'US',
      merchantId: '123',
      merchantName: 'My Merchant',
      categories: ['Category 1', 'Category 2'],
      subCategories: ['Subcategory 1', 'Subcategory 2'],
      retailStatus: ERetailStatus.Active,
      merchantLogo: 'https://example.com/logo.png',
      createdOn: new Date(),
      updatedOn: new Date(),
      createdBy: 'John Doe',
      updatedBy: 'Jane Doe',
    };
    expect(merchant.merchantName).equal('My Merchant');
  });
});

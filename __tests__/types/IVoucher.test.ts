import { describe, expect, test } from 'vitest';
import {
  ERetailStatus,
  ERedemptionStatus,
  IVoucher,
} from '../../src/types/IVoucher';

describe('IVoucher interface', () => {
  test('has categories property', () => {
    const voucher: IVoucher = {
      categories: ['Category 1', 'Category 2'],
      createdBy: 'John Doe',
      createdOn: new Date(),
      expiresOn: new Date('2026-07-29'),
      dealId: '124',
      merchantName: 'My Merchant',
      merchantId: '456',
      partnerName: 'My Partner',
      partnerId: '789',
      voucherDescription: 'My voucher description',
      voucherImageUrl: 'https://example.com/voucher.png',
      voucherName: 'My Voucher',
      redemptionCountryCode: 'US',
      redemptionCurrency: 'USD',
      redemptionStatus: ERedemptionStatus.Active,
      redemptionValues: [10, 20, 30],
      retailStatus: ERetailStatus.Active,
      serialNumber: 'ABC123',
      subCategories: ['Subcategory 1', 'Subcategory 2'],
      termsAndConditions: 'My terms and conditions',
      updatedBy: 'John Doe',
      version: 1,
    };
    expect(voucher.categories).toEqual(['Category 1', 'Category 2']);
  });

  test('has createdBy property', () => {
    const voucher: IVoucher = {
      categories: ['Category 1', 'Category 2'],
      createdBy: 'John Doe',
      createdOn: new Date(),
      expiresOn: new Date('2026-07-29'),
      dealId: '123',
      merchantName: 'My Merchant',
      merchantId: '456',
      partnerName: 'My Partner',
      partnerId: '789',
      voucherDescription: 'My voucher description',
      voucherImageUrl: 'https://example.com/voucher.png',
      voucherName: 'My Voucher',
      redemptionCountryCode: 'US',
      redemptionCurrency: 'USD',
      redemptionStatus: ERedemptionStatus.Active,
      redemptionValues: [10, 20, 30],
      retailStatus: ERetailStatus.Active,
      serialNumber: 'ABC123',
      subCategories: ['Subcategory 1', 'Subcategory 2'],
      termsAndConditions: 'My terms and conditions',
      updatedBy: 'John Doe',
      version: 1,
    };
    expect(voucher.createdBy).toEqual('John Doe');
  });

  test('has createdOn property', () => {
    const createdOn = new Date();
    const voucher: IVoucher = {
      categories: ['Category 1', 'Category 2'],
      createdBy: 'John Doe',
      createdOn: new Date(),
      expiresOn: new Date('2026-07-29'),
      dealId: '122',
      merchantName: 'My Merchant',
      merchantId: '456',
      partnerName: 'My Partner',
      partnerId: '789',
      voucherDescription: 'My voucher description',
      voucherImageUrl: 'https://example.com/voucher.png',
      voucherName: 'My Voucher',
      redemptionCountryCode: 'US',
      redemptionCurrency: 'USD',
      redemptionStatus: ERedemptionStatus.Active,
      redemptionValues: [10, 20, 30],
      retailStatus: ERetailStatus.Active,
      serialNumber: 'ABC123',
      subCategories: ['Subcategory 1', 'Subcategory 2'],
      termsAndConditions: 'My terms and conditions',
      updatedBy: 'John Doe',
      version: 1,
    };
    expect(voucher.createdOn).toEqual(createdOn);
  });
});

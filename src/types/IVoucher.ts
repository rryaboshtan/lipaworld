export enum ERetailStatus {
  Active,
  Inactive,
  Expired,
}

export enum ERedemptionStatus {
  Active,
  Expired,
  Used,
}

export interface IVoucher {
  categories: string[];
  countryCode: string;
  createdBy: string;
  createdOn: Date;
  expiresOn: Date;
  dealId: string;
  merchantName: string;
  merchantId: string;
  partnerName: string;
  partnerId: string;
  voucherDescription: string;
  voucherImageUrl: string;
  voucherName: string;
  redemptionCountryCode: string;
  redemptionCurrency: string;
  redemptionValues: number[];
  redemptionType: string;
  retailStatus: ERetailStatus;
  serialNumber: string;
  subCategories: string[];
  updatedBy: string;
  version: number;
  partnerProductId: string;
  status: string;
  redemptionInput: string;
  transactionFee: number | string;
  customAmount: number;
  minimumAmount: number;
  redemptionInstructions: string;
  terms: string;
  recipientMobileNumber?: string;
  recipientMeterNumber?: string;
}

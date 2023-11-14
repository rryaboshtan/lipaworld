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
  redemptionStatus: ERedemptionStatus;
  redemptionValues: number[];
  retailStatus: ERetailStatus;
  serialNumber: string;
  subCategories: string[];
  termsAndConditions: string;
  updatedBy: string;
  version: number;
}

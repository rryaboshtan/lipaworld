export enum ERetailStatus {
  Active,
  Inactive,
  Expired,
}

export interface IMerchant {
  countryCode: string;
  merchantId: string;
  merchantName: string;
  categories: string[];
  subCategories: string[];
  retailStatus: ERetailStatus;
  merchantLogo: string;
  createdOn: string;
  updatedOn: string;
  createdBy: string;
  updatedBy: string;
}

export interface ITransaction {
  transactionId: string;
  senderId?: string;
  recipientIds?: string[];
  cartId?: string;
  exchangeRate?: number;
  exchangeRateId?: string;
  redemptionCountryCode?: string;
  redemptionCountryName?: string;
  redemptionCurrency?: string;
  purchaseCurrencyRate?: number;
  purchaseCountryCode?: string;
  purchaseCountryName?: string;
  purchaseCurrency?: string;
  transactionFee?: number;
  cartTotalAmount?: number;
  processingFee?: number;
}

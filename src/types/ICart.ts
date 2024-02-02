import { IVoucher } from './IVoucher';
import { IRecipient } from './IRecipient';

export interface ICartItem {
  voucherId: string;
  redemptionUnitValue: number;
  quantity: number;
  deal: IVoucher;
  cartItemId: string;
  recipientId?: string;
  productRecipient: IRecipient | null | undefined;
  error?: string;
  vouchers?: { pin: string };
}

export interface ICart {
  cartId: string;
  cartItems: ICartItem[];
  createdOn: string;
  updatedOn: string;
  createdBy: string;
  updatedBy: string;
}

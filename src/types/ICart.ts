import { IVoucher } from './IVoucher';

export interface ICartItem {
  voucherId: string;
  redemptionUnitValue: number;
  quantity: number;
  deal: IVoucher;
  cartItemId: string;
  recipientId?: string;
}

export interface ICart {
  cartId: string;
  cartItems: ICartItem[];
  createdOn: string;
  updatedOn: string;
  createdBy: string;
  updatedBy: string;
}

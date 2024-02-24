import { IVoucher } from './IVoucher';

export interface IList {
  id: string;
  listName: string;
  listType: ListType;
  accessParameter: AccessParameter;
  // description: string
  keepPurchased: boolean;
  recipientId: string;
  senderId?: string | null;
  vouchers: IVoucher[];
}

export type ListType = 'Me' | 'Organization' | 'Select the type';
export type AccessParameter =
  | 'Can edit'
  | 'View only'
  | 'Select access parameters';

export interface IRecipient {
  id?: string;
  name?: string;
  surname?: string;
  country?: string;
  countryCode: string;
  mobileNumber: string;
  senderId?: string | null;
}
export interface IRecipientState {
  recipients: IRecipient[];
  dispatch: React.Dispatch<any>;
}

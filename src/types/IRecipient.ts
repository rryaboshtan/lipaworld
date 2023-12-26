export interface IRecipient {
  id?: string;
  active?: boolean;
  name: string;
  surname: string;
  email?: string;
  country: string;
  countryCode: string;
  mobileNumber: string;
  senderId?: string | null;
  electricityMeterNumber?: string;
  waterMeterNumber?: string;
  gasMeterNumber?: string;
}
export interface IRecipientState {
  recipients: IRecipient[];
  dispatch: React.Dispatch<any>;
}

import React, { createContext, useReducer, ReactNode } from 'react';

type PaymentState = {
  error: string[];
  session: string | null;
  orderRef: string | null;
  paymentDataStoreRes: string[] | null;
  config: {
    storePaymentMethod: boolean;
    paymentMethodsConfiguration: {
      ideal: {
        showImage: boolean;
      };
      card: {
        hasHolderName: boolean;
        holderNameRequired: boolean;
        name: string;
        amount: {
          value: number;
          currency: string;
        };
      };
    };
    locale: string;
    showPayButton: boolean;
    clientKey: string;
    environment: string;
  };
};

type PaymentAction =
  | { type: 'paymentSession'; payload: [string[], number] }
  | { type: 'clearPaymentSession' }
  | { type: 'paymentDataStore'; payload: [string[], number] }
  | { type: 'initiateCheckout'; payload: string };

type PaymentContextType = {
  payment: PaymentState;
  dispatch: React.Dispatch<PaymentAction>;
  initiateCheckout: (type: string) => Promise<void>;
  getPaymentDataStore: () => Promise<void>;
  cancelOrRefundPayment: (orderRef: string) => Promise<void>;
  clearPaymentSession: () => void;
};

const initialState: PaymentState = {
  error: [''],
  session: null,
  orderRef: null,
  paymentDataStoreRes: null,
  config: {
    storePaymentMethod: true,
    paymentMethodsConfiguration: {
      ideal: {
        showImage: true,
      },
      card: {
        hasHolderName: true,
        holderNameRequired: true,
        name: 'Credit or debit card',
        amount: {
          value: 10000, // 100€ in minor units
          currency: 'EUR',
        },
      },
    },
    locale: 'en_US',
    showPayButton: true,
    clientKey: process.env.NEXT_PUBLIC_ADYEN_API_KEY || '',
    environment: 'TEST',
  },
};

const paymentReducer = (
  state: PaymentState,
  action: PaymentAction
): PaymentState => {
  switch (action.type) {
    case 'paymentSession':
      const [res, status] = action.payload;
      if (status >= 300) {
        return { ...state, error: res };
      } else {
        return { ...state, session: res[0], orderRef: res[1], error: [''] };
      }
    case 'clearPaymentSession':
      return { ...initialState };
    case 'paymentDataStore':
      const [res2, status2] = action.payload;
      if (status2 >= 300) {
        return { ...state, error: res2 };
      } else {
        return { ...state, paymentDataStoreRes: res2, error: [''] };
      }
    default:
      return state;
  }
};

export const PaymentContext = createContext<PaymentContextType>({
  payment: initialState,
  dispatch: () => {},
  initiateCheckout: async () => {},
  getPaymentDataStore: async () => {},
  cancelOrRefundPayment: async () => {},
  clearPaymentSession: () => {},
});

type PaymentProviderProps = {
  children: ReactNode;
};

export const PaymentProvider = ({ children }: PaymentProviderProps) => {
  const [paymentState, dispatch] = useReducer(paymentReducer, initialState);

  const initiateCheckout = async (type: string) => {
    console.log('initiateCheckout', type);
    const response = await fetch(`/api/sessions?type=${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: 'paymentSession',
      payload: [await response.json(), response.status],
    });
  };

  const getPaymentDataStore = async () => {
    const response = await fetch('/api/getPaymentDataStore');
    dispatch({
      type: 'paymentDataStore',
      payload: [await response.json(), response.status],
    });
  };

  const cancelOrRefundPayment = async (orderRef: string) => {
    await fetch(`/api/cancelOrRefundPayment?orderRef=${orderRef}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    getPaymentDataStore();
  };

  const clearPaymentSession = () => {
    dispatch({ type: 'clearPaymentSession' });
  };

  const value = {
    payment: paymentState,
    dispatch,
    initiateCheckout,
    getPaymentDataStore,
    cancelOrRefundPayment,
    clearPaymentSession,
  };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

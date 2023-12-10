import {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
} from 'react';
import { ITransaction } from '@/types';

// Define the type for the transactions state
// type TransactionState = ITransaction | {};
// type TransactionState = ITransaction | null;

type TransactionState = {
  senderId: string | null | undefined;
  recipientIds: string[];
  transactionId?: string;
  cartId?: string;
  redemptionCountryCode?: string;
  redemptionCountryName?: string;
  purchaseCurrency?: string;
  exchangeRate?: number;
  purchaseCountryCode?: string;
  purchaseCountryName?: string;
  redemptionCurrency?: string;
  transactionFee?: number;
  cartTotalAmount?: number;
  exchangeRateId?: string;
} | null;

// Define the type for the transactions action
type TransactionAction =
  | {
      type: 'SET_TRANSACTION';
      payload: TransactionState; // The new transactions data
    }
  | {
      type: 'SET_TRANSACTION_ID';
      payload: string; // The new transactions id
    }
  | {
      type: 'SET_CART_ID';
      payload: string; // The new transactions id
    }
  | {
      type: 'SET_USDZAR_RATE';
      payload: { exchangeRate: number; exchangeRateId: string }; // The new rate
    }
  | {
      type: 'UPDATE_AMOUNTS';
      payload: {
        processingFee: number;
        cartTotalAmount: number;
        transactionFee: number;
      };
    }
  | {
      type: 'UPDATE_PARTIES';
      payload: { senderId: string | null | undefined; recipientIds: string[] };
    }
  | {
      type: 'CREATE_TRANSACTION';
      payload: Omit<ITransaction, 'id' | 'createdOn'> & {
        id?: string;
        createdOn?: Date;
      }; // The new transaction data
    }
  | {
      type: 'UPDATE_TRANSACTION';
      payload: ITransaction; // The updated transaction data
    };

// Create the transactions state context with a default value as initial value
const TransactionStateContext = createContext<TransactionState>(null);

// Create the transactions dispatch context with a dummy function as initial value
const TransactionDispatchContext = createContext<Dispatch<TransactionAction>>(
  () => null
);

// Define the reducer function for the transactions context
const reducer = (state: TransactionState | null, action: TransactionAction) => {
  if (state === null) {
    return state;
  }
  // const reducer = (state: TransactionState, action: TransactionAction) => {
  switch (action.type) {
    case 'SET_TRANSACTION':
      // Return the new transactions data as the state
      return action.payload;
    case 'SET_TRANSACTION_ID':
      // Return state with the new transaction id
      return {
        ...state,
        transactionId: action.payload,
      };
    case 'SET_CART_ID':
      // Return state with the new transaction id
      return {
        ...state,
        cartId: action.payload,
      };
    case 'SET_USDZAR_RATE':
      // Return state with the new exchange rate
      return {
        ...state,
        exchangeRate: action.payload.exchangeRate,
        exchangeRateId: action.payload.exchangeRateId,
      };
    case 'UPDATE_AMOUNTS':
      // Return state with the new exchange rate
      return {
        ...state,
        processingFee: action.payload.processingFee,
        cartTotalAmount: action.payload.cartTotalAmount,
        transactionFee: action.payload.transactionFee,
      };
    case 'UPDATE_PARTIES':
      // Return state with the new exchange rate
      return {
        ...state,
        senderId: action.payload.senderId,
        recipientIds: action.payload.recipientIds,
      };
    case 'CREATE_TRANSACTION':
      // Return a new state with the new transaction added to the list
      return {
        ...state,
        ...action.payload,
      };
    case 'UPDATE_TRANSACTION':
      // Return a new state with the transaction updated with the new data
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};

// Define the interface for the transactions provider props
interface TransactionProviderProps {
  children: ReactNode;
}

const defaultTransaction: TransactionState = {
  transactionId: 't',
  senderId: 'x',
  recipientIds: ['y'],
  cartId: 'c',
  redemptionCountryCode: 'ZA',
  redemptionCountryName: 'South Africa',
  purchaseCurrency: 'USD',
  exchangeRate: 1,
  purchaseCountryCode: 'US',
  purchaseCountryName: 'United States',
  redemptionCurrency: 'ZAR',
  transactionFee: 0,
  cartTotalAmount: 0,
  exchangeRateId: 'x',
};

// Define the interface for the transactions provider props
interface TransactionProviderProps {
  children: ReactNode;
}

// Create a custom provider component that wraps the children with the transactions context
export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  // Use reducer to manage the transactions state and dispatch actions

  // eslint-disable-next-line
  const [state, dispatch] = useReducer(reducer, defaultTransaction);
  // const [state, dispatch] = useReducer(reducer, null as TransactionState);
  // const [state, dispatch] = useReducer(
  //   reducer,
  //   defaultTransaction as TransactionState
  // );

  return (
    <TransactionDispatchContext.Provider value={dispatch}>
      <TransactionStateContext.Provider value={state}>
        {children}
      </TransactionStateContext.Provider>
    </TransactionDispatchContext.Provider>
  );
};

// Export a custom hook that returns the transactions data from the context
export const useTransaction = () => useContext(TransactionStateContext);

// Export a custom hook that returns the dispatch function from the context
export const useDispatchTransaction = () =>
  useContext(TransactionDispatchContext);

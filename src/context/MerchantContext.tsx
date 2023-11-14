import {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
} from 'react';
import { IMerchant, ERetailStatus } from '@/types';
import products from '@/data/denomination_lipaworld.json';
import { v4 as uuid } from 'uuid';

// Define the type for the merchants state
type MerchantsState = IMerchant[];

// Define the type for the merchants action
type MerchantsAction =
  | {
      type: 'SET_MERCHANTS';
      payload: MerchantsState; // The new merchants data
    }
  | {
      type: 'CREATE_MERCHANT';
      payload: IMerchant; // The new merchant data
    }
  | {
      type: 'ADD_MERCHANT';
      payload: IMerchant; // The existing merchant data
    }
  | {
      type: 'UPDATE_MERCHANT';
      payload: IMerchant; // The updated merchant data
    }
  | {
      type: 'DELETE_MERCHANT';
      payload: string; // The id of the merchant to delete
    }
  | {
      type: 'REMOVE_MERCHANT';
      payload: string; // The id of the merchant to remove
    };

// Create the merchants state context with a default value as initial value
const MerchantsStateContext = createContext<MerchantsState>([]);

// Create the merchants dispatch context with a dummy function as initial value
const MerchantsDispatchContext = createContext<Dispatch<MerchantsAction>>(
  () => null
);

// Define the reducer function for the merchants context
const reducer = (state: MerchantsState, action: MerchantsAction) => {
  switch (action.type) {
    case 'SET_MERCHANTS':
      // Return the new merchants data as the state
      return action.payload;
    case 'CREATE_MERCHANT':
      // Generate a random id for the new merchant
      action.payload.merchantId = uuid();
      action.payload.createdOn = new Date().toUTCString();
      // Return a new state with the new merchant added to the array
      return [...state, action.payload];
    case 'ADD_MERCHANT':
      // Check if the merchant already exists in the state by id
      const exists = state.some(
        (m) => m.merchantId === action.payload.merchantId
      );
      // If not, return a new state with the merchant added to the array
      if (!exists) {
        return [...state, action.payload];
      }
      // Otherwise, return the same state without any changes
      return state;
    case 'UPDATE_MERCHANT':
      // Find the index of the merchant in the state by id
      const index = state.findIndex(
        (m) => m.merchantId === action.payload.merchantId
      );
      // If found, return a new state with the merchant updated with the new data
      if (index !== -1) {
        return state.map((m, i) => (i === index ? action.payload : m));
      }
      // Otherwise, return the same state without any changes
      return state;
    case 'DELETE_MERCHANT':
      // TODO: Add some logic to delete the merchant from a database or an API

      // Return a new state with the merchant filtered out by id from the array
      return state.filter((m) => m.merchantId !== action.payload);
    case 'REMOVE_MERCHANT':
      // Return a new state with the merchant filtered out by id from the array
      return state.filter((m) => m.merchantId !== action.payload);
    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};

// Define the interface for the merchants provider props
interface MerchantsProviderProps {
  children: ReactNode;
}

const parsedProducts = JSON.parse(JSON.stringify(products));

const mappedMerchants = parsedProducts.map((product: any) => {
  return {
    ...product,
    merchantId: product.merchant_id,
    categories: [product.category],
    merchantName: product.merchant_name,
    countryCode: 'ZA',
    status: ERetailStatus.Active,
  };
});

// Create a custom provider component that wraps the children with the merchants context
export const MerchantsProvider = ({ children }: MerchantsProviderProps) => {
  // Use reducer to manage the merchants state and dispatch actions
  const [state, dispatch] = useReducer(reducer, mappedMerchants);
  return (
    <MerchantsDispatchContext.Provider value={dispatch}>
      <MerchantsStateContext.Provider value={state}>
        {children}
      </MerchantsStateContext.Provider>
    </MerchantsDispatchContext.Provider>
  );
};

// Export a custom hook that returns the merchants data from the context
export const useMerchants = () => useContext(MerchantsStateContext);

// Export a custom hook that returns the dispatch function from the context
export const useDispatchMerchants = () => useContext(MerchantsDispatchContext);

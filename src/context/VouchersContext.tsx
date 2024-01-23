import {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  useEffect,
} from 'react';
import { IVoucher } from '@/types';
import products from '@/data/denomination_lipaworld.json';
import { v4 as uuid } from 'uuid';

// Define the type for the vouchers state
type VouchersState = IVoucher[];

// Define the type for the vouchers action
type VouchersAction =
  | {
      type: 'SET_VOUCHERS';
      payload: VouchersState; // The new vouchers data
    }
  | {
      type: 'CREATE_VOUCHER';
      payload: IVoucher; // The new voucher data
    }
  | {
      type: 'ADD_VOUCHER';
      payload: IVoucher; // The existing voucher data
    }
  | {
      type: 'UPDATE_VOUCHER';
      payload: IVoucher; // The updated voucher data
    }
  | {
      type: 'DELETE_VOUCHER';
      payload: string; // The id of the voucher to delete
    }
  | {
      type: 'REMOVE_VOUCHER';
      payload: string; // The id of the voucher to remove
    };

// Create the vouchers state context with a default value as initial value
const VouchersStateContext = createContext<VouchersState>([]);

// Create the vouchers dispatch context with a dummy function as initial value
const VouchersDispatchContext = createContext<Dispatch<VouchersAction>>(
  () => null
);

// Define the reducer function for the vouchers context
const reducer = (state: VouchersState, action: VouchersAction) => {
  switch (action.type) {
    case 'SET_VOUCHERS':
      // Return the new vouchers data as the state
      return action.payload;
    case 'CREATE_VOUCHER':
      // Generate a random id for the new voucher
      action.payload.dealId = uuid();
      action.payload.createdOn = new Date();
      // Return a new state with the new voucher added to the array
      return [...state, action.payload];
    case 'ADD_VOUCHER':
      // Check if the voucher already exists in the state by id
      const exists = state.some((v) => v.dealId === action.payload.dealId);
      // If not, return a new state with the voucher added to the array
      if (!exists) {
        return [...state, action.payload];
      }
      // Otherwise, return the same state without any changes
      return state;
    case 'UPDATE_VOUCHER':
      // Find the index of the voucher in the state by id
      const index = state.findIndex((v) => v.dealId === action.payload.dealId);
      // If found, return a new state with the voucher updated with the new data
      if (index !== -1) {
        return state.map((v, i) => (i === index ? action.payload : v));
      }
      // Otherwise, return the same state without any changes
      return state;
    case 'DELETE_VOUCHER':
      // TODO: Add some logic to delete the voucher from a database or an API

      // Return a new state with the voucher filtered out by id from the array
      return state.filter((v) => v.dealId !== action.payload);
    case 'REMOVE_VOUCHER':
      // Return a new state with the voucher filtered out by id from the array
      return state.filter((v) => v.dealId !== action.payload);
    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};

// Define the interface for the vouchers provider props
interface VouchersProviderProps {
  children: ReactNode;
}

const parsedProducts: any = JSON.parse(JSON.stringify(products));

const activeProducts = parsedProducts.filter(
  (product: any) => product.status === 'Active'
);

const mappedProducts: IVoucher[] = activeProducts.map((product: any) => ({
  merchantId: product.merchant_id,
  categories: [product.category],
  merchantName: product.merchant_name,
  countryCode: 'ZA',
  dealId: product.product_id,
  partnerProductId: product.partner_product_id,
  status: product.status,
  redemptionInput: product.redemption_input,
  redemptionType: product.redemption_type,
  transactionFee: product.transaction_fee,
  customAmount: product.custom_amount,
  minimumAmount: product.minimum_amount,
  maximumAmount: product.maximum_amount,
  redemptionInstructions: product.redemption_instructions,
  terms: product.terms,
  partnerName: product.channel_partner,
  partnerId: product.partner_id,
  voucherDescription: product.description,
  voucherName: `${product.product_name} Voucher`,
  voucherImageUrl:
    product.voucher_image?.length > 0
      ? product.voucher_image
      : '/partners/img/1voucher.png',
  redemptionCountryCode: 'ZA',
  redemptionCurrency: 'ZAR',
  redemptionValues: [product.zar * 100],
}));

// Create a custom provider component that wraps the children with the vouchers context
export const VouchersProvider = ({ children }: VouchersProviderProps) => {
  // Use reducer to manage the vouchers state and dispatch actions
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_VOUCHERS_URL}/inventory`)
      .then((response) => response.json())
      .then((availableInventory) => {
        const updatedProducts = mappedProducts.map((product) => {
          // Check if the partnerName is 'Stellr' or 'Payment24' and the dealId is not in the availableInventory
          if (
            (product.partnerName === 'Stellr' ||
              product.partnerName === 'Payment 24') &&
            !availableInventory.includes(product.dealId)
          ) {
            // Change the status to 'OutOfStock'
            return { ...product, status: 'OutOfStock' };
          }
          // Return the product without changes
          return product;
        });

        dispatch({ type: 'SET_VOUCHERS', payload: updatedProducts });
      });
  }, []);

  return (
    <VouchersDispatchContext.Provider value={dispatch}>
      <VouchersStateContext.Provider value={state}>
        {children}
      </VouchersStateContext.Provider>
    </VouchersDispatchContext.Provider>
  );
};

// Export a custom hook that returns the vouchers data from the context
export const useVouchers = () => useContext(VouchersStateContext);

// Export a custom hook that returns the dispatch function from the context
export const useDispatchVouchers = () => useContext(VouchersDispatchContext);

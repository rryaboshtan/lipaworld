import {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
} from 'react';
import { ICartItem, ICart } from '@/types';

type CartState = ICart;
type CartItemsState = ICartItem[];

// Define the type for the cart items action
type CartAction =
  | {
      type: 'SET_CART_ITEMS';
      payload: CartItemsState; // The new cart items data
    }
  | {
      type: 'ADD_CART_ITEM';
      payload: ICartItem; // The new cart item data
    }
  | {
      type: 'SET_CART_ID';
      payload: string; // The new cart id
    }
  | {
      type: 'REMOVE_CART_ITEM';
      payload: string; // The id of the cart item to remove
    };

const CartStateContext = createContext<CartState | null>(null);
// Create the cart items state context with an empty array as initial value
const CartItemsStateContext = createContext<CartItemsState>([]);

// Create the cart items dispatch context with a dummy function as initial value
const CartDispatchContext = createContext<Dispatch<CartAction>>(() => null);

// Define the reducer function for the cart items context
const reducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case 'SET_CART_ITEMS':
      // Return the new cart items data as the state
      return { ...state, cartItems: action.payload };
    case 'ADD_CART_ITEM':
      // Generate a random id for the new cart item
      action.payload.cartItemId = Math.random().toString(36);
      // Return a new state with the new cart item added to the array
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        updatedOn: new Date().toUTCString(),
        updatedBy: 'x',
      };
    case 'REMOVE_CART_ITEM':
      // Return a new state with the cart item filtered out by id from the array
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (c: ICartItem) => c.cartItemId !== action.payload
        ),
        updatedOn: new Date().toUTCString(),
        updatedBy: 'x',
      };
    case 'SET_CART_ID':
      // Return a new state with the cart item filtered out by id from the array
      return {
        ...state,
        cartId: action.payload,
      };
    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};

// Define the interface for the cart items provider props
interface CartItemsProviderProps {
  children: ReactNode;
}

// Create a custom provider component that wraps the children with the cart items context
export const CartProvider = ({ children }: CartItemsProviderProps) => {
  // Use reducer to manage the cart items state and dispatch actions
  const [state, dispatch] = useReducer(reducer, {
    cartId: 'i',
    cartItems: [],
    createdOn: new Date().toUTCString(),
    updatedOn: new Date().toUTCString(),
    createdBy: 'u',
    updatedBy: 'u',
  });
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Export a custom hook that returns the cart items data from the context
export const useCart = () => useContext(CartStateContext);

// Export a custom hook that returns the dispatch function from the context
export const useDispatchCart = () => useContext(CartDispatchContext);

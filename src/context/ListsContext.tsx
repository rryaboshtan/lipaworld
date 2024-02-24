import { Lists } from '@/data/mockLists';
import { IList, IRecipient, IVoucher } from '@/types';
import { List } from '@material-ui/core';
import {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
} from 'react';

// Define the interface for the list data
// interface IRecipientResponse {
//   recipientId: string;
//   email?: string;
// }

// Define the type for the lists state
type ListsState = IList[];

// Define the type for the lists action
type ListsAction =
  // | {
  //     type: 'CREATE_RECIPIENT';
  //     payload: IList; // The new list data
  //   }
  | {
      type: 'ADD_LISTS';
      payload: IList[]; // The existing list data
    }
  | {
      type: 'ADD_LIST';
      payload: IList; // The existing list data
    }
  | {
      type: 'ADD_VOUCHER_TO_LIST';
      payload: { id: string; voucher: IVoucher }; // The existing list data
    }
  | {
      type: 'SELECT_LIST';
      payload: IList; // The selected list data
    }
  | {
      type: 'UPDATE_LIST';
      payload: IList; // The updated list data
    }
  | {
      type: 'DELETE_LIST';
      payload: string; // The id of the list to delete
    };

// Create the lists state context with an empty array as initial value
const ListsStateContext = createContext<ListsState>([]);

// Create the lists dispatch context with a dummy function as initial value
const ListsDispatchContext = createContext<Dispatch<ListsAction>>(() => null);

// Define the reducer function for the lists context
const reducer = (state: ListsState, action: ListsAction) => {
  switch (action.type) {
    // case 'CREATE_RECIPIENT':
    //   // Generate a random id for the new list
    //   // action.payload.id = uuid();
    //   // Return a new state with the new list added to the array
    //   return [...state, action.payload];
    // case 'ADD_LISTS':
    //   // Generate a random id for the new list
    //   // action.payload.id = uuid();
    //   // Return a new state with the new list added to the array
    //   return [...action.payload];
    case 'ADD_LIST':
      // Check if the list already exists in the state by id
      const exists = state.some((r) => r.listName === action.payload.listName);
      // If not, return a new state with the list added to the array
      if (!exists) {
        return [action.payload, ...state];
      } else {
        return state;
      }
    case 'ADD_LISTS':
      const lists: IList[] = [];
      action.payload.forEach((list) => {
        // Check if the list already exists in the state by id
        const exists = state.some((r) => r.listName === list.listName);
        // If not, return a new state with the list added to the array
        if (!exists) {
          lists.push(list);
        }
      });
      if (!action.payload) {
        return state;
      }
      return [...lists, ...state];

    case 'ADD_VOUCHER_TO_LIST':
      console.log('2222222222222222222222222');
      let index = state.findIndex((list) => list.id === action.payload.id);
      const voucherIndex = state[index].vouchers.findIndex(
        (voucher) => voucher.dealId === action.payload.voucher.dealId
      );
      if (voucherIndex === -1) {
        state[index].vouchers.push(action.payload.voucher);
      }
      // console.log("action.payload.voucher = ", action.payload.voucher)
      return state;

    case 'UPDATE_LIST':
      index = state.findIndex((list) => list.id === action.payload.id);
      state[index] = action.payload;
      return state;
    // case 'SELECT_RECIPIENT':
    //   // CHECK THE Action.payload, in state, move the supplied payload to the begining of the state array
    //   // Find the index of the list in the state by id
    //   const indexSelected = state.findIndex(
    //     (r) => r.listName === action.payload.listName
    //   );
    //   const newState = state.filter(
    //     (r) => r.listName !== action.payload.listName
    //   );
    //   // If found, return a new state with the list updated with the new data
    //   if (indexSelected !== -1) {
    //     return [action.payload, ...newState];
    //   } else {
    //     return state;
    //   }
    case 'DELETE_LIST':
      // TODO: Add some logic to delete the list from a database or an API
      // Return a new state with the list filtered out by id from the array
      return state.filter((r) => r.listName !== action.payload);
    default:
      console.log('Unknown action');
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};

// Define the interface for the lists provider props
interface ListsProviderProps {
  children: ReactNode;
}

const defaultLists: IList[] = Lists;

// Create a custom provider component that wraps the children with the lists context
export const ListsProvider = ({ children }: ListsProviderProps) => {
  // Use reducer to manage the lists state and dispatch actions
  const [state, dispatch] = useReducer(reducer, defaultLists);
  return (
    <ListsDispatchContext.Provider value={dispatch}>
      <ListsStateContext.Provider value={state}>
        {children}
      </ListsStateContext.Provider>
    </ListsDispatchContext.Provider>
  );
};

// Export a custom hook that returns the lists data from the context
export const useLists = () => useContext(ListsStateContext);

// Export a custom hook that returns the dispatch function from the context
export const useDispatchLists = () => useContext(ListsDispatchContext);

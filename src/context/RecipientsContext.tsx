import {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
} from 'react';
// import { v4 as uuid } from 'uuid';

// Define the interface for the recipient data
interface IRecipient {
  id?: string;
  name?: string;
  surname?: string;
  country?: string;
  countryCode: string;
  mobileNumber: string;
  senderId?: string | null;
}
interface IRecipientResponse {
  recipientId: string;
  email?: string;
}

// Define the type for the recipients state
type RecipientsState = IRecipient[];

// Define the type for the recipients action
type RecipientsAction =
  | {
      type: 'CREATE_RECIPIENT';
      payload: IRecipient; // The new recipient data
    }
  | {
      type: 'ADD_RECIPIENTS';
      payload: IRecipient[]; // The existing recipient data
    }
  | {
      type: 'ADD_RECIPIENT';
      payload: IRecipient; // The existing recipient data
    }
  | {
      type: 'ADD_RECIPIENTS';
      payload: IRecipient[]; // The existing recipient data
    }
  | {
      type: 'SELECT_RECIPIENT';
      payload: IRecipient; // The selected recipient data
    }
  | {
      type: 'UPDATE_RECIPIENT';
      payload: IRecipient; // The updated recipient data
    }
  | {
      type: 'DELETE_RECIPIENT';
      payload: string; // The id of the recipient to delete
    }
  | {
      type: 'REMOVE_RECIPIENT';
      payload: string; // The id of the recipient to remove
    };

// Create the recipients state context with an empty array as initial value
const RecipientsStateContext = createContext<RecipientsState>([]);

// Create the recipients dispatch context with a dummy function as initial value
const RecipientsDispatchContext = createContext<Dispatch<RecipientsAction>>(
  () => null
);

// Define the reducer function for the recipients context
const reducer = (state: RecipientsState, action: RecipientsAction) => {
  switch (action.type) {
    case 'CREATE_RECIPIENT':
      // Generate a random id for the new recipient
      // action.payload.id = uuid();
      // Return a new state with the new recipient added to the array
      return [...state, action.payload];
    case 'ADD_RECIPIENTS':
      // Generate a random id for the new recipient
      // action.payload.id = uuid();
      // Return a new state with the new recipient added to the array
      return [...action.payload];
    case 'ADD_RECIPIENT':
      // Check if the recipient already exists in the state by id
      const exists1 = state.some(
        (r) =>
          r.name === action.payload.name &&
          r.surname === action.payload.surname &&
          r.countryCode === action.payload.countryCode &&
          r.mobileNumber === action.payload.mobileNumber &&
          r.senderId === action.payload.senderId
      );
      // If not, return a new state with the recipient added to the array
      if (!exists1) {
        // save to database
        return [action.payload, ...state];
      } else {
        console.log('Recipient already exists');
        // Otherwise, return the same state without any changes
        return state;
      }
    case 'ADD_RECIPIENTS':
      console.log('ADD_RECIPIENTS', action.payload);
      let recipientsList: IRecipient[] = [];
      action.payload.forEach((recipient) => {
        // Check if the recipient already exists in the state by id
        const exists = state.some(
          (r) =>
            r.name === recipient.name &&
            r.surname === recipient.surname &&
            r.countryCode === recipient.countryCode &&
            r.mobileNumber === recipient.mobileNumber &&
            r.senderId === recipient.senderId
        );
        // If not, return a new state with the recipient added to the array
        if (!exists) {
          // save to database
          recipientsList.push(recipient);
        }
      });
      // return [recipient, ...recipientsList];
      console.log('recipientsList', recipientsList);
      return [...recipientsList, ...state];

    case 'UPDATE_RECIPIENT':
      // Find the index of the recipient in the state by id
      const index = state.findIndex((r) => r.id === action.payload.id);

      // If found, return a new state with the recipient updated with the new data
      if (index !== -1) {
        return state.map((r, i) => (i === index ? action.payload : r));
      }
      // Otherwise, return the same state without any changes
      return state;
    case 'SELECT_RECIPIENT':
      // CHECK THE Action.payload, in state, move the supplied payload to the begining of the state array
      // Find the index of the recipient in the state by id
      const indexSelected = state.findIndex(
        (r) => r.mobileNumber === action.payload.mobileNumber
      );
      const newState = state.filter(
        (r) => r.mobileNumber !== action.payload.mobileNumber
      );
      // If found, return a new state with the recipient updated with the new data
      if (indexSelected !== -1) {
        return [action.payload, ...newState];
      } else {
        return state;
      }
    case 'DELETE_RECIPIENT':
      // TODO: Add some logic to delete the recipient from a database or an API

      // Return a new state with the recipient filtered out by id from the array
      return state.filter((r) => r.id !== action.payload);
    case 'REMOVE_RECIPIENT':
      // Return a new state with the recipient filtered out by id from the array
      return state.filter((r) => r.id !== action.payload);
    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};

// Define the interface for the recipients provider props
interface RecipientsProviderProps {
  children: ReactNode;
}

const defaultRecipients: IRecipient[] = [
  // {
  //   name: 'Fikile',
  //   surname: 'Mlangeni',
  //   country: 'United States',
  //   countryCode: 'US',
  //   mobileNumber: '+12025550196',
  //   senderId: 'xx',
  // },
  // {
  //   name: 'Siyabonga',
  //   surname: 'Zwakele',
  //   country: 'South Africa',
  //   countryCode: 'ZA',
  //   mobileNumber: '+27712025550196',
  //   senderId: 'xx',
  // },
];

// Create a custom provider component that wraps the children with the recipients context
export const RecipientsProvider = ({ children }: RecipientsProviderProps) => {
  // Use reducer to manage the recipients state and dispatch actions
  const [state, dispatch] = useReducer(reducer, defaultRecipients);
  return (
    <RecipientsDispatchContext.Provider value={dispatch}>
      <RecipientsStateContext.Provider value={state}>
        {children}
      </RecipientsStateContext.Provider>
    </RecipientsDispatchContext.Provider>
  );
};

// Export a custom hook that returns the recipients data from the context
export const useRecipients = () => useContext(RecipientsStateContext);

// Export a custom hook that returns the dispatch function from the context
export const useDispatchRecipients = () =>
  useContext(RecipientsDispatchContext);

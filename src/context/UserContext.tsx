import {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
} from 'react';

interface IUser {
  id?: string;
  name: string;
  surname: string;
  city: string;
  country: string;
  mobileNumber: string;
  email?: string;
}

// Define the type for the user state
type UserState = IUser | null;

// Define the type for the user action
type UserAction =
  | {
      type: 'SET_USER';
      payload: IUser | null; // The new user data
    }
  | {
      type: 'UPDATE_USER';
      payload: IUser; // The updated user data
    }
  | {
      type: 'DELETE_USER';
    };

// Create the user state context with a null value as initial value
const UserStateContext = createContext<UserState>(null);

// Create the user dispatch context with a dummy function as initial value
const UserDispatchContext = createContext<Dispatch<UserAction>>(() => null);

// Define the reducer function for the user context
const reducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case 'SET_USER':
      // Return the new user data as the state
      console.log('SET_USER', action.payload);
      return action.payload;
    case 'UPDATE_USER':
      // Return the updated user data as the state
      return action.payload;
    case 'DELETE_USER':
      // TODO: Add some logic to delete the user from a database or an API
      // Return null as the state
      return null;
    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};

// Define the interface for the user provider props
interface UserProviderProps {
  children: ReactNode;
}

// Create a custom provider component that wraps the children with the user context
export const UserProvider = ({ children }: UserProviderProps) => {
  // Use reducer to manage the user state and dispatch actions
  const [state, dispatch] = useReducer(reducer, null);
  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

// Export a custom hook that returns the user data from the context
export const useUser = () => useContext(UserStateContext);

// Export a custom hook that returns the dispatch function from the context
export const useDispatchUser = () => useContext(UserDispatchContext);

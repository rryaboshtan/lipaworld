import {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  useEffect,
} from 'react';

// Define the interface for the country data
interface ICountry {
  country_name: string;
  currency_market_iso: string;
  country_code: string;
  mtxm_currency: boolean;
  usp_message: string;
  rate?: number;
}

// Define the type for the countries state
type CountriesState = Record<string, ICountry>;

// Create the countries state context
const CountriesStateContext = createContext<CountriesState>({});

// Define the type for the countries action
type CountriesAction =
  | {
      type: 'SET_COUNTRIES';
      payload: CountriesState; // The new countries data
    }
  | {
      type: 'UPDATE_COUNTRY';
      payload: ICountry; // The updated country data
    }
  | {
      type: 'UPDATE_EXCHANGE_RATE';
      payload: number; // The updated country exchange rate
    };

// Create the countries state context with a default value as initial value
const initialCountriesState: CountriesState = {
  BD: {
    country_name: 'Bangladesh',
    currency_market_iso: 'BDT',
    country_code: 'BD',
    mtxm_currency: false,
    usp_message: '',
  },
  BW: {
    country_name: 'Botswana',
    currency_market_iso: 'BWP',
    country_code: 'BW',
    mtxm_currency: false,
    usp_message: '',
  },
  CM: {
    country_name: 'Cameroon',
    currency_market_iso: 'XAF',
    country_code: 'CM',
    mtxm_currency: false,
    usp_message: '',
  },
  CN: {
    country_name: 'China',
    currency_market_iso: 'CNY',
    country_code: 'CN',
    mtxm_currency: false,
    usp_message: '',
  },
  CI: {
    country_name: "Cote d'Ivoire",
    currency_market_iso: 'XOF',
    country_code: 'CI',
    mtxm_currency: false,
    usp_message: '',
  },
  CD: {
    country_name: 'DR Congo',
    currency_market_iso: 'USD',
    country_code: 'CD',
    mtxm_currency: false,
    usp_message: '',
  },
  SZ: {
    country_name: 'Eswatini',
    currency_market_iso: 'SZL',
    country_code: 'SZ',
    mtxm_currency: false,
    usp_message: '',
  },
  ET: {
    country_name: 'Ethiopia',
    currency_market_iso: 'ETB',
    country_code: 'ET',
    mtxm_currency: false,
    usp_message: '',
  },
  DE: {
    country_name: 'Germany',
    currency_market_iso: 'EUR',
    country_code: 'DE',
    mtxm_currency: false,
    usp_message: '',
  },
  GH: {
    country_name: 'Ghana',
    currency_market_iso: 'GHS',
    country_code: 'GH',
    mtxm_currency: false,
    usp_message: '',
  },
  HU: {
    country_name: 'Hungary',
    currency_market_iso: 'EUR',
    country_code: 'HU',
    mtxm_currency: false,
    usp_message: '',
  },
  IN: {
    country_name: 'India',
    currency_market_iso: 'INR',
    country_code: 'IN',
    mtxm_currency: false,
    usp_message: '',
  },
  IE: {
    country_name: 'Ireland',
    currency_market_iso: 'EUR',
    country_code: 'IE',
    mtxm_currency: false,
    usp_message: '',
  },
  IT: {
    country_name: 'Italy',
    currency_market_iso: 'EUR',
    country_code: 'IT',
    mtxm_currency: false,
    usp_message: '',
  },
  KE: {
    country_name: 'Kenya',
    currency_market_iso: 'KES',
    country_code: 'KE',
    mtxm_currency: false,
    usp_message: '',
  },
  LS: {
    country_name: 'Lesotho',
    currency_market_iso: 'LSL',
    country_code: 'LS',
    mtxm_currency: false,
    usp_message: '',
  },
  LT: {
    country_name: 'Lithuania',
    currency_market_iso: 'EUR',
    country_code: 'LT',
    mtxm_currency: false,
    usp_message: '',
  },
  MW: {
    country_name: 'Malawi',
    currency_market_iso: 'MWK',
    country_code: 'MW',
    mtxm_currency: false,
    usp_message: '',
  },
  MZ: {
    country_name: 'Mozambique',
    currency_market_iso: 'MZN',
    country_code: 'MZ',
    mtxm_currency: false,
    usp_message: '',
  },
  NG: {
    country_name: 'Nigeria',
    currency_market_iso: 'USD',
    country_code: 'NG',
    mtxm_currency: false,
    usp_message: '',
  },
  PL: {
    country_name: 'Poland',
    currency_market_iso: 'EUR',
    country_code: 'PL',
    mtxm_currency: false,
    usp_message: '',
  },
  PT: {
    country_name: 'Portugal',
    currency_market_iso: 'EUR',
    country_code: 'PT',
    mtxm_currency: false,
    usp_message: '',
  },
  RO: {
    country_name: 'Romania',
    currency_market_iso: 'EUR',
    country_code: 'RO',
    mtxm_currency: false,
    usp_message: '',
  },
  RW: {
    country_name: 'Rwanda',
    currency_market_iso: 'RWF',
    country_code: 'RW',
    mtxm_currency: false,
    usp_message: '',
  },
  ZA: {
    country_name: 'South Africa',
    currency_market_iso: 'ZAR',
    country_code: 'ZA',
    mtxm_currency: false,
    usp_message: '',
    rate: 19.45,
  },
  TZ: {
    country_name: 'Tanzania',
    currency_market_iso: 'TZS',
    country_code: 'TZ',
    mtxm_currency: false,
    usp_message: '',
  },
  UG: {
    country_name: 'Uganda',
    currency_market_iso: 'UGX',
    country_code: 'UG',
    mtxm_currency: false,
    usp_message: '',
  },
  ZM: {
    country_name: 'Zambia',
    currency_market_iso: 'ZMW',
    country_code: 'ZM',
    mtxm_currency: false,
    usp_message: '',
  },
  ZW: {
    country_name: 'Zimbabwe',
    currency_market_iso: 'USD',
    country_code: 'ZW',
    mtxm_currency: false,
    usp_message: '',
    rate: 1,
  },
};

// Create the countries dispatch context with a dummy function as initial value
const CountriesDispatchContext = createContext<Dispatch<CountriesAction>>(
  () => null
);

// Define the reducer function for the countries context
const reducer = (state: CountriesState, action: CountriesAction) => {
  switch (action.type) {
    case 'SET_COUNTRIES':
      // Return the new countries data as the state
      return action.payload;
    case 'UPDATE_COUNTRY':
      // Return a new state with the country updated with the new data
      return {
        ...state,
        [action.payload.country_code]: {
          ...state[action.payload.country_code],
          ...action.payload,
        },
      };
    case 'UPDATE_EXCHANGE_RATE':
      console.log('UPDATE RATE');
      const updatedCountry = {
        country_name: 'South Africa',
        currency_market_iso: 'ZAR',
        country_code: 'ZA',
        mtxm_currency: false,
        usp_message: '',
        rate: action.payload,
      };
      const updatedState = {
        ...state,
        [action.payload]: updatedCountry,
      };
      return updatedState;

    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};

// Define the interface for the countries provider props
interface CountriesProviderProps {
  children: ReactNode;
}

export const CountriesProvider = ({ children }: CountriesProviderProps) => {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_CONFIGURATIONS_URL}/v1/rate/latest`)
      .then((res) => res.json())
      .then((data) => {
        initialCountriesState['ZA'].rate = data.rate.markedup_rate;
      })
      .catch((error) => console.log(error));
  }, []);

  // Use reducer to manage the countries state and dispatch actions
  const [state, dispatch] = useReducer(reducer, initialCountriesState);
  return (
    <CountriesDispatchContext.Provider value={dispatch}>
      <CountriesStateContext.Provider value={{ ...state }}>
        {children}
      </CountriesStateContext.Provider>
    </CountriesDispatchContext.Provider>
  );
};

// Export a custom hook that returns the countries data from the context
export const useCountries = () => useContext(CountriesStateContext);

// Export a custom hook that returns the dispatch function from the context
export const useDispatchCountries = () => useContext(CountriesDispatchContext);

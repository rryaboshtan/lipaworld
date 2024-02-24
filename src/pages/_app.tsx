import dotenv from 'dotenv';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ToastContainer } from 'react-toastify';
import mixpanel from 'mixpanel-browser';
import Hotjar from '@hotjar/browser';
import {
  CartProvider,
  CountriesProvider,
  MerchantsProvider,
  RecipientsProvider,
  UserProvider,
  VouchersProvider,
  TransactionProvider,
  ListsProvider,
  } from '@/context/index';

import '@/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';

dotenv.config();

config.autoAddCss = false;
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_KEY || '', {
    debug: true,
    track_pageview: true,
    persistence: 'localStorage',
  });

  mixpanel.track('App Mounted', {
    'Event Type': 'Test implementation',
  });

  const siteId = 3834057;
  const hotjarVersion = 6;
  Hotjar.init(siteId, hotjarVersion);

  const initialOptions = {
    'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: 'USD',
    intent: 'capture',
    enableFunding: 'venmo,card,credit',
    // debug: true,
    // buyerCountry: 'en_US',
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <GoogleFontsLayout> */}
        <UserProvider>
          <CountriesProvider>
            <MerchantsProvider>
              <RecipientsProvider>
                <ListsProvider>
                  <VouchersProvider>
                    <TransactionProvider>
                      <CartProvider>
                        <PayPalScriptProvider options={initialOptions}>
                          <Component {...pageProps} />
                        </PayPalScriptProvider>
                      </CartProvider>
                    </TransactionProvider>
                  </VouchersProvider>
                </ListsProvider>
              </RecipientsProvider>
            </MerchantsProvider>
          </CountriesProvider>
        </UserProvider>
        {/* </GoogleFontsLayout> */}
      </QueryClientProvider>
            <Script
        id='gtm'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM}`}
      />
      <Script
        id='gtm2'
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
							new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM}');
					`,
        }}
      />
      {/*Start of HubSpot Embed Code*/}
      <Script
        type='text/javascript'
        id='hs-script-loader'
        async
        defer
        src={process.env.NEXT_PUBLIC_HUBSPOT_CHAT}
      />
      {/*End of HubSpot Embed Code */}
      <ToastContainer />
    </>
  );
}

import { useEffect, useState } from 'react';
import dotenv from 'dotenv';
import type { AppProps } from 'next/app';
// import { loadStripe, Stripe } from '@stripe/stripe-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import mixpanel from 'mixpanel-browser';
import {
  CartProvider,
  CountriesProvider,
  MerchantsProvider,
  RecipientsProvider,
  UserProvider,
  VouchersProvider,
  TransactionProvider,
} from '@/context/index';

import '@/styles/globals.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Script from 'next/script';

dotenv.config();

config.autoAddCss = false;
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  // const [stripePromise, setStripePromise] =
  //   useState<Promise<Stripe | null> | null>(null);

  // useEffect(() => {
  //   try {
  //     fetch(`${process.env.NEXT_PUBLIC_STRIPE_API_URL}/config`).then(
  //       async (r) => {
  //         const { publishableKey } = await r.json();
  //         setStripePromise(loadStripe(publishableKey));
  //       }
  //     );
  //   } catch (err) {
  //     console.log('err', err);
  //   }
  // }, []);

  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_KEY || '', {
    debug: true,
    track_pageview: true,
    persistence: 'localStorage',
  });

  mixpanel.track('App Mounted', {
    'Event Type': 'Test implementation',
  });

  // const initialOptions = {
  //   clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  //   buyerCountry: 'en_US',
  //   currency: 'USD',
  //   debug: true,
  //   enableFunding: 'venmo,card,credit',
  // };

  const initialOptions = {
    'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: 'USD',
    intent: 'capture',
    enableFunding: 'venmo,card,credit',
    debug: true,
    // buyerCountry: 'en_US',
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CountriesProvider>
            <MerchantsProvider>
              <RecipientsProvider>
                <VouchersProvider>
                  <TransactionProvider>
                    <CartProvider>
                      <PayPalScriptProvider options={initialOptions}>
                        <Component {...pageProps} />
                      </PayPalScriptProvider>
                    </CartProvider>
                  </TransactionProvider>
                </VouchersProvider>
              </RecipientsProvider>
            </MerchantsProvider>
          </CountriesProvider>
        </UserProvider>
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
    </>
  );
}

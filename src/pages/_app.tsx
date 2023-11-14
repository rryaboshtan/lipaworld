import { useEffect, useState } from 'react';
import dotenv from 'dotenv';
import type { AppProps } from 'next/app';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

dotenv.config();

config.autoAddCss = false;
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    try {
      fetch(`${process.env.NEXT_PUBLIC_STRIPE_API_URL}/config`).then(
        async (r) => {
          const { publishableKey } = await r.json();
          setStripePromise(loadStripe(publishableKey));
        }
      );
    } catch (err) {
      console.log('err', err);
    }
  }, []);

  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_KEY || '', {
    debug: true,
    track_pageview: true,
    persistence: 'localStorage',
  });

  mixpanel.track('App Mounted', {
    'Event Type': 'Test implementation',
  });

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CountriesProvider>
          <MerchantsProvider>
            <RecipientsProvider>
              <VouchersProvider>
                <TransactionProvider>
                  <CartProvider>
                    <Component {...pageProps} stripePromise={stripePromise} />
                  </CartProvider>
                </TransactionProvider>
              </VouchersProvider>
            </RecipientsProvider>
          </MerchantsProvider>
        </CountriesProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

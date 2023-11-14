import React, { useEffect, useState } from 'react';
import dotenv from 'dotenv';
import { useRouter } from 'next/router';
import Img from 'next/image';
import { getUser } from '../services/AuthService';
import {
  useVouchers,
  useCountries,
  useRecipients,
  useCart,
  useTransaction,
} from '@/context';
import Nav from '../components/nav/Nav';
import NavMobile from '../components/navMobile/NavMobile';

import { Montserrat } from 'next/font/google';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/checkoutForm/CheckoutForm';

const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '../styles/page.module.css';

dotenv.config();

export default function Payment(props: any) {
  const router = useRouter();
  const transaction = useTransaction();
  const { stripePromise } = props;
  const [clientSecret, setClientSecret] = useState('');
  const [intentSent, setIntentSent] = useState(false);
  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );

  const recipients = useRecipients();
  const cart = useCart();

  const provisionalCartId =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('provisionalCartId')
      : '';

  // const [transactionId, setTransactionId] = useState<string | null>(null);
  // const [cartTotalAmount, setCartTotalAmount] = useState<string | null>(null);
  // const [provisionalCartId, setProvisionalCartId] = useState<string | null>(
  //   null
  // );

  // useEffect(() => {
  //   if (typeof sessionStorage === 'undefined') {
  //     return;
  //   }

  //   const storedTransactionId = sessionStorage.getItem('transactionId');
  //   const storedCartTotalAmount = sessionStorage.getItem('cartTotalAmount');
  //   const storedProvisionalCartId = sessionStorage.getItem('provisionalCartId');

  //   setTransactionId(storedTransactionId);
  //   setCartTotalAmount(storedCartTotalAmount);
  //   setProvisionalCartId(storedProvisionalCartId);
  // }, []);

  // useEffect(() => {
  //   if (!transactionId) {
  //     router.push(`/?${searchParams && searchParams.toString()}`);
  //     return;
  //   }
  //   console.log('cart*', cart);
  //   console.log('transaction*', transactionId);

  //   if (!cart || cart?.cartItems.length === 0) {
  //     router.push(`/cart/?${searchParams && searchParams.toString()}`);
  //     return;
  //   }

  //   if (!cartTotalAmount) {
  //     router.push(`/cart/?${searchParams && searchParams.toString()}`);
  //     return;
  //   }

  //   if (recipients.length === 0) {
  //     router.push(
  //       `/create-recipient/?${searchParams && searchParams.toString()}`
  //     );
  //     return;
  //   }

  //   if (!name) {
  //     router.push(
  //       `/login?return_url=/payment?${searchParams && searchParams.toString()}`
  //     );
  //     return;
  //   }

  //   if (name) {
  //     router.push(`/payment/?${searchParams && searchParams.toString()}`);
  //   }
  // }, [
  //   cart,
  //   cartTotalAmount,
  //   name,
  //   recipients.length,
  //   router,
  //   searchParams,
  //   transactionId,
  // ]);

  useEffect(() => {
    if (
      transaction &&
      transaction.cartTotalAmount &&
      transaction.transactionId &&
      !intentSent
    ) {
      console.log('start intent - amount', transaction.cartTotalAmount);
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: !transaction.cartTotalAmount
            ? 1
            : Number(transaction.cartTotalAmount) * 100,
          currency: 'USD',
          description: 'LIPAWORLD VOUCHERS',
          metadata: {
            transaction_id: transaction.transactionId ?? 't',
            cart_id: cart?.cartId || provisionalCartId,
            sender_id: user.id ?? 'u',
            recipient_id: transaction.recipientIds[0] ?? 'r',
            amount: Number(transaction.cartTotalAmount) * 100,
          },
        }),
      };
      fetch(
        `${process.env.NEXT_PUBLIC_STRIPE_API_URL}/create-payment-intent`,
        requestOptions
      )
        .then((res) => res.json())
        .then(({ clientSecret }) => {
          setClientSecret(clientSecret);
          setIntentSent(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(transaction);
    }
  }, []);

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile />

      <div className={styles.contentBody}>
        {clientSecret && stripePromise ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm user={user} />
          </Elements>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <Nav />
    </main>
  );
}

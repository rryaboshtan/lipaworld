import React, { useEffect, useState } from 'react';
import dotenv from 'dotenv';
import { useRouter } from 'next/router';
// import Img from 'next/image';
import { useUser } from '@/context';
import { CreateOrderActions } from '@paypal/paypal-js';
import {
  // useVouchers,
  // useCountries,
  useRecipients,
  useCart,
  useTransaction,
} from '@/context';
import NavMobile from '../components/navMobile/NavMobile';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '../styles/page.module.css';

dotenv.config();

export default function Payment(props: any) {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  const router = useRouter();
  const transaction = useTransaction();
  // const [intentSent, setIntentSent] = useState(false);
  const user = useUser();
  const cart = useCart();
  const recipients = useRecipients();
  // const vouchers = useVouchers();
  // const countries = useCountries();
  const name = user?.name ?? '';
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );
  const [returnUrl, setReturnUrl] = useState('');

  useEffect(() => {
    setReturnUrl(window.location.pathname);
  }, []);

  useEffect(() => {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    setSearchParams(params);
  }, []);

  // const recipients = useRecipients();
  // const cart = useCart();

  const provisionalCartId =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('provisionalCartId')
      : '';

  const onCreateOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          description: 'Lipaworld',
          reference_id: transaction?.transactionId,
          soft_descriptor: 'LIPAWORLD',
          amount: {
            value: Number(transaction?.cartTotalAmount) ?? 0,
          },
        },
      ],
    });
  };

  const onApproveOrder = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      sessionStorage.setItem('payment', JSON.stringify(details));

      console.log(
        'details',
        details.purchase_units[0].payments.captures[0].status
      );
      router.push(`/completion?id=${details.id}`);
    });
  };

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile />

      <div className={styles.contentBody}>
        {isPending ? (
          <p>LOADING...</p>
        ) : (
          <>
            <div>
              <div className={styles.pageHeading}>Select payment method</div>
              <br />
              <br />
            </div>
            <PayPalButtons
              style={{ layout: 'vertical' }}
              createOrder={(data, actions) => onCreateOrder(data, actions)}
              onApprove={(data, actions) => onApproveOrder(data, actions)}
            />
          </>
        )}
      </div>
    </main>
  );
}

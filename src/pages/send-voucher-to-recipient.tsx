import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dotenv from 'dotenv';
import axios from 'axios';
import { useRecipients, useCart } from '@/context';
import { getUser } from '../services/AuthService';
import Nav from '../components/nav/Nav';
import NavMobile from '../components/navMobile/NavMobile';

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '../styles/page.module.css';

dotenv.config();

export default function SendVoucher() {
  const cart = useCart();
  const recipients = useRecipients();
  const user = getUser();

  const [transaction, setStoredTransaction] = useState<any>({});

  const router = useRouter();
  const name = user !== 'undefined' && user ? user.name : '';

  const createVoucherUrl = `${process.env.NEXT_PUBLIC_API_VOUCHERS_URL}`;

  useEffect(() => {
    console.log('GET TRANSACTION');
    const transaction = sessionStorage.getItem('transaction');
    if (transaction) {
      const parsedTransaction = JSON.parse(transaction);
      console.log('parsedTransaction', parsedTransaction);
      setStoredTransaction(parsedTransaction);
    } else {
      console.log('NO TRANSACTION');
    }
  }, []);

  const cancelHandler = () => {
    console.log('START AFRESH');
    router.push('/');
  };

  const sendVoucherHandler = () => {
    try {
      console.log('SEND VOUCHER');

      const requestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      };

      const messagePart1 = `Congratulations ${recipients[0].name} ${
        recipients[0].surname
      }. You have received a ${transaction.redemptionCurrency}${
        // (cart?.cartItems[0].quantity * cart?.cartItems[0].redemptionUnitValue) /
        (100).toFixed(2)
      } ${
        cart?.cartItems[0].deal.categories[0]
      } voucher from ${name}. Kindly redeem using voucher pin:`;

      const messagePart2 = `at any ${cart?.cartItems[0].deal.merchantName} outlet near you in ${recipients[0].country}. Terms and conditions: https://lipaworld.com/terms. Lipaworld, visit https://lipaworld.com`;

      const url = `${createVoucherUrl}/?sms_message_1=${messagePart1}&sms_message_2=${messagePart2}&phone=${recipients[0].mobileNumber}`;
      axios.post(url, requestConfig).then((response: any) => {
        console.log('response', response.voucherNumber);
        console.log('SEND EMAIL TO SENDER', response.voucherNumber);
        console.log('SEND SMS TO SENDER');
        console.log('SEND SMS TO RECIPIENT');
        console.log('SEND INTERNAL NOTIFICATIONS');
      });

      router.push('/thank-you-for-sending');
    } catch (error) {}
  };

  const nextHandler = () => {
    sendVoucherHandler();
  };

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile />

      <div className={styles.contentBody}>
        {transaction.transactionId ? (
          <div>
            {`Send the ${transaction.redemptionCurrency}${(
              transaction.redemptionValue / 100
            ).toFixed(2)} ${
              transaction.deal.categories[0]
            } digital voucher pin to ${transaction.recipient.name} ${
              transaction.recipient.surname
            } by SMS on ${transaction.recipient.mobileNumber}?`}
          </div>
        ) : (
          <div>
            We are missing some important transaction details. Please start
            again!{' '}
          </div>
        )}
        <p></p>
        <div className={styles.contentFooter}>
          <input
            type='button'
            className={styles.actionButton}
            value='Proceed'
            onClick={nextHandler}
          />
          <input
            type='button'
            className={`${styles.actionButton} ${styles.mediumEmphasis}`}
            value='Cancel'
            onClick={cancelHandler}
          />
          {/* <input
            type='button'
            className={`${styles.actionButton} ${styles.mediumEmphasis}`}
            value='Back'
            onClick={backHandler}
          /> */}
        </div>
      </div>

      <Nav />
    </main>
  );
}

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import dotenv from 'dotenv';
import axios from 'axios';
import mobileDetect from 'mobile-detect';
import { useTransaction } from '@/context';
import { getUser } from '../services/AuthService';
import Nav from '../components/nav/Nav';
import { Montserrat } from 'next/font/google';
import NavMobile from '../components/navMobile/NavMobile';

const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '../styles/page.module.css';
import mixpanel from 'mixpanel-browser';
dotenv.config();

export default function Completion(props) {
  const router = useRouter();

  let cart = null;
  let recipients = null;
  let payment = null;

  if (typeof window !== 'undefined') {
    if (!cart || !recipients) {
      cart = JSON.parse(sessionStorage.getItem('cart'));
      recipients = JSON.parse(sessionStorage.getItem('recipients'));
      payment = JSON.parse(sessionStorage.getItem('payment'));
    }
  }

  const transaction = useTransaction();
  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';
  const surname = user !== 'undefined' && user ? user.surname : '';

  const createVoucherUrl = `${process.env.NEXT_PUBLIC_API_VOUCHERS_URL}`;

  const [voucherMessageBody, setVoucherMessageBody] =
    useState('Sending SMS ...');
  const [messageBody, setMessageBody] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const [intentStatus, setIntentStatus] = useState('');
  const [vouchers, setVouchers] = useState(null);
  const [pinShared, setPinShared] = useState(false);
  const [isMobile, setIsMobile] = useState(null);

  const getMoreVouchers = () => {
    sessionStorage.removeItem('cart');
    router.push('/select-deal?recipientCountryCode=ZA&category=Fuel');
  };

  if (typeof window !== 'undefined' && isMobile === null) {
    const mobileCheck = new mobileDetect(window.navigator.userAgent);
    if (mobileCheck.ua.includes('Mobile')) {
      setIsMobile(true);
    }
  }

  const voucherHandler = () => {
    try {
      console.log('Process VOUCHER');

      const requestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      };

      const requestBody = {
        transactionId: transaction.transactionId,
        cart,
        recipientId: recipients[0].id,
        senderEmail: user.email,
      };

      const url = `${createVoucherUrl}/extractvouchers`;

      axios.post(url, requestBody, requestConfig).then((response) => {
        console.log('response', response.data);
        setVouchers(response.data.cart.cartItems);
        setVoucherMessageBody(
          <>
            {recipients[0].name} {recipients[0].surname} can now redeem these
            vouchers:
            <br />
            <br />
            {response.data.cart.cartItems.map((item) => {
              return (
                <p key={item.voucherNumber}>
                  {item.quantity} x {item.deal.redemptionCurrency}{' '}
                  {(item.redemptionUnitValue / 100).toFixed(2)}{' '}
                  {item.deal.voucherName} voucher at {item.deal.merchantName}
                  <br />
                  <br />
                  <strong>PIN: {item.voucherNumber}</strong>
                  <br /> <br />
                  {item.deal.voucherDescription && (
                    <small>Description: {item.deal.voucherDescription}</small>
                  )}
                  <br />
                  {item.deal.termsAndConditions && (
                    <small>
                      Terms &amp; Conditions: {item.deal.termsAndConditions}
                    </small>
                  )}
                  <br />
                  <br />
                </p>
              );
            })}
          </>
        );
        setPinReady(true);
      });
    } catch (error) {
      console.log('error', error);
      setVoucherMessageBody(<>Something went wrong: {error.message}</>);
    }
  };

  useEffect(() => {
    if (!payment) return;

    if (payment.purchase_units[0].payments.captures[0].status === 'COMPLETED') {
      setIntentStatus('succeeded');
      mixpanel.track(`Successful Payment`);

      voucherHandler();
      setVoucherMessageBody(
        <p>
          <br />
          Processing {recipients[0].name} {recipients[0].surname}
          &apos;s voucher. Hold on tight ...
        </p>
      );

      setMessageBody(
        <>
          <strong>
            Payment of {payment.purchase_units[0].amount.currency_code}
            {Number(payment.purchase_units[0].amount.value).toFixed(2)}{' '}
            succeeded.
          </strong>
          <br />
          <br />
        </>
      );
    }
  }, []);

  const sendWhatsAppMessage = () => {
    mixpanel.track(`Sent WhatsApp message to a recipient with voucher`);
    const cartItems = vouchers.map((item) => {
      const description = document.createElement('div');
      description.innerHTML = item.deal.voucherDescription;
      const termsAndConditions = document.createElement('div');
      termsAndConditions.innerHTML = item.deal.termsAndConditions;

      return `
        ${item.quantity} x ${item.deal.redemptionCurrency}${(
        item.redemptionUnitValue / 100
      ).toFixed(2)} *${item.deal.voucherName}* voucher at ${
        item.deal.merchantName
      }
      
        *PIN: ${item.voucherNumber}*
        
        Description: ${description.innerText}
      `;
    });

    const message = `Congratulations ${recipients[0].name} ${
      recipients[0].surname
    }. You have received digital vouchers from ${name} ${surname}. Kindly redeem using voucher pins below:\n\n${cartItems.join(
      '\n\n'
    )} Terms & Conditions: on lipaworld.com`;

    const whatsAppShareBlock = `https://wa.me/${recipients[0].mobileNumber.substring(
      1,
      20
    )}?text=${encodeURIComponent(message)}`;

    window.open(whatsAppShareBlock, '_blank');
    setPinShared(true);
  };

  const sendSmsMessage = () => {
    mixpanel.track(`Sent SMS to a recipient with voucher`);

    const cartItems = vouchers.map((item) => {
      const description = document.createElement('div');
      description.innerHTML = item.deal.voucherDescription;
      const termsAndConditions = document.createElement('div');
      termsAndConditions.innerHTML = item.deal.termsAndConditions;

      return `
        ${item.quantity} x ${item.deal.redemptionCurrency}${(
        item.redemptionUnitValue / 100
      ).toFixed(2)} ${item.deal.voucherName} voucher at ${
        item.deal.merchantName
      }
      
        PIN: ${item.voucherNumber}
        
        Description: ${description.innerText}
      `;
    });

    const message = `Congratulations ${recipients[0].name} ${
      recipients[0].surname
    }. You have received digital vouchers from ${name} ${surname}. Kindly redeem using voucher pins below:\n\n${cartItems.join(
      '\n\n'
    )} Terms & Conditions: on lipaworld.com`;

    const smsShareBlock = `sms:${recipients[0].mobileNumber.substring(
      1,
      20
    )}?body=${encodeURIComponent(message)}`;

    window.open(smsShareBlock, '_blank');
    setPinShared(true);
  };

  const getMessageBodyId = useMemo(() => {
    if (intentStatus === 'succeeded') {
      return 'succeeded_message';
    }
    if (!!intentStatus && intentStatus !== 'succeeded') {
      return 'error_message';
    }
    return 'messages';
  }, [intentStatus]);

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile />

      <div className={styles.contentBody}>
        {/* {intentStatus === 'succeeded' && (
          <div className={styles.pageHeading}>Thank you, {name}!</div>
        )} */}
        <div
          id={getMessageBodyId}
          role='alert'
          style={messageBody ? { display: 'block' } : {}}
        >
          {messageBody}
        </div>

        {intentStatus === 'succeeded' && (
          <>
            <div
              id='messages'
              role='alert'
              style={
                voucherMessageBody
                  ? { display: 'block', textAlign: 'center' }
                  : {}
              }
            >
              {voucherMessageBody}
            </div>
          </>
        )}

        {pinReady && (
          <>
            <p></p>
            <p>
              Click below to share the details using your favourite messaging
              app.
            </p>
            <input
              type='button'
              className={styles.actionButton}
              value='Send Voucher PIN using WhatsApp'
              onClick={sendWhatsAppMessage}
            />
            {isMobile && (
              <input
                type='button'
                id='sendSmsId'
                className={styles.actionButton}
                value='Send Voucher PIN on SMS'
                onClick={sendSmsMessage}
              />
            )}
            {pinShared && (
              <input
                type='button'
                className={styles.actionButton}
                value='Buy more Vouchers'
                onClick={getMoreVouchers}
              />
            )}
          </>
        )}
        <p></p>
      </div>

      <Nav />
    </main>
  );
}

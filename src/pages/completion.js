import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import dotenv from 'dotenv';
import axios from 'axios';
import mobileDetect from 'mobile-detect';
import { useTransaction, useDispatchTransaction } from '@/context';
import { useUser } from '@/context';
import Nav from '../components/nav/Nav';
import { Montserrat } from 'next/font/google';
import NavMobile from '../components/navMobile/NavMobile';

const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '../styles/page.module.css';
import mixpanel from 'mixpanel-browser';
dotenv.config();

export default function Completion() {
  let voucherHandled = false;
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
  const dispatchTransaction = useDispatchTransaction;

  const user = useUser();
  const name = user ? user?.name : '';
  // const surname = user ? user?.surname : '';

  const createVoucherUrl = `${process.env.NEXT_PUBLIC_API_VOUCHERS_URL}`;

  const [voucherMessageBody, setVoucherMessageBody] =
    useState('Sending SMS ...');
  const [messageBody, setMessageBody] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const [intentStatus, setIntentStatus] = useState('');
  const [vouchers, setVouchers] = useState(null);
  const [isMobile, setIsMobile] = useState(null);

  const getMoreVouchers = () => {
    sessionStorage.removeItem('cart');
    router.push('/select-deal?recipientCountryCode=ZA&category=Shopping');
  };

  if (typeof window !== 'undefined' && isMobile === null) {
    const mobileCheck = new mobileDetect(window.navigator.userAgent);
    if (mobileCheck.ua.includes('Mobile')) {
      setIsMobile(true);
    }
  }

  useEffect(() => {
    if (vouchers && vouchers.length > 0) {
      setVoucherMessageBody(
        <>
          Purchased vouchers are now ready:
          <br />
          <br />
          {vouchers.map((item) => {
            return item.error ? (
              <p key={item.dealId}>
                Something went wrong with this item. Please try again later.
              </p>
            ) : item.deal.redemptionType === 'PIN' ? (
              <div key={item.dealId}>
                {item.quantity} x {item.deal.redemptionCurrency}{' '}
                {(item.redemptionUnitValue / 100).toFixed(2)}{' '}
                {item.deal.voucherName} voucher at {item.deal.merchantName}
                <br />
                <br />
                {item.vouchers.map((voucher) => (
                  <p key={voucher}>
                    <strong>PIN: {voucher.pin}</strong>
                    <br />
                  </p>
                ))}
                <br /> <br />
                {item.deal.voucherDescription && (
                  <small>Description: {item.deal.voucherDescription}</small>
                )}
                <br />
                {item.deal.terms && (
                  <small>Terms &amp; Conditions: {item.deal.terms}</small>
                )}
                <br />
                <br />
                <p>
                  <input
                    type='button'
                    className={styles.actionButton}
                    value={`Send message to ${item.productRecipient.name} using WhatsApp`}
                    onClick={() => sendPinWhatsAppMessage(item)}
                  />
                  {/* <input
                    type='button'
                    className={styles.actionButton}
                    value={`Send message to ${item.productRecipient.name} using Email`}
                    onClick={()=>sendEmail(item)}
                  /> */}
                  {isMobile && (
                    <input
                      type='button'
                      id='sendSmsId'
                      className={styles.actionButton}
                      value={`Send message to ${item.productRecipient.name} using SMS`}
                      onClick={() => sendPinSmsMessage(item)}
                    />
                  )}
                </p>
              </div>
            ) : (
              <div key={item.dealId}>
                {item.quantity} x {item.deal.redemptionCurrency}{' '}
                {(item.redemptionUnitValue / 100).toFixed(2)}{' '}
                {item.deal.voucherName} was topped-up to{' '}
                {item.productRecipient.mobileNumber}
                <br />
                {item.deal.voucherDescription && (
                  <small>Description: {item.deal.voucherDescription}</small>
                )}
                <br />
                {item.deal.terms && (
                  <small>Terms &amp; Conditions: {item.deal.terms}</small>
                )}
                <br />
                <br />
                <p>
                  <input
                    type='button'
                    className={styles.actionButton}
                    value={`Send message to ${item.productRecipient.name} using WhatsApp`}
                    onClick={() => sendTopUpWhatsAppMessage(item)}
                  />
                  {/* <input
                    type='button'
                    className={styles.actionButton}
                    value={`Send message to ${item.productRecipient.name} using Email`}
                    onClick={sendEmail}
                  />*/}
                  {isMobile && (
                    <input
                      type='button'
                      id='sendSmsId'
                      className={styles.actionButton}
                      value={`Send message to ${item.productRecipient.name} using SMS`}
                      onClick={() => sendTopUpSmsMessage(item)}
                    />
                  )}
                </p>
              </div>
            );
          })}
        </>
      );
    }
  }, [vouchers]);

  const voucherHandler = () => {
    voucherHandled = true;
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
        sender: user,
      };

      // const url = `${createVoucherUrl}/extractvouchers`;
      const url = `http://localhost:5019/extractvouchers`;
      axios.post(url, requestBody, requestConfig).then((response) => {
        console.log('response from vouchers api', response.data);
        setVouchers(response.data.cart.cartItems);

        setPinReady(true);
        // dispatchTransaction({
        //   type: 'UPDATE_TRANSACTION',
        //   payload: { ...transaction, cart: response.data.cart },
        // });
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

      setVoucherMessageBody(
        <p>
          <br />
          Processing vouchers. Hold on tight ...
        </p>
      );

      if (!voucherHandled) {
        voucherHandler();
      }

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

  const sendPinWhatsAppMessage = (item) => {
    const description = document.createElement('div');
    description.innerHTML = item.deal.voucherDescription;
    const termsAndConditions = document.createElement('div');
    termsAndConditions.innerHTML = item.deal.terms;

    mixpanel.track(`Sent WhatsApp message to a recipient with Pin voucher`);
    const cartItems = item.vouchers.map((itemVoucher) => {
      return `
        *PIN: ${itemVoucher.pin}*
        `;
    });

    const message = `Congratulations ${item.productRecipient.name} ${
      item.productRecipient.surname
    }. You have received digital vouchers from ${name}.\n\n ${
      item.quantity
    } x ${item.deal.redemptionCurrency}${(
      item.redemptionUnitValue / 100
    ).toFixed(2)} *${item.deal.voucherName}* from ${
      item.deal.merchantName
    }.{' '}\n\nDetails:\n\n${cartItems.join(
      '\n\n'
    )}{' '}${description}\n\n ${termsAndConditions}. Terms & Conditions: on www.lipaworld.com`;
    const whatsAppShareBlock = `https://api.whatsapp.com/send/?text=${message}&type=custom_url&app_absent=0`;
    window.open(whatsAppShareBlock, '_blank');
  };

  const sendPinSmsMessage = (item) => {
    mixpanel.track(`Sent SMS to a recipient with voucher`);

    const description = document.createElement('div');
    description.innerHTML = item.deal.voucherDescription;
    const termsAndConditions = document.createElement('div');
    termsAndConditions.innerHTML = item.deal.terms;

    mixpanel.track(`Sent WhatsApp message to a recipient with Pin voucher`);
    const cartItems = item.vouchers.map((itemVoucher) => {
      return `
        *PIN: ${itemVoucher.pin}*
        `;
    });

    const message = `Congratulations ${item.productRecipient.name} ${
      item.productRecipient.surname
    }. You have received digital vouchers from ${name}.\n\n ${
      item.quantity
    } x ${item.deal.redemptionCurrency}${(
      item.redemptionUnitValue / 100
    ).toFixed(2)} *${item.deal.voucherName}* from ${
      item.deal.merchantName
    }.{' '}\n\nDetails below:\n\n${cartItems.join(
      '\n\n'
    )}${description}\n\n ${termsAndConditions} Terms & Conditions: on www.lipaworld.com`;

    const smsShareBlock = `sms:${
      item.productRecipient.mobileNumber
    }?body=${encodeURIComponent(message)}`;

    window.open(smsShareBlock, '_blank');
  };

  const sendTopUpWhatsAppMessage = (item) => {
    const description = document.createElement('div');
    description.innerHTML = item.deal.voucherDescription;
    const termsAndConditions = document.createElement('div');
    termsAndConditions.innerHTML = item.deal.terms;

    mixpanel.track(`Sent WhatsApp message to a recipient with top-up voucher`);

    const message = `Congratulations ${item.productRecipient.name} ${
      item.productRecipient.surname
    }. You have received digital top-up vouchers from ${name}.\n\n ${
      item.quantity
    } x ${item.deal.redemptionCurrency}${(
      item.redemptionUnitValue / 100
    ).toFixed(2)} *${item.deal.voucherName}* from ${
      item.deal.merchantName
    }.{' '}\n\nDescription below:\n\n${
      item.deal.voucherDescription
    }\n\n Terms below:\n\n${
      item.deal.terms
    } Lipaworld Terms & Conditions: on www.lipaworld.com`;

    const whatsAppShareBlockTopUp = `https://api.whatsapp.com/send/?text=${message}&type=custom_url&app_absent=0`;

    window.open(whatsAppShareBlockTopUp, '_blank');
  };

  const sendTopUpSmsMessage = (item) => {
    mixpanel.track(`Sent SMS to a recipient with voucher`);

    const description = document.createElement('div');
    description.innerHTML = item.deal.voucherDescription;
    const termsAndConditions = document.createElement('div');
    termsAndConditions.innerHTML = item.deal.terms;

    mixpanel.track(`Sent WhatsApp message to a recipient with top-up voucher`);

    const message = `Congratulations ${item.productRecipient.name} ${
      item.productRecipient.surname
    }. You have received digital top-up vouchers from ${name}.\n\n ${
      item.quantity
    } x ${item.deal.redemptionCurrency}${(
      item.redemptionUnitValue / 100
    ).toFixed(2)} *${item.deal.voucherName}* from ${
      item.deal.merchantName
    }\n\nDetails below:\n\n${description}\n\n ${termsAndConditions} Terms & Conditions: on www.lipaworld.com`;

    const smsShareBlock = `sms:${
      item.productRecipient.mobileNumber
    }?body=${encodeURIComponent(message)}`;

    window.open(smsShareBlock, '_blank');
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

            <input
              type='button'
              className={styles.actionButton}
              value='Buy more Vouchers'
              onClick={getMoreVouchers}
            />
          </>
        )}
        <p></p>
      </div>

      <Nav />
    </main>
  );
}

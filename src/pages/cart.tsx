import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import mobileDetect from 'mobile-detect';
import {
  useDispatchCart,
  useDispatchTransaction,
  useDispatchCountries,
  useVouchers,
  useCountries,
  useRecipients,
  useCart,
  useTransaction,
} from '@/context';
import { IVoucher, ICountry } from '@/types';
import { getUser } from '../services/AuthService';
import Nav from '../components/nav/Nav';
import SideNav from '../components/sideNav/SideNav';
import NavMobile from '../components/navMobile/NavMobile';

import CartTable from '../components/cartTable/CartTable';

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '../styles/page.module.css';

export default function CartContainer() {
  const router = useRouter();
  const { query } = router;
  const { recipientCountryCode, category, merchantId, dealId } = query;

  const dispatchCart = useDispatchCart();
  const dispatchCountries = useDispatchCountries();
  const dispatchTransaction = useDispatchTransaction();
  const recipients = useRecipients();
  const cart = useCart();
  const transaction = useTransaction();

  const vouchers: IVoucher[] = useVouchers();
  const countries: Record<string, ICountry> = useCountries();

  const [currencyRate, setCurrencyRate] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [filteredVouchers, setFilteredVouchers] = useState<IVoucher[]>([]);
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );
  const [cartTotalAmount, setCartTotalAmount] = useState<string>('0.00');
  const [cartTaxFee, setCartTaxFee] = useState<string>('0.00');
  const [cartTransactionFee, setCartTransactionFee] = useState<string>('0.00');
  const [cartProcessingFee, setCartProcessingFee] = useState<string>('0.00');
  const [cartSubTotalAmount, setCartSubTotalAmount] = useState<string>('0.00');

  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';

  if (typeof window !== 'undefined' && isMobile === null) {
    const mobileCheck: any = new mobileDetect(window.navigator.userAgent);
    if (mobileCheck.ua.includes('Mobile')) {
      setIsMobile(true);
    }
  }

  useEffect(() => {
    // const countryCode =
    //   recipients.length === 0 ? 'ZA' : recipients[0].countryCode;

    const updateExchangeRate = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_CONFIGURATIONS_URL}/v1/rate/latest`
        );
        const data = await res.json();
        const rate = data.rate.markedup_rate;
        console.log('rate', rate);
        setCurrencyRate(rate);
        dispatchCountries({
          type: 'UPDATE_EXCHANGE_RATE',
          payload: rate,
        });
        dispatchTransaction({
          type: 'SET_USDZAR_RATE',
          payload: { exchangeRate: rate, exchangeRateId: data.rate.id },
        });
      } catch (error) {
        console.log(error);
        setErrorMessage('Something went wrong. Please try again later.');
      }
    };
    updateExchangeRate();
  }, [dispatchCountries]);

  useEffect(() => {
    if (cart && cart.cartItems) {
      setErrorMessage(null);

      const params: URLSearchParams = new URLSearchParams(
        window.location.search
      );
      setSearchParams(params);

      if (cart.cartItems.length === 0) {
        setErrorMessage(`Your cart is empty.`);
        return;
      }

      let matchingVouchers = [];

      if (recipientCountryCode && merchantId && category) {
        matchingVouchers = vouchers.filter(
          (voucher) =>
            voucher.redemptionCountryCode === recipientCountryCode &&
            voucher.categories.includes(category as string) &&
            voucher.merchantId === (merchantId as string)
        );
        setFilteredVouchers(matchingVouchers);
      } else if (recipientCountryCode && category && !merchantId) {
        matchingVouchers = vouchers.filter(
          (voucher) =>
            voucher.redemptionCountryCode === recipientCountryCode &&
            voucher.categories.includes(category as string)
        );
        setFilteredVouchers(matchingVouchers);
      } else if (recipientCountryCode && !category && !merchantId) {
        matchingVouchers = vouchers.filter(
          (voucher) => voucher.redemptionCountryCode === recipientCountryCode
        );
        setFilteredVouchers(matchingVouchers);
      } else if (merchantId) {
        matchingVouchers = vouchers.filter(
          (voucher) => voucher.merchantId === (merchantId as string)
        );
        setFilteredVouchers(matchingVouchers);
      }

      // if (matchingVouchers.length === 0) {
      //   console.log('recipientCountryCode', recipientCountryCode);
      //   setErrorMessage(`No matching vouchers found.`);

      //   const list = vouchers
      //     .filter(
      //       (merchant) =>
      //         merchant.redemptionCountryCode === recipientCountryCode
      //     )
      //     .map((merchant) => merchant.categories)
      //     .flat();
      //   setCategoryList(list);
      //   return;
      // }
    } else {
      console.log('ERROR', recipientCountryCode, category, merchantId, dealId);
    }
  }, [
    cart?.cartItems,
    merchantId,
    category,
    recipientCountryCode,
    cart,
    vouchers,
    dealId,
  ]);

  useEffect(() => {
    if (cart?.cartItems) {
      const subTotalAmount = cart.cartItems
        .reduce(
          (acc, item) =>
            acc +
            Number(
              (
                (item.quantity * item.deal.redemptionValues[0]) /
                100 /
                currencyRate
              ).toFixed(2)
            ),
          0
        )
        .toFixed(2);
      setCartSubTotalAmount(subTotalAmount);

      const transactionFee = (Number(subTotalAmount) * 0.05).toFixed(2);
      setCartTransactionFee(transactionFee);

      const tax = (
        (Number(subTotalAmount) + Number(transactionFee)) *
        0.15
      ).toFixed(2);
      setCartTaxFee(tax);

      const processingFee = (
        (Number(subTotalAmount) + Number(transactionFee) + Number(tax)) *
          0.025 +
        0.3
      ).toFixed(2);
      setCartProcessingFee(processingFee);

      const totalAmount =
        Number(subTotalAmount) +
        Number(transactionFee) +
        Number(tax) +
        Number(processingFee);
      setCartTotalAmount(totalAmount.toFixed(2));

      // save to storage
      sessionStorage.setItem('cartTotalAmount', JSON.stringify(totalAmount));
      sessionStorage.setItem('cart', JSON.stringify(cart));
      sessionStorage.setItem('transaction', JSON.stringify(transaction));
    }
  }, [cart, currencyRate, transaction]);

  useEffect(() => {
    sessionStorage.setItem('recipients', JSON.stringify(recipients));
  }, [recipients]);

  const updateTransactionAmounts = (
    processFee: string,
    cartTaxFee: string,
    cartTotalAmount: string,
    cartTransactionFee: string
  ) => {
    dispatchTransaction({
      type: 'UPDATE_AMOUNTS',
      payload: {
        processingFee: Number(processFee),
        tax: Number(cartTaxFee),
        cartTotalAmount: Number(cartTotalAmount),
        transactionFee: Number(cartTransactionFee),
      },
    });
  };

  const updateRecipients = (recipients: any, user: any) => {
    if (recipients.length > 0) {
      if (recipients[0].id) {
        dispatchTransaction({
          type: 'UPDATE_PARTIES',
          payload: {
            senderId: recipients[0].senderId,
            recipientIds: [recipients[0].id],
          },
        });
      } else {
        dispatchTransaction({
          type: 'UPDATE_PARTIES',
          payload: {
            senderId: user?.id ?? '',
            recipientIds: [
              `${recipients[0].name} ${recipients[0].surname} ${recipients[0].mobileNumber}`,
            ],
          },
        });
      }
    }
  };

  const removeFromCartHandler = (cartItemId: string) => {
    try {
      if (cartItemId) {
        dispatchCart({
          type: 'REMOVE_CART_ITEM',
          payload: cartItemId,
        });
      } else {
        console.log('ERROR');
        throw new Error('Missing important order details.');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  const checkoutHandler = () => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
    sessionStorage.setItem('transaction', JSON.stringify(transaction));

    updateTransactionAmounts(
      cartProcessingFee,
      cartTaxFee,
      cartTotalAmount,
      cartTransactionFee
    );
    updateRecipients(recipients, user);

    console.log('CHECKOUT TOTAL', cartTotalAmount);
    console.log('CHECKOUT FEES', cartTransactionFee);
    console.log('CHECKOUT CART', cart);
    console.log('CHECKOUT TRANSACTION', transaction);

    if (recipients.length === 0) {
      router.push(`/create-recipient`);
      return;
    }

    if (!name) {
      router.push(
        `/login?return_url=/payment?${searchParams && searchParams.toString()}`
        // `/login`
      );
      return;
    }

    if (name) {
      router.push(`/payment`);
    }
  };

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile withCart={true} />

      <div className={styles.contentBody}>
        {errorMessage && (
          <div className={styles.navSidedBody}>
            <SideNav />
            <div>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}
        {filteredVouchers && (
          <div>
            <p></p>
            {categoryList.length > 0 && (
              <p>Available categories: {categoryList.join(', ')}</p>
            )}
          </div>
        )}
        {!errorMessage && filteredVouchers && (
          <div className={styles.navSidedBody}>
            <SideNav />

            <div>
              <div className={styles.pageHeading}>Cart</div>

              <div></div>
              <div className={styles.cartHolder}>
                {currencyRate === 1 ? (
                  <div style={{ width: '100%' }}>Loading ...</div>
                ) : (
                  <CartTable
                    cart={cart}
                    cartTotalAmount={cartTotalAmount}
                    removeFromCartHandler={removeFromCartHandler}
                    currencyRate={currencyRate}
                    cartTransactionFee={cartTransactionFee}
                    cartProcessingFee={cartProcessingFee}
                    cartTaxFee={cartTaxFee}
                    isMobile={isMobile}
                  />
                )}
              </div>
              <div
                className={styles.contentFooter}
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  maxWidth: 'var(--max-width)',
                }}
              >
                {cart && cart?.cartItems.length > 0 && (
                  <input
                    className={`${styles.actionButton} ${styles.mediumEmphasis}`}
                    value='Proceed to Checkout'
                    type='button'
                    onClick={checkoutHandler}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Nav />
    </main>
  );
}

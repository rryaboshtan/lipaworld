import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useVouchers, useCountries, useRecipients } from '@/context';
import { IVoucher, ICountry } from '@/types';
import { getUser } from '@/services/AuthService';
import Nav from '../components/nav/Nav';
import SideNav from '../components/sideNav/SideNav';
import NavMobile from '../components/navMobile/NavMobile';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '../styles/page.module.css';
import VoucherCard from '@components/voucherCard/VoucherCard';

export default function SelectDeal() {
  const router = useRouter();
  const { query } = router;
  const { recipientCountryCode, category, merchantId } = query;

  const vouchers: IVoucher[] = useVouchers();
  const countries: Record<string, ICountry> = useCountries();
  const recipients = useRecipients();

  const [currencyRate, setCurrencyRate] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [filteredVouchers, setFilteredVouchers] = useState<IVoucher[]>([]);
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );

  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';

  useEffect(() => {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    setSearchParams(params);
  }, []);

  useEffect(() => {
    if (countries && recipientCountryCode) {
      const countryCode =
        recipients.length === 0 ? 'ZA' : recipients[0].countryCode;
      const { rate } = countries[countryCode];
      if (rate) {
        setCurrencyRate(rate);
      }

      setErrorMessage(null);

      const matchingVouchers = vouchers.filter(
        (voucher) =>
          voucher.status === 'Active' &&
          (!recipientCountryCode ||
            voucher?.redemptionCountryCode === recipientCountryCode) &&
          (!category || voucher.categories.includes(category as string)) &&
          (!merchantId || voucher.merchantId === (merchantId as string))
      );

      console.log('matchingVouchers', matchingVouchers);
      setFilteredVouchers(matchingVouchers);

      if (matchingVouchers.length === 0) {
        // setErrorMessage(`No matching vouchers found.`);
        const list = vouchers
          .filter(
            (merchant) =>
              merchant.redemptionCountryCode === recipientCountryCode &&
              merchant.status === 'Active' &&
              merchant.categories.includes('Shopping')
          )
          .map((merchant) => merchant.categories)
          .flat();
        setCategoryList(list);
      }
    } else {
      console.log('ERROR', recipientCountryCode, category, merchantId);
    }
  }, [
    vouchers,
    merchantId,
    category,
    recipientCountryCode,
    countries,
    recipients,
  ]);

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile withCart={true} />

      <div className={styles.contentBody}>
        {errorMessage && (
          <div className={styles.navSidedBody}>
            <SideNav />
            <div className={styles.errorMessage}>
              <p>{errorMessage}</p>
              <br />
            </div>
          </div>
        )}
        {filteredVouchers && (
          <div>
            <p></p>
          </div>
        )}
        {!errorMessage && filteredVouchers && (
          <div className={styles.navSidedBody}>
            <SideNav />

            <div className={styles.dealHolder}>
              {category && (
                <div
                  className={styles.pageHeading}
                  style={{ margin: '0 0 1.5rem 1rem' }}
                >
                  {category} vouchers
                </div>
              )}
              {filteredVouchers.map((voucher, index) => (
                <VoucherCard
                  key={index}
                  voucherQuantity={1}
                  voucher={voucher}
                  currencyRate={currencyRate}
                  setErrorMessage={setErrorMessage}
                />
              ))}
            </div>
          </div>
        )}
        <div className={styles.contentFooter}></div>
      </div>
    </main>
  );
}

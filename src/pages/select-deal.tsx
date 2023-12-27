import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useVouchers, useCountries, useRecipients } from '@/context';
import { IVoucher, ICountry } from '@/types';
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
  const [headingPlaceholder, setHeadingPlaceholder] = useState<string | null>(
    null
  );

  const [filteredVouchers, setFilteredVouchers] = useState<IVoucher[]>([]);
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );

  useEffect(() => {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    setSearchParams(params);
  }, []);

  useEffect(() => {
    if (countries && recipientCountryCode && merchantId) {
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
          voucher?.redemptionCountryCode === recipientCountryCode &&
          voucher.merchantId === merchantId
      );
      if (matchingVouchers.length > 0) {
        setHeadingPlaceholder(matchingVouchers[0].merchantName);
        setFilteredVouchers(matchingVouchers);
      } else {
        setErrorMessage(
          `No matching vouchers found for Merchant: "${merchantId}".`
        );
        const list = vouchers.filter(
          (voucher) =>
            voucher.status === 'Active' &&
            voucher.redemptionCountryCode === recipientCountryCode &&
            voucher.merchantName === 'MTN'
        );
        setHeadingPlaceholder('MTN');
        setFilteredVouchers(list);
      }
    } else {
      console.log('ERROR', recipientCountryCode, merchantId);
    }
  }, [vouchers, merchantId, recipientCountryCode, countries, recipients]);

  useEffect(() => {
    if (countries && recipientCountryCode && category) {
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
          voucher?.redemptionCountryCode === recipientCountryCode &&
          voucher.categories.includes(category as string)
      );
      if (matchingVouchers.length > 0) {
        setHeadingPlaceholder(matchingVouchers[0].categories[0]);
        setFilteredVouchers(matchingVouchers);
      } else {
        setErrorMessage(`No matching vouchers found for "${category}".`);
        const list = vouchers.filter(
          (voucher) =>
            voucher.status === 'Active' &&
            voucher.redemptionCountryCode === recipientCountryCode &&
            voucher.categories.includes('Shopping')
        );
        setHeadingPlaceholder('Shopping');
        setFilteredVouchers(list);
      }
    } else {
      console.log('ERROR', recipientCountryCode, category);
    }
  }, [vouchers, category, recipientCountryCode, countries, recipients]);

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile withCart={true} />

      <div className={styles.contentBody}>
        {filteredVouchers && (
          <div className={styles.navSidedBody}>
            <SideNav />

            <div className={styles.dealHolder}>
              <div
                className={styles.errorMessage}
                style={{ margin: '0 0 1rem 1rem' }}
              >
                <p>{errorMessage}</p>
                <br />
              </div>
              {headingPlaceholder && (
                <div
                  className={styles.pageHeading}
                  style={{ margin: '0 0 1.5rem 1rem' }}
                >
                  {headingPlaceholder} vouchers
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

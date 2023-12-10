import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useVouchers, useCountries, useRecipients } from '@/context';
import { IVoucher, ICountry } from '@/types';
import { getUser } from '../services/AuthService';
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
  const { recipientCountryCode, category, merchantId, dealId } = query;

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
    if (countries) {
      const countryCode =
        recipients.length === 0 ? 'ZA' : recipients[0].countryCode;
      const { rate } = countries[countryCode];
      if (rate) {
        console.log('rate iyi', rate);
        setCurrencyRate(rate);
      }
    }
  }, []);

  useEffect(() => {
    if (recipientCountryCode) {
      setErrorMessage(null);
      const params: URLSearchParams = new URLSearchParams(
        window.location.search
      );
      setSearchParams(params);

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

      if (matchingVouchers.length === 0) {
        console.log('recipientCountryCode', recipientCountryCode);
        setErrorMessage(`No matching vouchers found.`);

        const list = vouchers
          .filter(
            (merchant) =>
              merchant.redemptionCountryCode === recipientCountryCode
          )
          .map((merchant) => merchant.categories)
          .flat();
        setCategoryList(list);
        return;
      }
    } else {
      console.log('ERROR', recipientCountryCode, category, merchantId, dealId);
    }
  }, [vouchers, merchantId, category, recipientCountryCode]);

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
            {/* {categoryList.length > 0 && (
              <p>Available categories: {categoryList.join(', ')}</p>
            )} */}
          </div>
        )}
        {!errorMessage && filteredVouchers && (
          <div className={styles.navSidedBody}>
            <SideNav />

            <div className={styles.dealHolder}>
              {filteredVouchers.map((voucher, index) => (
                <VoucherCard
                  voucherQuantity={1}
                  key={index}
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

      <Nav />
    </main>
  );
}

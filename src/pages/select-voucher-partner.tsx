import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUser } from '@/context';
import { useMerchants } from '@/context';
import { IMerchant } from '@/types';
import lookup from 'country-code-lookup';
import Nav from '../components/nav/Nav';
import SideNav from '../components/sideNav/SideNav';
import Cart from '../components/cart/Cart';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '../styles/page.module.css';

export default function SelectVoucherPartner() {
  const merchants: IMerchant[] = useMerchants();
  const router = useRouter();
  const [merchantList, setMerchantList] = useState<IMerchant[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeCountriesMessage, setActiveCountriesMessage] = useState<string>(
    'South Africa is the only country with available vouchers. Please try again.'
  );
  const [countryName, setCountryName] = useState<string | null>(null);
  const [recipientCountryCode, setRecipientCountryCode] = useState<
    string | null
  >(null);
  const [category, setCategory] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );

  useEffect(() => {
    const { query } = router;
    const { recipientCountryCode, category } = query;
    setRecipientCountryCode(recipientCountryCode as string);

    if (recipientCountryCode) {
      const countryDetails = lookup.byIso(recipientCountryCode as string)!;
      setCountryName(countryDetails.country);
    }

    setCategory(category as string);

    const params: URLSearchParams = new URLSearchParams(window.location.search);
    setSearchParams(params);

    if (!recipientCountryCode || !category) {
      setErrorMessage(
        'Recipient country and category are required. Please try again.'
      );
      return;
    }

    const activeCountries = ['US', 'ZA', 'KE'];

    const matchingMerchants: IMerchant[] = merchants.filter(
      (merchant) =>
        activeCountries.includes(recipientCountryCode as string) &&
        // merchant.countryCode === recipientCountryCode &&
        merchant.categories.includes(category as string)
    );

    if (matchingMerchants.length === 0) {
      setErrorMessage(
        `${category} vouchers are currently not available for ${
          countryName ?? recipientCountryCode
        }.`
      );

      const list = merchants
        .filter((merchant) => merchant.countryCode === recipientCountryCode)
        .map((merchant) => merchant.categories)
        .flat();
      setCategoryList(list);
      return;
    } else if (matchingMerchants.length > 0) {
      setMerchantList(matchingMerchants);
    }
  }, [router, router.query, merchants, countryName]);

  // const backHandler = () => {
  //   console.log('BACK');
  //   router.back();
  // };

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <div className={styles.description}>
        <p>Select Voucher Partner</p>
        <div>
          <Cart />
        </div>
      </div>

      <div className={styles.contentBody}>
        {errorMessage && (
          <div className={styles.errorMessage} style={{ textAlign: 'center' }}>
            <h4>{errorMessage}</h4>
            <br />
            <p>{activeCountriesMessage}</p>
          </div>
        )}
        {merchantList.length === 0 && (
          <div>
            <p></p>
            {categoryList.length > 0 && (
              <p>Available categories: {categoryList.join(', ')}</p>
            )}
          </div>
        )}
        <div className={styles.navSidedBody}>
          <SideNav />
          {merchantList.length > 0 && (
            <div>
              {merchantList.map((merchant) => (
                <div key={merchant.merchantId}>
                  <Link
                    href={`/select-voucher-type?merchantId=${
                      merchant.merchantId
                    }&${searchParams && searchParams.toString()}`}
                    className={styles.voucherButton}
                  >
                    {merchant.merchantName}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* <div className={styles.contentFooter}>
          <input
            type='button'
            className={`${styles.actionButton} ${styles.mediumEmphasis}`}
            value='Back'
            onClick={backHandler}
          />
        </div> */}
      </div>

      <Nav />
    </main>
  );
}

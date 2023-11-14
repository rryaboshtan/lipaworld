import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getUser } from '../services/AuthService';
import { useVouchers, useMerchants } from '@/context';
import { IVoucher, IMerchant } from '@/types';
import Nav from '../components/nav/Nav';
import { Montserrat } from 'next/font/google';
import NavMobile from '../components/navMobile/NavMobile';

const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '../styles/page.module.css';

export default function SelectVoucherType() {
  const vouchers: IVoucher[] = useVouchers();
  const merchants: IMerchant[] = useMerchants();

  const router = useRouter();
  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';

  const [voucherList, setVoucherList] = useState<IVoucher[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recipientCountryCode, setRecipientCountryCode] = useState<
    string | null
  >(null);
  const [category, setCategory] = useState<string | null>(null);
  const [merchantId, setMerchantId] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );

  useEffect(() => {
    const { query } = router;
    const { recipientCountryCode, category, merchantId } = query;

    console.log(merchantId, category, recipientCountryCode);
    console.log('v', vouchers);
    console.log('m', merchants);

    const params: URLSearchParams = new URLSearchParams(window.location.search);
    setSearchParams(params);

    setRecipientCountryCode(recipientCountryCode as string);
    setCategory(category as string);
    setMerchantId(merchantId as string);

    if (!recipientCountryCode || !merchantId || !category) {
      setErrorMessage('Missing order details.');
      return;
    }

    const matchingVouchers = vouchers.filter(
      (voucher) =>
        voucher.merchantId === merchantId &&
        voucher.redemptionCountryCode === recipientCountryCode &&
        voucher.categories.includes(category as string)
    );

    if (matchingVouchers.length === 0) {
      setErrorMessage(
        `${category} vouchers are currently not available for ${recipientCountryCode}  [TODO: Put country name] . Please leave your email address and we will notify you when they are available. [TODO: Add email form]`
      );

      const list = vouchers
        .filter(
          (merchant) => merchant.redemptionCountryCode === recipientCountryCode
        )
        .map((merchant) => merchant.categories)
        .flat();
      setCategoryList(list);
      return;
    } else if (matchingVouchers.length > 0) {
      setVoucherList(matchingVouchers);
    }
  }, [vouchers, merchants, merchantId, category, recipientCountryCode, router]);

  const cancelHandler = () => {
    console.log('CANCEL');
    router.push('/cancel');
  };

  const backHandler = () => {
    console.log('BACK');
    router.back();
  };

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile withCart={true} />

      <div className={styles.contentBody}>
        {errorMessage && (
          <div className={styles.errorMessage}>
            <p>{errorMessage}</p>
          </div>
        )}
        {voucherList.length === 0 && (
          <div>
            <p></p>
            {categoryList.length > 0 && (
              <p>Available categories: {categoryList.join(', ')}</p>
            )}
          </div>
        )}
        {voucherList.length > 0 && (
          <div>
            {voucherList.map((voucher) => (
              <div key={voucher.dealId} className={styles.dealHolder}>
                <Link
                  href={`/select-voucher-amount?dealId=${voucher.dealId}&${
                    searchParams && searchParams.toString()
                  }`}
                  className={styles.voucherButton}
                >
                  {voucher.voucherName}
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className={styles.contentFooter}>
          <input
            type='button'
            className={`${styles.actionButton} ${styles.mediumEmphasis}`}
            value='Back'
            onClick={backHandler}
          />
          <input
            type='button'
            className={`${styles.actionButton} ${styles.mediumEmphasis}`}
            value='Cancel'
            onClick={cancelHandler}
          />
        </div>
      </div>

      <Nav />
    </main>
  );
}

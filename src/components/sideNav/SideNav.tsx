import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useMerchants, useRecipients } from '@/context';
import { getUser } from '@services/AuthService';
import { IMerchant, IRecipient } from '@/types';
import styles from './SideNav.module.scss';
import mixpanel from 'mixpanel-browser';

function SideNav() {
  const merchants: IMerchant[] = useMerchants();
  const recipients: IRecipient[] = useRecipients();
  const user = getUser();
  const [categories, setCategories] = useState<string[]>([]);
  const [merchantList, setMerchantList] = useState<IMerchant[]>([]);
  const [returnUrl, setReturnUrl] = useState('');

  useEffect(() => {
    setReturnUrl(window.location.pathname + window.location.search);
  });

  useEffect(() => {
    if (merchants.length === 0) return;

    const topMerchants = [
      'Pick n Pay',
      'Vodacom',
      'MTN',
      'CellC',
      'Telkom',
      'Makro',
    ];
    const topCategories = [
      'Shopping',
      'Airtime',
      'Data',
      'Fuel',
      'Healthcare',
      'Utilities',
    ];

    // get unique categories
    const uniqueCategories = new Set<string>();
    const categories = merchants.flatMap((merchant) => merchant.categories);
    categories.forEach(
      (category) =>
        topCategories.includes(category) && uniqueCategories.add(category)
    );
    setCategories(Array.from(uniqueCategories));

    // get unique merchants
    const uniqueMerchantsMap = new Map<string, IMerchant>();
    // merchants.forEach((merchant) =>
    //   uniqueMerchantsMap.set(merchant.merchantName, merchant)
    // );
    merchants.forEach((merchant) => {
      if (topMerchants.includes(merchant.merchantName)) {
        uniqueMerchantsMap.set(merchant.merchantName, merchant);
      }
    });
    setMerchantList(Array.from(uniqueMerchantsMap.values()));
  }, [merchants]);

  const handleVoucherTypeClick = (type: string, value: string) => {
    mixpanel.track(`Voucher Selection: ${type} = ${value}`);
  };

  return merchants.length > 0 ? (
    <div className={styles.navHolder}>
      <div className={styles.title}>My Account</div>
      <ul className={styles.navList}>
        {user?.name ? (
          <Link href={`/user-settings`}>
            {' '}
            <li>{user.name}</li>
          </Link>
        ) : (
          <Link href={`/login`}>
            <li>Login</li>
          </Link>
        )}

        {/* <li>
          <Link href={`/voucher-history`}>Voucher History</Link>
        </li> */}
      </ul>
      <div className={styles.title}>Recipients:</div>
      <ul className={styles.navList}>
        {user?.name && (
          <Link href={`/my-recipients`}>
            {/* <Link href={`/select-recipient`}> */}
            <li>My Recipients</li>
          </Link>
        )}
        <Link href={`/create-recipient`}>
          <li>Create Recipient</li>
        </Link>
      </ul>
      <div className={styles.title}>Popular:</div>
      <ul className={styles.navList}>
        {categories.slice(0, 6).map((category, index) => (
          <Link
            onClick={() => handleVoucherTypeClick('category', category)}
            href={`/select-deal?recipientCountryCode=ZA&category=${category}`}
            key={index}
          >
            <li>{category}</li>
          </Link>
        ))}
        <Link href={`/?recipientCountryCode=ZA`}>
          <li>All categories +</li>
        </Link>
      </ul>
      {/* <div className={styles.title}>Popular Partners:</div>
      <ul className={styles.navList}>
        {merchantList.slice(0, 10).map((merchant, index) => (
          <Link
            onClick={() =>
              handleVoucherTypeClick('merchantId', merchant.merchantId)
            }
            href={`/select-deal?recipientCountryCode=ZA&merchantId=${merchant.merchantId}`}
            key={index}
          >
            <li>{merchant.merchantName}</li>
          </Link>
        ))}
        <Link href={`/?recipientCountryCode=ZA`}>
          <li>All Merchants + </li>
        </Link>
      </ul> */}
    </div>
  ) : (
    <div className={styles.navHolder} />
  );
}

export default SideNav;

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMerchants, useRecipients } from '@/context';
import { IMerchant, IRecipient } from '@/types';
import styles from './SideNav.module.scss';
import mixpanel from 'mixpanel-browser';

function SideNav() {
  const merchants: IMerchant[] = useMerchants();
  const recipients: IRecipient[] = useRecipients();
  const [categories, setCategories] = useState<string[]>([]);
  const [merchantList, setMerchantList] = useState<IMerchant[]>([]);

  useEffect(() => {
    if (merchants.length === 0) return;

    // get unique categories
    const uniqueCategories = new Set<string>();
    const categories = merchants.flatMap((merchant) => merchant.categories);
    categories.forEach((category) => uniqueCategories.add(category));
    setCategories(Array.from(uniqueCategories));

    // get unique merchants
    const uniqueMerchantsMap = new Map<string, IMerchant>();
    merchants.forEach((merchant) =>
      uniqueMerchantsMap.set(merchant.merchantName, merchant)
    );
    setMerchantList(Array.from(uniqueMerchantsMap.values()));
  }, [merchants]);

  const handleVoucherTypeClick = (type: string, value: string) => {
    mixpanel.track(`Voucher Selection: ${type} = ${value}`);
  };

  return merchants.length > 0 ? (
    <div className={styles.navHolder}>
      <div className={styles.title}>Recipient:</div>
      <ul className={styles.navList}>
        {recipients.length > 0 && (
          <>
            <li>
              <Link href={`/select-recipient`}>{recipients[0].name} </Link>
              <Image
                height={10}
                width={20}
                alt={`${recipients[0].countryCode}`}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${recipients[0].countryCode}.svg`}
              />
            </li>
            {recipients.length > 1 && (
              <li>
                <Link href={`/select-recipient`}>Change Recipient</Link>
              </li>
            )}
          </>
        )}
        <li>
          <Link href={`/create-recipient`}>Create Recipient</Link>
        </li>
      </ul>
      <div className={styles.title}>My Account</div>
      <ul className={styles.navList}>
        <li>
          <Link href={`/voucher-history`}>Voucher History</Link>
        </li>
        <li>
          <Link href={`/select-recipient`}>My Recipients</Link>
        </li>
      </ul>
      <div className={styles.title}>Popular:</div>
      <ul className={styles.navList}>
        {categories.slice(0, 5).map((category, index) => (
          <li key={index}>
            <Link
              onClick={() => handleVoucherTypeClick('category', category)}
              href={`/select-deal?recipientCountryCode=ZA&category=${category}`}
            >
              {category}
            </Link>
          </li>
        ))}
        <li>
          <Link href={`/?recipientCountryCode=ZA`}>All categories</Link>
        </li>
      </ul>
      <div className={styles.title}>Popular Partners:</div>
      <ul className={styles.navList}>
        {merchantList.slice(0, 10).map((merchant, index) => (
          <li key={index}>
            <Link
              onClick={() =>
                handleVoucherTypeClick('merchantId', merchant.merchantId)
              }
              href={`/select-deal?recipientCountryCode=ZA&merchantId=${merchant.merchantId}`}
            >
              {merchant.merchantName}
            </Link>
          </li>
        ))}
        <li>
          <Link href={`/?recipientCountryCode=ZA`}>All Partners</Link>
        </li>
      </ul>
    </div>
  ) : (
    <div className={styles.navHolder} />
  );
}

export default SideNav;

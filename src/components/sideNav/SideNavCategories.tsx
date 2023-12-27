import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IMerchant } from '@/types';
import styles from './SideNav.module.scss';
import mixpanel from 'mixpanel-browser';
import { useMerchants } from '@/context';

const SideNavCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const merchants: IMerchant[] = useMerchants();

  const handleVoucherTypeClick = (type: string, value: string) => {
    mixpanel.track(`Category selection: ${type} = ${value}`);
  };

  useEffect(() => {
    if (merchants.length === 0) return;

    const topCategories = [
      'Shopping',
      'Airtime',
      'Data',
      'Fuel',
      'Healthcare',
      'Utilities',
    ];

    const uniqueCategories = new Set<string>();
    const categoryList = merchants.flatMap((merchant) => merchant.categories);
    categoryList.forEach(
      (category) =>
        topCategories.includes(category) && uniqueCategories.add(category)
    );
    setCategories(Array.from(uniqueCategories));
  }, [merchants]);

  return (
    <>
      <div className={styles.title}>Popular:</div>
      {merchants.length > 0 ? (
        <ul className={styles.navList}>
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category}
              onClick={() => handleVoucherTypeClick('category', category)}
              href={`/select-deal?recipientCountryCode=ZA&category=${category}`}
            >
              <li>{category}</li>
            </Link>
          ))}
          <Link href={`/?recipientCountryCode=ZA`}>
            <li>All categories +</li>
          </Link>
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};

export default SideNavCategories;

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IMerchant } from '@/types';
import styles from './SideNav.module.scss';
import mixpanel from 'mixpanel-browser';
import { useMerchants } from '@/context';
import TopMerchants from '@/constants/TopMerchants';

const SideNavMerchants = () => {
  const [merchantList, setMerchantList] = useState<IMerchant[]>([]);

  const merchants: IMerchant[] = useMerchants();

  const handleVoucherTypeClick = (type: string, value: string) => {
    mixpanel.track(`Merchant selection: ${type} = ${value}`);
  };

  useEffect(() => {
    if (merchants.length === 0) return;
    const uniqueMerchantsMap = new Map<string, IMerchant>();
    const uniqueMerchantNames: string[] = [];
    merchants.forEach((merchant) => {
      const merchantName = merchant.merchantName.trim();
      if (
        TopMerchants.includes(merchantName) &&
        !uniqueMerchantNames.includes(merchantName)
      ) {
        uniqueMerchantsMap.set(merchant.merchantName, merchant);
      }
    });
    setMerchantList(Array.from(uniqueMerchantsMap.values()));
  }, [merchants]);

  return (
    <>
      <div className={styles.title}>Popular Partners:</div>
      <nav>
        <ul className={styles.navList}>
          {merchantList.slice(0, 10).map((merchant) => (
            <Link
              key={merchant.merchantId}
              onClick={() =>
                handleVoucherTypeClick('merchantId', merchant.merchantId)
              }
              href={`/select-deal?recipientCountryCode=ZA&merchantId=${merchant.merchantId}`}
            >
              <li>{merchant.merchantName}</li>
            </Link>
          ))}
          {/* <Link href={`/?recipientCountryCode=ZA`}>
          <li>All Merchants + </li>
        </Link> */}
        </ul>
      </nav>
    </>
  );
};

export default SideNavMerchants;

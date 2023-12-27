// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import Img from 'next/image';
// import { useUser } from '@/context';
// import { IRecipient } from '@/types';
// import { useDispatchRecipients } from '@/context';
// import { TextField } from '@mui/material';
// import mixpanel from 'mixpanel-browser';
import NavMobile from '../components/navMobile/NavMobile';

import SideNav from '../components/sideNav/SideNav';
import Nav from '../components/nav/Nav';
import Cart from '../components/cart/Cart';
import { Montserrat } from 'next/font/google';

import styles from '../styles/page.module.css';
import { IVoucher } from '@/types';
import { useDispatchVouchers, useVouchers } from '@/context';
import React, { useEffect, useState } from 'react';
import { useUser } from '@/context';
import VoucherCard from '@components/voucherCard/VoucherCard';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function VoucherHistory() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const vouchers: IVoucher[] = useVouchers();
  const user = useUser();
  const dispatchVouchers = useDispatchVouchers();

  // get my vouchers request
  useEffect(() => {
    if (user?.id) {
      fetch(`${process.env.NEXT_PUBLIC_API_VOUCHERS_URL}/${user.id}`)
        .then((response: any) => {
          if (response.ok) {
            dispatchVouchers({
              type: 'SET_VOUCHERS',
              payload: response.data,
            });
          }
        })
        .catch((error: any) => {
          console.log(error);
          setErrorMessage('Something went wrong. Please try again later.');
        });
    }
  }, [user]);

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile withCart={true} />

      <div className={styles.contentBody}>
        <div className={styles.navSidedBody}>
          <SideNav />
          <div>
            <div className={styles.pageHeading}>Voucher History</div>
            <br />
            <br />
            <div className={styles.dealHolder}>
              {vouchers.map((voucher, index) => (
                <VoucherCard
                  key={index}
                  voucher={voucher}
                  currencyRate={1}
                  voucherQuantity={1}
                  isHistory
                  setErrorMessage={setErrorMessage}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Nav />
    </main>
  );
}

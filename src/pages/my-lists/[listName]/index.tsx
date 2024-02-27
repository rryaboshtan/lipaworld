import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLists, useUser } from '@/context';
import { IVoucher } from '@/types';
import SideNav from '../../../components/sideNav/SideNav';
import NavMobile from '../../../components/navMobile/NavMobile';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '../../../styles/page.module.css';
import s from './myList.module.scss';
import VoucherCard from '@components/voucherCard/VoucherCard';

export default function List() {
  const router = useRouter();
  const lists = useLists();
  const user = useUser();
  const { query } = router;
  const { listName } = query;

  const [currencyRate, setCurrencyRate] = useState<number>(1);
  const [vouchers, setVouchers] = useState<IVoucher[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  useEffect(() => {
    const list = lists.find((item) => item.listName === listName);
    if (listName && list) {
      setVouchers(list.vouchers);
    }
  }, [listName, lists]);

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile withCart={true} />
      <div className={styles.contentBody}>
        <div className={styles.navSidedBody}>
          <SideNav />

          <div className={s.flex}>
            <div className={s.listName}>{listName}</div>
            <div className={styles.dealHolder}>
              {errorMessage && (
                <div
                  className={styles.errorMessage}
                  style={{ margin: '0 0 1rem 1rem' }}
                >
                  <p>{errorMessage}</p>
                  <br />
                </div>
              )}
              {vouchers.map((voucher, index) => (
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
        </div>

        <div className={styles.contentFooter}></div>
      </div>
    </main>
  );
}

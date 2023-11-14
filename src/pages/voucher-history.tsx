// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import Img from 'next/image';
// import { getUser } from '../services/AuthService';
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

const montserrat = Montserrat({ subsets: ['latin'] });

export default function CreateRecipient() {
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
          </div>
        </div>
      </div>

      <Nav />
    </main>
  );
}

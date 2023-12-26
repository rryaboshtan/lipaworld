import { useState } from 'react';
import { getUser, resetUserSession } from '../services/AuthService';
import { useRouter } from 'next/router';
import SideNav from '../components/sideNav/SideNav';
import { Montserrat } from 'next/font/google';
import NavMobile from '../components/navMobile/NavMobile';

const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '../styles/page.module.css';
// import axios from 'axios';

export default function UserSettings() {
  const router = useRouter();
  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';
  // const [message, setMessage] = useState<null | string>(null);

  user === undefined && router.push('/login');

  const logoutHandler = () => {
    resetUserSession();
    router.push('/select-deal?recipientCountryCode=ZA&category=Airtime');
  };

  // const handleUnsubscribe = async () => {
  //   const unsubscribeUrl = `${process.env.NEXT_PUBLIC_API_USERS_URL}/unsubscribe`;

  //   const requestConfig = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
  //     },
  //   };

  //   const requestBody = {
  //     id: user.id,
  //     email: user.email,
  //   };

  //   try {
  //     const response = await axios.post(
  //       unsubscribeUrl,
  //       requestBody,
  //       requestConfig
  //     );
  //     setMessage('Unsubscribe successful');
  //   } catch (error: any) {
  //     if (error.response?.status === 401 || error.response?.status === 403) {
  //       setMessage('Invalid credentials');
  //     } else {
  //       setMessage('Something went wrong. Please try again later');
  //     }
  //     console.log(error);
  //   }
  // };

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile withCart={true} />

      <div className={styles.contentBody}>
        <div className={styles.navSidedBody}>
          <SideNav />
          <div>
            <div className={styles.pageHeading}>Settings</div>
            <br />
            <br />
            Name: {name}
            <br />
            <br />
            Email: {user?.email}
            <p></p>
            <br />
            <div>
              {/* <input
                type='button'
                className={styles.actionButton}
                value='Unsubscribe'
                onClick={handleUnsubscribe}
              /> */}
              <input
                type='button'
                className={styles.actionButton}
                value='Log me out'
                onClick={logoutHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

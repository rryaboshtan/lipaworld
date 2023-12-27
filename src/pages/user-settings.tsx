import { resetUserSession } from '../services/AuthService';
import { useUser, useDispatchUser } from '@/context';
import { useRouter } from 'next/router';
import SideNav from '../components/sideNav/SideNav';
import { Montserrat } from 'next/font/google';
import NavMobile from '../components/navMobile/NavMobile';

const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '../styles/page.module.css';
// import axios from 'axios';

export default function UserSettings() {
  const router = useRouter();
  const user = useUser();
  const dispatchUser = useDispatchUser();
  // const [message, setMessage] = useState<null | string>(null);

  if (user === null) {
    router.push('/login');
  }

  const logoutHandler = () => {
    dispatchUser({ type: 'SET_USER', payload: null });

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
            Name: {user?.name}
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

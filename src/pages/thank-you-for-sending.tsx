import { useRouter } from 'next/router';
import Img from 'next/image';
import { getUser } from '../services/AuthService';
import Nav from '../components/nav/Nav';
import Cart from '../components/cart/Cart';
import { Montserrat } from 'next/font/google';
import NavMobile from '../components/navMobile/NavMobile';

const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '../styles/page.module.css';

export default function ThankYou() {
  const router = useRouter();
  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';

  const goHomeHandler = () => {
    console.log('GO HOME');
    router.push('/');
  };

  // const selectCountryHandler = () => {
  //   console.log('SELECT COUNTRY');
  //   router.push('/select-country');
  // };

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile />

      <div className={styles.contentBody}>
        <p></p>
        <div className={styles.contentFooter}>
          <input
            type='button'
            className={`${styles.actionButton} ${styles.mediumEmphasis}`}
            value='Buy Another Voucher'
            onClick={goHomeHandler}
          />
          {/* <input
            type='button'
            className={styles.actionButton}
            value='Home'
            onClick={goHomeHandler}
          /> */}
        </div>
      </div>

      <Nav />
    </main>
  );
}

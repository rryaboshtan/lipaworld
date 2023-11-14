import { getUser, resetUserSession } from '../services/AuthService';
import { useRouter } from 'next/router';
import Nav from '../components/nav/Nav';
import Cart from '../components/cart/Cart';
import { Montserrat } from 'next/font/google';
import NavMobile from '../components/navMobile/NavMobile';

const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '../styles/page.module.css';

export default function UserSettings() {
  const router = useRouter();
  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';

  const logoutHandler = () => {
    resetUserSession();
    router.push('/');
    // window.location.href = '/';
  };

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile withCart={true} />

      <div className={styles.contentBody}>
        {name ? `Hello ${name}!` : 'Hello!'} Welcome to Settings.
        <p></p>
        <input
          type='button'
          className={styles.actionButton}
          value='Log me out'
          onClick={logoutHandler}
        />
      </div>

      <Nav />
    </main>
  );
}

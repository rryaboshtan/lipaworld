import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getUser } from '../services/AuthService';
import { useDispatchRecipients, useRecipients } from '@/context';
import Nav from '../components/nav/Nav';
import SideNav from '../components/sideNav/SideNav';
import NavMobile from '../components/navMobile/NavMobile';
import { Montserrat } from 'next/font/google';
import styles from '../styles/page.module.css';
import RecipientCard from '@components/recipientCard/RecipientCard';
import { IRecipient } from '@/types';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function MyRecipients() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const recipients = useRecipients();
  const dispatchRecipients = useDispatchRecipients();

  const router = useRouter();
  const user = getUser();

  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );

  useEffect(() => {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    setSearchParams(params);
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (user?.id && recipients.length === 0) {
      setIsLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_API_RECIPIENTS_URL}/recipients?userId=${user.id}`
      )
        .then((res) => res.json())
        .then((res: { recipients: IRecipient[] }) => {
          if (isMounted) {
            dispatchRecipients({
              type: 'ADD_RECIPIENTS',
              payload: res.recipients,
            });
            setIsLoading(false);
          }
        })
        .catch((error: any) => {
          console.log(error);
          if (isMounted) {
            setErrorMessage('Something went wrong. Please try again later.');
            setIsLoading(false);
          }
        });
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const createRecipientHandler = () => {
    router.push(
      `/create-recipient/?${searchParams && searchParams.toString()}`
    );
  };

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile withCart={true} />

      <div className={styles.contentBody}>
        <div className={styles.navSidedBody}>
          <SideNav />

          <div className={styles.dealHolder}>
            <div className={styles.pageHeading}>My recipients</div>
            {isLoading ? (
              <CircularProgress style={{ color: '#0fbc49' }} />
            ) : recipients.length > 0 ? (
              recipients.map((recipient, index) => (
                <RecipientCard recipient={recipient} key={index} />
              ))
            ) : (
              <div>
                No recipients found.
                <br />
                <br />
                <Link href='/create-recipient' className={styles.actionLink}>
                  Create a recipient
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className={styles.contentFooter}>
          {recipients.length > 0 && (
            <input
              type='button'
              className={`${styles.actionButton} ${styles.mediumEmphasis}`}
              value='Create new recipient'
              onClick={createRecipientHandler}
            />
          )}
        </div>
        {/* <Nav /> */}
      </div>
    </main>
  );
}

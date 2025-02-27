import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatchLists, useLists, useUser } from '@/context';
import { useRecipients } from '@/context';
import SideNav from '../../components/sideNav/SideNav';
import NavMobile from '../../components/navMobile/NavMobile';
import { Montserrat } from 'next/font/google';
import styles from '../../styles/page.module.css';
import { IList } from '@/types';
import ListCard from '@/components/listCard/ListCard';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function MyLists() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const lists = useLists();
  const recipients = useRecipients();
  const dispatchLists = useDispatchLists();

  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  // useEffect(() => {
  //   let isMounted = true;

  //   if (user?.id && lists.length === 0) {
  //     setIsLoading(true);
  //     fetch(
  //       `${process.env.NEXT_PUBLIC_API_RECIPIENTS_URL}/lists?userId=${user.id}`
  //     )
  //       .then((res) => res.json())
  //       .then((res: { lists: IList[] }) => {
  //         if (isMounted && res.lists.length > 0) {
  //           dispatchLists({
  //             type: 'ADD_LISTS',
  //             payload: res.lists,
  //           });
  //           setIsLoading(false);
  //         }
  //       })
  //       .catch((error: any) => {
  //         console.log(error);
  //         if (isMounted) {
  //           setErrorMessage('Something went wrong. Please try again later.');
  //           setIsLoading(false);
  //         }
  //       });
  //   } else {
  //     setIsLoading(false);
  //   }

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  const onCreateList = () => {
    router.push('/create-list');
  };

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile withCart={true} />

      <div className={styles.contentBody}>
        <div className={styles.navSidedBody}>
          <SideNav />

          <div className={styles.listsHolder}>
            <div className={styles.pageHeading}>My lists</div>
            {isLoading ? (
              <CircularProgress style={{ color: '#0fbc49' }} />
            ) : lists.length > 0 ? (
              lists.map((list, index) => (
                <ListCard
                  list={list}
                  recipient={
                    recipients.find((item) => item.id === list.recipientId)!
                  }
                  key={index}
                />
              ))
            ) : (
              <div>
                No lists found.
                <br />
                <br />
                <Link href="/create-list" className={styles.actionLink}>
                  Create a list
                </Link>
              </div>
            )}
            <div className={styles.contentFooter}>
              {lists.length > 0 && (
                <input
                  type="button"
                  className={`${styles.actionButton} ${styles.mediumEmphasis}`}
                  value="Create new list"
                  onClick={onCreateList}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

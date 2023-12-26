import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Img from 'next/image';
import Link from 'next/link';
import { getUser } from '../services/AuthService';
import { useRecipients } from '@/context';
import Nav from '../components/nav/Nav';
// import RecipientButtons from '../components/recipientButtons/RecipientButtons';
import SideNav from '../components/sideNav/SideNav';
import NavMobile from '../components/navMobile/NavMobile';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '../styles/page.module.css';

export default function SelectRecipient() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recipients = useRecipients();

  const router = useRouter();
  const user = getUser();

  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );

  useEffect(() => {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    setSearchParams(params);
  }, []);

  const createRecipientHandler = () => {
    router.push(`/create-recipient`);
  };

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile withCart={true} />

      <div className={styles.contentBody}>
        <div className={styles.navSidedBody}>
          <SideNav />

          <div className={styles.dealHolder}>
            <div className={styles.pageHeading}>Select a recipient</div>

            {recipients.length > 0 ? (
              recipients.map(
                (recipient, index) =>
                  recipient.name && (
                    <div key={index} className={styles.dealPanel}>
                      <div
                        className={` ${styles.amounts}`}
                        style={{ margin: '12px' }}
                      >
                        <div className={styles.dealVoucherName}>
                          {recipient.name} {recipient.surname}
                        </div>
                        <div className={styles.amountRedemption}>
                          Mobile Number: {recipient.mobileNumber}
                        </div>
                        <div
                          className={styles.amountRedemption}
                          style={{ marginTop: '8px' }}
                        >
                          <Img
                            height={10}
                            width={20}
                            alt={`${recipients[0].countryCode}`}
                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${recipients[0].countryCode}.svg`}
                          />
                        </div>
                      </div>
                      {/* <RecipientButtons
                        isSelected={index === 0}
                        recipient={recipient}
                        setErrorMessage={setErrorMessage}
                      /> */}
                    </div>
                  )
              )
            ) : (
              <div>
                No recipients found. <br />
                <br />
                <Link href={`/create-recipient`} className={styles.actionLink}>
                  Create a recipient
                </Link>
                .
              </div>
            )}
          </div>
        </div>
        <div className={styles.contentFooter}>
          <input
            type='button'
            className={`${styles.actionButton} ${styles.mediumEmphasis}`}
            value='Create new recipient'
            onClick={createRecipientHandler}
          />
        </div>

        <Nav />
      </div>
    </main>
  );
}

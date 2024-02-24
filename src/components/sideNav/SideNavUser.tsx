import React from 'react';
import Link from 'next/link';
import { useUser } from '@/context';
import styles from './SideNav.module.scss';

const SideNavUser = () => {
  const user = useUser();

  return (
    <>
      <div className={styles.title}>My Account</div>
      <ul className={styles.navList}>
        {user ? (
          <Link href={`/user-settings`}>
            <li>{user.name}</li>
          </Link>
        ) : (
          <>
            <Link href={`/login`}>
              <li>Login</li>
            </Link>
            <Link href={`/register`}>
              <li>Register</li>
            </Link>
          </>
        )}
        {/* <li>
      <Link href={`/voucher-history`}>Voucher History</Link>
    </li> */}
      </ul>
      <div className={styles.title}>Recipients:</div>
      <ul className={styles.navList}>
        {user && (
          <Link href={`/my-recipients`}>
            <li>My Recipients</li>
          </Link>
        )}
        <Link href={`/create-recipient`}>
          <li>Create Recipient</li>
        </Link>
      </ul>
      <div className={styles.title}>Wish lists</div>
      <ul className={styles.navList}>
        {user && (
          <Link href={`/my-lists`}>
            <li>My lists</li>
          </Link>
        )}
        <Link href={`/create-list`}>
          <li>Create list</li>
        </Link>
      </ul>
    </>
  );
};

export default SideNavUser;

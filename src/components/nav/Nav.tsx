import React, { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import axios from 'axios';
import {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
} from '../../services/AuthService';
import { useDispatchCart, useDispatchTransaction } from '@/context';
import styles from './Nav.module.scss';

function Nav() {
  const dispatchCart = useDispatchCart();
  const dispatchTransaction = useDispatchTransaction();

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    if (!isAuthed) {
      const verifyTokenUrl = `${process.env.NEXT_PUBLIC_API_USERS_URL}/verify`;
      const token = getToken();
      if (
        token === 'undefined' ||
        token === undefined ||
        token === null ||
        !token
      ) {
        // console.log('no token');
        return;
      }

      const requestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      };

      const requestBody = {
        user: getUser(),
        token,
      };

      axios
        .post(verifyTokenUrl, requestBody, requestConfig)
        .then((response) => {
          setUserSession(response.data.token, response.data.user);
          // console.log('response', response.data);
          setIsAuthed(true);
          setIsAuthenticating(false);
        })
        .catch((error) => {
          // console.log('error', error);
          setIsAuthed(false);
          setIsAuthenticating(false);
          resetUserSession();
        });
    }
  }, [isAuthed]);

  useEffect(() => {
    const sessionCartId: string | null = sessionStorage.getItem('cartId');
    const provisionalCartId: string | null =
      sessionStorage.getItem('provisionalCartId');

    if (sessionCartId || provisionalCartId) {
      console.log('sessionCartId', sessionStorage.getItem('cartId'));
      console.log(
        'provisionalCartId',
        sessionStorage.getItem('provisionalCartId')
      );

      dispatchCart({
        type: 'SET_CART_ID',
        payload: (provisionalCartId || sessionCartId)!,
      });
      dispatchTransaction({
        type: 'SET_CART_ID',
        payload: (provisionalCartId || sessionCartId)!,
      });

      return;
    } else {
      const url = `${process.env.NEXT_PUBLIC_API_CONFIGURATIONS_URL}/v1/cart/cartid`;
      axios
        .post(url)
        .then((response) => {
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('provisionalCartId', response.data.cartId);
          } else {
            // Fallback to using cookies
            document.cookie = `provisionalCartId=${response.data.transactionId}; path=/`;
          }
          dispatchCart({
            type: 'SET_CART_ID',
            payload: response.data.cartId,
          });
          dispatchTransaction({
            type: 'SET_CART_ID',
            payload: response.data.cartId,
          });
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }, []);

  useEffect(() => {
    const sessionTransactionId: string | null =
      sessionStorage.getItem('transactionId');

    if (sessionTransactionId) {
      console.log(
        'sessionTransactionId',
        sessionStorage.getItem('transactionId')
      );

      dispatchTransaction({
        type: 'SET_TRANSACTION_ID',
        payload: sessionTransactionId!,
      });

      return;
    } else {
      const url = `${process.env.NEXT_PUBLIC_API_CONFIGURATIONS_URL}/v1/transactions/transactionid`;
      axios
        .post(url)
        .then((response) => {
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem(
              'transactionId',
              response.data.transactionId
            );
          } else {
            // Fallback to using cookies
            document.cookie = `transactionId=${response.data.transactionId}; path=/`;
          }
          dispatchTransaction({
            type: 'SET_TRANSACTION_ID',
            payload: response.data.transactionId,
          });
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }, []);

  return (
    <div className={styles.grid} id='nav'>
      {/* <Link href='/' className={styles.card}>
        <h2>
          Home <span>-&gt;</span>
        </h2>
        <p>See overview</p>
      </Link> */}
      {!isAuthed && !isAuthenticating && (
        <>
          <Link href='/register' className={styles.card}>
            <h2>
              Register <span>-&gt;</span>
            </h2>
            <p>Join us now</p>
          </Link>
          <Link href='/login' className={styles.card}>
            <h2>
              Login <span>-&gt;</span>
            </h2>
            <p>Jump to login page</p>
          </Link>
        </>
      )}

      {isAuthed && !isAuthenticating && (
        <>
          <Link href='/user-settings' className={styles.card}>
            <h2>
              My Account <span>-&gt;</span>
            </h2>
            <p> User Settings</p>
          </Link>
        </>
      )}
    </div>
  );
}

export default Nav;

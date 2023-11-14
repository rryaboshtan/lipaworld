import React from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/context';
import { ICart } from '@/types';
import styles from './Cart.module.scss';

function Cart() {
  const router = useRouter();
  const cart: ICart | null = useCart();

  const routeToCart = () => {
    router.push({
      pathname: '/cart',
    });
  };

  return (
    <div className={styles.cartWrapper} onClick={routeToCart}>
      {cart && cart?.cartItems.length > 0 && (
        <div className={styles.quantity}>{cart.cartItems.length}</div>
      )}
      <FontAwesomeIcon
        style={{ fontSize: '18px', color: 'darkgrey' }}
        icon={faCartShopping}
      ></FontAwesomeIcon>
    </div>
  );
}

export default Cart;

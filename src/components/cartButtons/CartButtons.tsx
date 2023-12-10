import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  // useVouchers,
  // useCountries,
  // useDispatchTransaction,
  // useRecipients,
  useCart,
  useDispatchCart,
} from '@/context';
import { IVoucher } from '@/types';
import styles from './CartButtons.module.scss';

interface ICartButtonsProps {
  deal: IVoucher;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  quantity: number
  isHistory?: boolean
}

function CartButtons({ deal, setErrorMessage, quantity, isHistory }: ICartButtonsProps) {
  const [isCarted, setIsCarted] = useState<boolean>(false);
  const dispatchCart = useDispatchCart();
  const cart = useCart();

  const router = useRouter();

  const routeToCart = () => {
    router.push(`/cart`);
  };

  const addtoCartHandler = (
    deal: IVoucher,
    amount: number
  ) => {
    console.log('ADD TO CART', { ...deal, quantity: quantity });

    try {
      if (amount && quantity && deal) {
        dispatchCart({
          type: 'ADD_CART_ITEM',
          payload: {
            voucherId: deal.dealId as string,
            redemptionUnitValue: amount,
            quantity,
            deal: deal,
            cartItemId: `${deal.dealId}-${amount}`,
          },
        });
      } else {
        console.log('ERROR');
        throw new Error('Missing important order details.');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  
  const resendHandler = () => {
    addtoCartHandler(deal, deal.redemptionValues[0])
    router.push(`/cart`);    
  }
  
  useEffect(() => {
    console.log('CART ITEMS', cart?.cartItems);
    if (cart && cart.cartItems.length > 0 && deal.dealId) {
      cart.cartItems.find((item) => item.deal.dealId === deal.dealId)
        ? setIsCarted(true)
        : setIsCarted(false);
    }
  }, [cart?.cartItems, deal]);

  return (
    <div className={styles.cartHolder}>
      {isHistory &&
       <button
        className={styles.cart}
        onClick={() => resendHandler()}
       >
        Resend
       </button>
      }
      {!isCarted ? (
        <button
          className={styles.cart}
          onClick={() => addtoCartHandler(deal, deal.redemptionValues[0])}
        >
          Add to Cart
        </button>
      ) : (
        <>
          <button className={styles.cartAdded}>Added to Cart</button>
          <button className={styles.cart} onClick={routeToCart}>
            Go to Cart
          </button>
        </>
      )}
    </div>
  );
}

export default CartButtons;

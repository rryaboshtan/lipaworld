import React, { Dispatch } from 'react';
import { useRouter } from 'next/router';
import { getUser } from '@/services/AuthService';
import { useDispatchCart } from '@/context';
import { IVoucher, IRecipient } from '@/types';
import styles from './CartButtons.module.scss';

interface ICartButtonsProps {
  deal: IVoucher;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  quantity: number;
  isHistory?: boolean;
  disabled?: boolean;
  productRecipient?: IRecipient | null;
  setProductRecipient: Dispatch<IRecipient | null>;
}

function CartButtons({
  deal,
  setErrorMessage,
  quantity,
  isHistory,
  productRecipient,
  setProductRecipient,
}: ICartButtonsProps) {
  const dispatchCart = useDispatchCart();
  const user = getUser();
  const router = useRouter();

  const readyForCart = user?.name && productRecipient;

  const addtoCartHandler = (deal: IVoucher, amount: number) => {
    console.log('ADD TO CART', { ...deal, quantity: quantity });

    try {
      const allCartDetails = amount && quantity && deal && productRecipient;
      if (allCartDetails) {
        dispatchCart({
          type: 'ADD_CART_ITEM',
          payload: {
            voucherId: deal.dealId as string,
            redemptionUnitValue: amount,
            quantity,
            deal: deal,
            cartItemId: `${deal.dealId}-${amount}`,
            productRecipient: productRecipient,
          },
        });
        setProductRecipient(null);
      } else {
        setErrorMessage('Missing important order details.');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  const resendHandler = () => {
    addtoCartHandler(deal, deal.redemptionValues[0]);
    router.push(`/cart`);
  };

  return (
    <div className={styles.cartHolder}>
      {isHistory && (
        <button className={styles.cart} onClick={() => resendHandler()}>
          Resend
        </button>
      )}
      <button
        className={styles.cart}
        onClick={() => addtoCartHandler(deal, deal.redemptionValues[0])}
        disabled={!readyForCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default CartButtons;

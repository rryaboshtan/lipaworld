import React, { Dispatch, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatchLists, useLists, useUser } from '@/context';
import { useDispatchCart } from '@/context';
import { IVoucher, IRecipient, IList } from '@/types';
import styles from './CartButtons.module.scss';
import { CircularProgress, MenuItem, Select } from '@mui/material';
import Image from 'next/image';
import deleteIcon from '../../../public/img/delete.svg';

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
  const dispatchLists = useDispatchLists();
  const dispatchCart = useDispatchCart();
  const user = useUser();
  const router = useRouter();
  const { asPath, query } = router;
  const { listName } = query;
  const lists = useLists();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [choosedList, setChoosedList] = useState('Add to wish list');

  const readyForCart = user?.name && productRecipient;

  const addtoCartHandler = (deal: IVoucher, amount: number) => {
    if (!readyForCart) {
      toast.warn('Create recipient before adding to cart.', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }

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

  const listItemClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    list: IList
  ) => {
    dispatchLists({
      type: 'ADD_VOUCHER_TO_LIST',
      payload: { id: list.id, voucher: deal },
    });

    toast.success(`Voucher was added to list ${list.listName}`, {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    // fetch(`${process.env.NEXT_PUBLIC_API_RECIPIENTS_URL}/add-voucher-to-list`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(list.id),
    // })
    //   .then((response: any) => {
    //     if (response.ok) {
    //       dispatchLists({
    //         type: 'DELETE_LIST',
    //         payload: list.listName,
    //       })

    //       toast.success('List created.', {
    //         position: toast.POSITION.BOTTOM_LEFT,
    //       })

    //       router.push('/select-deal?recipientCountryCode=ZA&category=Shopping')
    //     }
    //   })
    //   .catch((error: unknown) => {
    //     setMessage('Something went wrong. Please try again later.')
    //   })
  };

  const onDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsLoading(true);
    // setMessage(null)

    dispatchLists({
      type: 'DELETE_VOUCHER_FROM_LIST',
      payload: { listName: listName as string, dealId: deal.dealId },
    });

    toast.success(`Voucher ${deal.voucherName} deleted from list.`, {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    // fetch(`${process.env.NEXT_PUBLIC_API_RECIPIENTS_URL}/delete-list`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(list.id),
    // })
    //   .then((response: any) => {
    //     if (response.ok) {
    //       dispatchLists({
    //         type: 'DELETE_LIST',
    //         payload: list.listName,
    //       })

    //       toast.success(`Recipient ${deal.voucherName} deleted from list.`, {
    //          position: toast.POSITION.BOTTOM_LEFT,
    //       });

    //       router.push('/select-deal?recipientCountryCode=ZA&category=Shopping')
    //     }
    //   })
    //   .catch((error: unknown) => {
    //     setMessage('Something went wrong. Please try again later.')
    //   })
    setIsLoading(false);
  };

  return (
    <div className={styles.cartHolder}>
      <div>
        {isHistory && (
          <button className={styles.cart} onClick={() => resendHandler()}>
            Resend
          </button>
        )}
        {deal.status === 'OutOfStock' ? (
          <button className={styles.cart} disabled>
            Out of stock
          </button>
        ) : (
          <button
            className={styles.cart}
            onClick={() => addtoCartHandler(deal, deal.redemptionValues[0])}
            // disabled={!readyForCart}
          >
            Add to Cart
          </button>
        )}
      </div>
      {/* {user && ( */}
      {asPath.includes('my-list') ? (
        <div className={styles.deleteIcon} onClick={onDelete}>
          <Image src={deleteIcon} alt="delete icon" />
        </div>
      ) : (
        <div className={styles.listNames}>
          <Select
            sx={{ width: '150px', height: '36px', fontSize: '13.3px' }}
            aria-labelledby="Add to wish list"
            name="addToWishList"
            value={choosedList}
            onChange={(e) => setChoosedList(e.target.value)}
            required
            style={{ backgroundColor: '#ffffff' }}
          >
            <MenuItem sx={{ fontSize: '13.3px' }} value="Add to wish list">
              Add to wish list
            </MenuItem>
            {lists.map((list, index) => (
              <MenuItem
                sx={{ width: '150px', fontSize: '13.3px' }}
                key={index}
                value={list.listName}
                onClick={(e) => listItemClick(e, list)}
              >
                {list.listName}
              </MenuItem>
            ))}

            <MenuItem
              sx={{
                fontSize: '13.3px',
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
              }}
              value="Create list"
              onClick={() => router.push('/create-list')}
            >
              <div className={styles.createList}>
                {/* <Image src={plus} alt="Plus" /> */}
                <div>+</div>
                <div>Create list</div>
              </div>
            </MenuItem>
          </Select>
        </div>
      )}

      {message && <p className={styles.errorMessage}>{message}</p>}
      {isLoading && <CircularProgress size={24} color="success" />}
    </div>
  );
}

export default CartButtons;

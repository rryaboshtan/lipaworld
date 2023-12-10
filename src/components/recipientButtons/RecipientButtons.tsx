import React from 'react';
import { useDispatchRecipients } from '@/context';
import { IRecipient } from '@/types';
import styles from './RecipientButtons.module.scss';

interface IRecipientButtonsProps {
  isSelected: boolean;
  recipient: IRecipient;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

function RecipientButtons({
  isSelected,
  recipient,
  setErrorMessage,
}: IRecipientButtonsProps) {
  const dispatchRecipients = useDispatchRecipients();

  const selectRecipientHandler = (recipient: IRecipient) => {
    // console.log('SELECT RECIPIENT', { ...recipient });

    try {
      if (recipient) {
        dispatchRecipients({
          type: 'SELECT_RECIPIENT',
          payload: recipient,
        });
      } else {
        console.log('ERROR');
        setErrorMessage('Something went wrong. No recipient found.');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className={styles.cartHolder}>
      {!isSelected ? (
        <button
          className={styles.cart}
          onClick={() => selectRecipientHandler(recipient)}
        >
          Select Recipient
        </button>
      ) : (
        <button disabled className={styles.cartAdded}>
          Selected
        </button>
      )}
    </div>
  );
}

export default RecipientButtons;

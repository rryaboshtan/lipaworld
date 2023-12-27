import React, { Dispatch, useEffect, useState } from 'react';
import Link from 'next/link';
import { Select, MenuItem, FormControl } from '@mui/material';
import { useRecipients, useDispatchRecipients } from '@/context';

import styles from './RecipientSelect.module.scss';
import { IRecipient } from '@/types';
import { useUser } from '@/context';

interface Props {
  setProductRecipient: Dispatch<IRecipient>;
  productRecipient: IRecipient | null;
}

const RecipientSelect: React.FC<Props> = ({
  setProductRecipient,
  productRecipient,
}) => {
  const user = useUser();
  const recipients = useRecipients();
  const dispatchRecipients = useDispatchRecipients();

  const [returnUrl, setReturnUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReturnUrl(window.location.pathname + window.location.search);
    }
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
          if (isMounted && res.recipients) {
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
            setIsLoading(false);
          }
        });
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [user?.id, recipients.length]);

  return (
    <div className={styles.container}>
      {user && recipients.length > 0 ? (
        <div className={` ${styles.wrapper}`}>
          <div className={styles.recipient}>
            <FormControl>
              <label className={styles.selectLabel}>
                {productRecipient ? 'Recipient' : 'Select recipient'}
              </label>
              <Select
                size='small'
                labelId='recipient'
                value={
                  productRecipient
                    ? `${productRecipient.name} ${productRecipient.surname}`
                    : ''
                }
                onChange={(e) => {
                  const selectedRecipient = recipients.find(
                    (recipient) =>
                      `${recipient.name} ${recipient.surname}` ===
                      e.target.value
                  );
                  if (selectedRecipient) {
                    setProductRecipient(selectedRecipient);
                  }
                }}
              >
                {recipients.map((recipient) => (
                  <MenuItem
                    key={recipient.id}
                    value={`${recipient.name} ${recipient.surname}`}
                  >
                    {`${recipient.name} ${recipient.surname}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div style={{ marginTop: '8px' }}>
            {productRecipient?.mobileNumber && (
              <div>
                {productRecipient.name}&apos;s mobile number:{' '}
                {productRecipient.mobileNumber}
              </div>
            )}
          </div>
        </div>
      ) : !user ? (
        <div className={` ${styles.wrapper}`}>
          <Link
            href={`/register/?return_url=${returnUrl}`}
            className={styles.actionLink}
          >
            Join now
          </Link>{' '}
          to create a recipient.
        </div>
      ) : recipients.length === 0 ? (
        <div className={` ${styles.wrapper}`}>
          <Link
            href={`/create-recipient/?return_url=${returnUrl}`}
            className={styles.actionLink}
          >
            Create a recipient
          </Link>{' '}
          to proceed.
        </div>
      ) : (
        <div className={` ${styles.wrapper}`}>
          <Link
            href={`/login/?return_url=${returnUrl}`}
            className={styles.actionLink}
          >
            Sign in
          </Link>{' '}
          to select a recipient.
        </div>
      )}
    </div>
  );
};

export default RecipientSelect;

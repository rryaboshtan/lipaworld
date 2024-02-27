import React, { MouseEventHandler, useState } from 'react';
// import RecipientButtons from '../recipientButtons/RecipientButtons';
import styles from './ListCard.module.scss';
import { IList } from '@/types/IList';
import { IRecipient } from '@/types';
import { useRouter } from 'next/router';
import deleteIcon from '../../../public/img/delete.svg';
import Image from 'next/image';
import { useDispatchLists } from '@/context';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

interface Props {
  list: IList;
  recipient: IRecipient;
}

const ListCard: React.FC<Props> = ({ list, recipient }) => {
  const dispatchLists = useDispatchLists();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsLoading(true);
    // setMessage(null)

    dispatchLists({
      type: 'DELETE_LIST',
      payload: list.listName,
    });

    toast.success(`List ${list.listName} deleted.`, {
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

    //       toast.success('List created.', {
    //         position: toast.POSITION.BOTTOM_LEFT,
    //       })

    //       router.push('/select-deal?recipientCountryCode=ZA&category=Shopping')
    //     }
    //   })
    //   .catch((error: unknown) => {
    //     setMessage('Something went wrong. Please try again later.')
    //   })
    setIsLoading(false);
  };

  return (
    <div
      className={styles.container}
      onClick={() => router.push(`/my-lists/${list.listName}`)}
    >
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.listName}>{list.listName}</div>
          <div
            className={styles.settings}
            onClick={(e) => {
              e.stopPropagation();
              router.push(
                `/create-list?id=${list.id}&listName=${
                  list.listName
                }&listType=${list.listType}&accessParameter=${
                  list.accessParameter
                }&keepPurchased=${list.keepPurchased ? '1' : '0'}&recipientId=${
                  list.recipientId
                }`
              );
            }}
          >
            List settings
          </div>
        </div>
        {/* <div>Mobile Number: {recipient?.surname}</div> */}
        <div className={styles.content}>
          <div className={styles.mainInfo}>
            <div>
              <div>
                <span className={styles.field}> Recipient:</span>{' '}
                <span className={styles.name}>
                  {recipient?.name} {recipient?.surname}
                </span>
              </div>
              {/* {recipient?.email && <div>Email: {recipient?.email}</div>} */}
              {recipient?.email && (
                <div className={styles.field}>
                  Recipient&apos;s Email: {recipient?.email}
                </div>
              )}
              {recipient?.mobileNumber && (
                <div className={styles.field}>
                  Mobile Number: {recipient?.mobileNumber}
                </div>
              )}
            </div>
            <div>
              {list.listType && (
                <div className={styles.field}>Type: {list.listType}</div>
              )}
              {recipient?.electricityMeterNumber && (
                <div className={styles.field}>
                  Electricity meter number: {recipient?.electricityMeterNumber}
                </div>
              )}
              {/* {list.description && <div className={styles.field}>Description: {list.description}</div>} */}
            </div>
          </div>

          <div className={styles.deleteIcon} onClick={onDelete}>
            <Image src={deleteIcon} alt="delete icon" />
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.access}>{list.accessParameter}</div>
          <button
            className={styles.shareList}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Share list
          </button>
        </div>

        {/* <div style={{ marginTop: '8px' }}> */}
        {/* <Img
            height={10}
            width={20}
            alt={list.countryCode}
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${list.countryCode}.svg`}
          /> */}
        {/* </div> */}
        {/* <div>
          <RecipientButtons  />
        </div> */}
        {message && <p className={styles.errorMessage}>{message}</p>}
        {isLoading && <CircularProgress size={24} color="success" />}
      </div>
    </div>
  );
};

export default ListCard;

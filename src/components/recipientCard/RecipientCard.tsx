import React from 'react';
import Img from 'next/image';
// import RecipientButtons from '../recipientButtons/RecipientButtons';
import styles from './RecipientCard.module.scss';
import { IRecipient } from '@/types';

interface Props {
  recipient: IRecipient;
}

const RecipientCard: React.FC<Props> = ({ recipient }) => {
  return (
    <div className={styles.container}>
      <div className={` ${styles.wrapper}`} style={{ margin: '12px' }}>
        <div className={styles.name}>
          {recipient.name} {recipient.surname}
        </div>
        <div>Mobile Number: {recipient.mobileNumber}</div>
        {recipient.email && <div>Email: {recipient.email}</div>}
        {recipient.electricityMeterNumber && (
          <div>Meter Number: {recipient.electricityMeterNumber}</div>
        )}
        <div style={{ marginTop: '8px' }}>
          <Img
            height={10}
            width={20}
            alt={`${recipient.countryCode}`}
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${recipient.countryCode}.svg`}
          />
        </div>
        {/* <div>
          <RecipientButtons  />
        </div> */}
      </div>
    </div>
  );
};

export default RecipientCard;

import React from 'react';
import styles from "./RecipientCard.module.scss";
import Img from "next/image";
import {IRecipient} from "@/types";

interface Props {
  recipient: IRecipient
}

const RecipientCard: React.FC<Props> = ({recipient}) => {
  return (
    <div className={styles.container}>
      <div
        className={` ${styles.wrapper}`}
        style={{marginLeft: '12px', marginRight: '12px'}}
      >
        <div className={styles.name}>
          {recipient.name} {recipient.surname}
        </div>
        <div>
          Mobile Number: {recipient.mobileNumber}
        </div>
        <div style={{marginTop: '8px'}}>
          <Img
            height={10}
            width={20}
            alt={`${recipient.countryCode}`}
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${recipient.countryCode}.svg`}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipientCard;
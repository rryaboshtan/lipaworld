import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './VoucherCard.module.scss';
import { IRecipient, IVoucher } from '@/types';
import RecipientSelect from '@components/recipientSelect/RecipientSelect';
import RedemptionInput from '@components/redemptionInput/RedemptionInput';
import CartButtons from '@components/cartButtons/CartButtons';

interface Props {
  voucher: IVoucher;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
  currencyRate: number;
  voucherQuantity: number;
  isHistory?: boolean;
}

const VoucherCard: React.FC<Props> = ({
  voucher,
  isHistory,
  setErrorMessage,
  voucherQuantity = 1,
  currencyRate,
}) => {
  const [quantity, setQuantity] = useState(voucherQuantity);
  const [redemptionInputValue, setRedemptionInputValue] = useState('');
  const [productRecipient, setProductRecipient] = useState<IRecipient | null>(
    null
  );

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url("${voucher.voucherImageUrl}")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className={` ${styles.amounts}`}
        style={{
          marginTop: '170px',
        }}
      >
        <div className={styles.dealVoucherName}>{voucher.voucherName}</div>
        <div className={styles.amountRedemption}>
          <strong>
            {voucher.redemptionCurrency}
            {(voucher.redemptionValues[0] / 100).toFixed(2)}
            {'   '}
          </strong>
          <span className={styles.amountPurchase}>
            (USD {(voucher.redemptionValues[0] / 100 / currencyRate).toFixed(2)}
            )
          </span>
        </div>
        <div className={styles.amountRedemptionj}>
          {voucher.voucherDescription}
        </div>
        {/* <div className={styles.dealMerchant}>
          Merchant: {voucher.merchantName}
        </div> */}
      </div>
      {isHistory ? (
        <>
          <div className={styles.dealMerchant}>Quantity: {voucherQuantity}</div>
          <CartButtons
            deal={voucher}
            setErrorMessage={setErrorMessage}
            quantity={quantity}
            isHistory={isHistory}
            setProductRecipient={setProductRecipient}
          />
        </>
      ) : (
        <>
          <RecipientSelect
            productRecipient={productRecipient}
            setProductRecipient={setProductRecipient}
          />
          <RedemptionInput
            voucher={voucher}
            quantity={quantity}
            setQuantity={setQuantity}
            redemptionInputValue={redemptionInputValue}
            setRedemptionInputValue={setRedemptionInputValue}
          />
          <CartButtons
            deal={voucher}
            setErrorMessage={setErrorMessage}
            quantity={quantity}
            productRecipient={productRecipient}
            setProductRecipient={setProductRecipient}
          />
        </>
      )}
    </div>
  );
};

export default VoucherCard;

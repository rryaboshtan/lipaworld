import React, { Dispatch, SetStateAction } from 'react';
import { TextField } from '@mui/material';
import { IVoucher } from '@/types';
import RedemptionQuantity from '@components/redemptionQuantity/RedemptionQuantity';
import { useUser } from '@/context';

interface IRedemptionInput {
  voucher: IVoucher;
  redemptionInputValue: string;
  setRedemptionInputValue: Dispatch<SetStateAction<string>>;
  setQuantity: Dispatch<SetStateAction<number>>;
  quantity: number;
}

const RedemptionInput = ({
  voucher,
  redemptionInputValue,
  setRedemptionInputValue,
  setQuantity,
  quantity,
}: IRedemptionInput) => {
  const user = useUser();

  return user ? (
    <div>
      {voucher.redemptionType === 'Top-up' &&
      (voucher.redemptionInput === 'Cell Number' ||
        voucher.redemptionInput === 'Meter Number' ||
        voucher.redemptionInput === 'EasyPay Number' ||
        voucher.redemptionInput === 'Multichoice Customer Number' ||
        voucher.redemptionInput === 'EasyPay Number' ||
        voucher.redemptionInput === 'Traffic Fine Number') ? (
        <TextField
          id='outlined-text'
          label={voucher.redemptionInput}
          type='text'
          size='small'
          value={redemptionInputValue}
          onChange={(e) => setRedemptionInputValue(e.target.value)}
          sx={{
            marginTop: '16px',
            display: 'none',
          }}
        />
      ) : (
        <RedemptionQuantity
          setQuantity={setQuantity}
          quantity={quantity}
          voucher={voucher}
        />
      )}
    </div>
  ) : (
    <></>
  );
};

export default RedemptionInput;

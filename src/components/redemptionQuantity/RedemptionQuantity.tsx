import React, { Dispatch, SetStateAction } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { IVoucher } from '@/types';
import styles from './RedemptionQuantity.module.scss';

interface IRedemptionQuantity {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  voucher: IVoucher;
}

const RedemptionQuantity = ({
  quantity,
  setQuantity,
  voucher,
}: IRedemptionQuantity) => {
  const maxQuantity = voucher.partnerName === 'DT One' ? 1 : 5;
  const quantities = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  return (
    <FormControl size='small' sx={{ marginTop: '16px', width: '100px' }}>
      <label className={styles.selectLabel}>Quantity:</label>
      <Select
        labelId='quantity-label'
        id='quantity'
        value={quantity}
        onChange={(e) => setQuantity(e.target.value as number)}
      >
        {quantities.map((q) => (
          <MenuItem key={q} value={q}>
            {q}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RedemptionQuantity;

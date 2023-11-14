import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ICart, ICartItem } from '@/types';
import styles from '@/styles/page.module.css';
import styles2 from './cartTable.module.scss';

interface ICartTableProps {
  cart: ICart | null;
  cartTotalAmount: string;
  removeFromCartHandler: (cartItemId: string) => void;
  currencyRate: number;
  cartTransactionFee: string;
  cartProcessingFee: string;
  cartTaxFee: string;
  isMobile: boolean | null;
}

function CartTable({
  cart,
  cartTotalAmount,
  removeFromCartHandler,
  currencyRate,
  cartTransactionFee,
  cartProcessingFee,
  cartTaxFee,
  isMobile,
}: ICartTableProps) {
  const renderMobileTable = () => {
    return (
      <table className={styles.checkoutTable}>
        <tbody>
          {cart &&
            cart.cartItems.map((item, index) => (
              <tr key={index} className={styles.cartItemRow}>
                <td
                  className={styles.cartItemQuantity}
                  style={{ width: '20px' }}
                >
                  <div>
                    <button
                      className={styles2.removeButton}
                      onClick={() => removeFromCartHandler(item.cartItemId)}
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        size='xs'
                        style={{ color: 'red' }}
                      />
                    </button>
                  </div>
                </td>
                <td className={styles.cartItemDescription}>
                  {renderMobileItemDescription(item)}
                </td>
                <td className={styles.cartItemAmount}>
                  {renderMobileItemAmount(item)}
                </td>
              </tr>
            ))}
          <tr className={styles.cartItemRow} style={{ fontSize: '0.8rem' }}>
            <td></td>
            <td className={styles.cartItemDescription}>Transaction fee</td>
            <td className={styles.cartItemAmount}>USD {cartTransactionFee}</td>
          </tr>
          <tr className={styles.cartItemRow} style={{ fontSize: '0.8rem' }}>
            <td></td>
            <td className={styles.cartItemDescription}>Processing fee</td>
            <td className={styles.cartItemAmount}>USD {cartProcessingFee}</td>
          </tr>
          <tr className={styles.cartItemRow} style={{ fontSize: '0.8rem' }}>
            <td></td>
            <td className={styles.cartItemDescription}>Tax (15%)</td>
            <td className={styles.cartItemAmount}>USD {cartTaxFee}</td>
          </tr>
          <tr className={styles.cartItemRow}>
            <td></td>
            <td
              className={`${styles.cartItemDescription} ${styles.dealMerchant}`}
            >
              Exchange Rate: <br />
              USD 1.00 = ZAR {currencyRate.toFixed(2)}
            </td>
            <td className={styles.totalAmount}>
              <strong>USD {cartTotalAmount}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const renderMobileItemDescription = (item: ICartItem) => {
    return (
      <>
        <div className={styles.dealVoucherName}>
          {item.quantity} x {item.deal.voucherName}
        </div>
        <div className={styles.redemptionText}>
          <strong>
            {item.deal.redemptionCurrency}{' '}
            {(item.deal.redemptionValues[0] / 100).toFixed(2)}
          </strong>
        </div>
        <div className={styles.redemptionText}>
          {item.deal.voucherDescription}
        </div>
        <div className={styles.dealMerchant}>
          Merchant: {item.deal.merchantName}
        </div>
        <br />
      </>
    );
  };

  const renderMobileItemAmount = (item: ICartItem) => {
    return (
      <>USD {(item.deal.redemptionValues[0] / 100 / currencyRate).toFixed(2)}</>
    );
  };

  const renderDesktopTable = () => {
    return (
      <table className={styles.checkoutTable}>
        <tbody>
          {cart &&
            cart.cartItems.map((item, index) => (
              <tr key={index} className={styles.cartItemRow}>
                <td className={styles.cartItemQuantity}>
                  <div className={styles.amountRedemption}>{item.quantity}</div>
                  <div className={styles.cartRemoveButton}>
                    <button
                      // className={styles.cart}
                      onClick={() => removeFromCartHandler(item.cartItemId)}
                      className={styles2.removeButton}
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        size='xs'
                        style={{ color: 'red' }}
                      />
                    </button>
                  </div>
                </td>
                <td className={styles.cartItemDescription}>
                  {item.deal.voucherName}
                </td>
                <td className={styles.cartItemAmount}>
                  {renderDesktopItemAmount(item)}
                </td>
              </tr>
            ))}
          <tr className={styles.cartItemRow} style={{ fontSize: '0.8rem' }}>
            <td></td>
            <td className={styles.cartItemDescription}>Transaction fee</td>
            <td className={styles.cartItemAmount}>USD {cartTransactionFee}</td>
          </tr>
          <tr className={styles.cartItemRow} style={{ fontSize: '0.8rem' }}>
            <td></td>
            <td className={styles.cartItemDescription}>Processing fee</td>
            <td className={styles.cartItemAmount}>USD {cartProcessingFee}</td>
          </tr>
          <tr className={styles.cartItemRow} style={{ fontSize: '0.8rem' }}>
            <td></td>
            <td className={styles.cartItemDescription}>Tax (15%)</td>
            <td className={styles.cartItemAmount}>USD {cartTaxFee}</td>
          </tr>
          <tr className={styles.cartItemRow}>
            <td></td>
            <td
              className={`${styles.cartItemDescription} ${styles.dealMerchant}`}
            >
              Exchange Rate: USD 1.00 = ZAR {currencyRate.toFixed(2)}
            </td>
            <td className={styles.totalAmount}>
              <strong>USD {cartTotalAmount}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const renderDesktopItemAmount = (item: ICartItem) => {
    return (
      <>USD {(item.deal.redemptionValues[0] / 100 / currencyRate).toFixed(2)}</>
    );
  };

  return isMobile ? renderMobileTable() : renderDesktopTable();
}

export default React.memo(CartTable);

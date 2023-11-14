import React, { useEffect, useState } from 'react';
import Cart from '../cart/Cart';

import styles from '../styles/page.module.css';

function AppHeader({
  screenTitle,
  isShopping,
}: {
  screenTitle: string;
  isShopping: boolean;
}) {
  return (
    <div className={styles.description}>
      <p>{screenTitle}</p>
      <div>{isShopping ? <Cart /> : null}</div>
    </div>
  );
}

export default AppHeader;

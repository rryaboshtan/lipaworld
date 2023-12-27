import React from 'react';
import SideNavUser from './SideNavUser';
import SideNavCategories from './SideNavCategories';
import SideNavMerchants from './SideNavMerchants';
import styles from './SideNav.module.scss';

function SideNav() {
  // const [returnUrl, setReturnUrl] = useState('');

  // useEffect(() => {
  //   setReturnUrl(window.location.pathname + window.location.search);
  // }, []);

  return (
    <>
      <div className={styles.navHolder}>
        <SideNavUser />
        <SideNavCategories />
        <SideNavMerchants />
      </div>
    </>
  );
}

export default SideNav;

import React from 'react';
import mixpanel from "mixpanel-browser";
import Link from "next/link";
import styles from "@styles/page.module.css";
import {Montserrat} from "next/font/google";

const montserrat = Montserrat({ subsets: ['latin'] });

const Custom404 = () => {
  mixpanel.track(`404 - Page Not Found`);

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <div className={styles.contentBody}>
        Oops! Page not found
        <br />

        <Link href="/" legacyBehavior>
          <span className={styles.actionButton}>Back to homepage</span>
        </Link>
      </div>

    </main>
  );
};

export default Custom404;
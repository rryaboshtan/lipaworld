import React from 'react';
import mixpanel from "mixpanel-browser";
import Link from "next/link";
import styles from "@styles/page.module.css";
import {Montserrat} from "next/font/google";

const montserrat = Montserrat({ subsets: ['latin'] });

const Custom500 = () => {

  mixpanel.track(`Handle server-side error that occur in application`);

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <div className={styles.contentBody}>
        Oops! Something went wrong...
        <br />

        <Link href="/" legacyBehavior>
          <span className={styles.actionButton}>Back to homepage</span>
        </Link>
      </div>

    </main>
  );
};

export default Custom500;
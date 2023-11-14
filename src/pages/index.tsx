import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Img from 'next/image';
import { useMerchants } from '@/context';
import styles from '../styles/page.module.css';
import Nav from '../components/nav/Nav';
import NavMobile from '../components/navMobile/NavMobile';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Home() {
  const merchants = useMerchants();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCategories = new Set<string>();
    // fetch a list of unique categories from the merchants
    if (merchants.length > 0) {
      const categories = merchants.flatMap((merchant) => merchant.categories);
      categories.forEach((category) => uniqueCategories.add(category));
      setCategories(Array.from(uniqueCategories));
    }
  }, [merchants]);

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile withCart={true} />

      <div className={styles.contentBody}>
        <div className={styles.getStarted}>
          <div className={styles.homeBanner}>
            <Img
              src='/img/woman-groceries-square.jpeg'
              alt='woman with groceries'
              height={414}
              width={414}
            />
          </div>

          <div className={styles.categoriesListHolder}>
            <div>Select a category to get started</div>
            <div className={styles.categoriesList}>
              {categories &&
                categories.map((category) => (
                  <Link
                    href={`/create-recipient/?category=${encodeURIComponent(
                      category
                    )}`}
                    key={category}
                    className={styles.voucherButton}
                  >
                    {category}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Nav />
    </main>
  );
}

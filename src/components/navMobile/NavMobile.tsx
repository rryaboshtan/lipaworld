import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Img from 'next/image';
import { useMerchants } from '@/context';
import Cart from '@/components/cart/Cart';
import styles from './NavMobile.module.scss';
import { getUser } from '@/services/AuthService';

interface NavProps {
  //   categories: string[];
  withCart?: boolean;
}

const Nav: React.FC<NavProps> = ({ withCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const merchants = useMerchants();
  const [categories, setCategories] = useState<string[]>([]);
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  const user = getUser();

  useEffect(() => {
    const uniqueCategories = new Set<string>();
    // fetch a list of unique categories from the merchants
    if (merchants.length > 0) {
      const categories = merchants.flatMap((merchant) => merchant.categories);
      categories.forEach((category) => uniqueCategories.add(category));
      setCategories(Array.from(uniqueCategories));
    }
  }, [merchants]);

  useEffect(() => {
    if (isAuthed === null) {
      user !== 'undefined' && user ? setIsAuthed(true) : setIsAuthed(false);
    }
  }, [isAuthed, user]);

  const toggleMenu = () => {
    console.log('toggleMenu');
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
      return;
    }

    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className={styles.nav}>
        <Link href={`/?recipientCountryCode=ZA`}>
          <Img src='/logo.png' alt='logo' height={34} width={162} />
        </Link>
        <>
          {withCart && (
            <div>
              <Cart />
            </div>
          )}
          <button
            ref={buttonRef}
            className={styles.hamburger}
            onClick={toggleMenu}
          >
            <span className={isOpen ? styles.barActive : styles.bar}></span>
            <span className={isOpen ? styles.barActive : styles.bar}></span>
            <span className={isOpen ? styles.barActive : styles.bar}></span>
          </button>
        </>
      </nav>

      <div ref={menuRef} className={isOpen ? styles.menuActive : styles.menu}>
        {categories &&
          categories.slice(0, 5).map((category) => (
            <Link
              href={`/select-deal?recipientCountryCode=ZA&category=${category}`}
              key={category}
              className={styles.voucherButton}
              onClick={() => setIsOpen(false)}
            >
              {category}
            </Link>
          ))}
        <Link
          href={`/?recipientCountryCode=ZA`}
          className={styles.voucherButton}
          onClick={() => setIsOpen(false)}
        >
          All categories
        </Link>
        <br />

        <br />
        <br />
        {!isAuthed && (
          <>
            <Link href='/register' onClick={() => setIsOpen(false)}>
              &gt; Register
            </Link>
            <Link href='/login' onClick={() => setIsOpen(false)}>
              &gt; Login
            </Link>
          </>
        )}
        {isAuthed && (
          <>
            <Link href='/user-settings' onClick={() => setIsOpen(false)}>
              &gt; My Account
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Nav;

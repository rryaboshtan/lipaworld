import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { TextField } from '@mui/material';
import mixpanel from 'mixpanel-browser';
import styles from '../styles/page.module.css';

import { setUserSession } from '../services/AuthService';
import SideNav from '../components/sideNav/SideNav';
import NavMobile from '../components/navMobile/NavMobile';
import Nav from '../components/nav/Nav';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Signin(): JSX.Element {
  const router = useRouter();
  const { query } = router;
  const { useremail } = query;

  const [message, setMessage] = useState<null | string>(null); // TODO: Add message validation
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );

  const hackyRegex =
    /<script|<\/script>|javascript:|<|>|onload=|onerror=|onmouseover=|onmouseout=|onfocus=|onblur=|onclick=|ondblclick=|onkeydown=|onkeypress=|onkeyup=|onsubmit=|onreset=|onselect=|onchange=|onloadstart=|onprogress=|onabort=|onloadend=|oncanplay=|oncanplaythrough=|ondurationchange=|onemptied=|onended=|onerror=|oninput=|oninvalid=|onpause=|onplay=|onplaying=|onprogress=|onratechange=|onreadystatechange=|onseeked=|onseeking=|onstalled=|onsuspend=|ontimeupdate=|onvolumechange=|onwaiting=/i;

  // 'Please enter a valid email address.'
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    const email = event.currentTarget.email.value.trim();
    const password = event.currentTarget.password.value.trim();

    mixpanel.track('Login');

    if (email === '' || password === '') {
      setMessage('Email and password are required');
      return;
    }

    if (hackyRegex.test(email) || hackyRegex.test(password)) {
      setMessage('Invalid text. Please try again.');
      return;
    }

    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
      },
    };

    const requestBody = {
      email,
      password,
    };

    try {
      const loginUrl = `${process.env.NEXT_PUBLIC_API_USERS_URL}/login`;
      const response = await axios.post(loginUrl, requestBody, requestConfig);
      setUserSession(response.data.token, response.data.user);
      mixpanel.identify(response.data.user.email);

      if (searchParams?.has('return_url')) {
        router.push(searchParams.get('return_url') ?? '/cart');
      } else {
        router.push('/cart');
      }
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setMessage('Invalid credentials');
      } else {
        setMessage('Something went wrong. Please try again later.');
      }
      console.log('catch', error);
    }
  };

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile />

      <div className={styles.contentBody}>
        <div className={styles.navSidedBody}>
          <SideNav />
          <div>
            <div className={styles.pageHeading}>Welcome back</div>
            <br />
            <br />
            <form onSubmit={submitHandler}>
              <div className={styles.formElement}>
                <label htmlFor='email'>Email address:</label>
                <TextField
                  autoComplete='off'
                  hiddenLabel
                  type='email'
                  id='email'
                  defaultValue={useremail as string}
                  variant='outlined'
                  name='email'
                  required
                  style={{ width: '250px' }}
                />
              </div>
              <div className={styles.formElement}>
                <label htmlFor='password'>Password:</label>
                <TextField
                  autoComplete='off'
                  hiddenLabel
                  type='password'
                  id='password'
                  defaultValue=''
                  variant='outlined'
                  name='password'
                  required
                  style={{ width: '250px' }}
                />
              </div>

              {message && <p className={styles.errorMessage}>{message}</p>}

              <div className={styles.contentFooter}>
                <input
                  type='submit'
                  className={styles.actionButton}
                  value='Sign In'
                />
                <div>
                  <p>
                    Need an account? <Link href='/register'>Join Now</Link>{' '}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Nav />
    </main>
  );
}

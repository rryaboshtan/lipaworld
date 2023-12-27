import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { IRecipient } from '@/types';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import mixpanel from 'mixpanel-browser';
import styles from '../styles/page.module.css';
import {
  useDispatchRecipients,
  useRecipients,
  useDispatchUser,
} from '@/context';

import { setUserSession } from '../services/AuthService';
import SideNav from '../components/sideNav/SideNav';
import NavMobile from '../components/navMobile/NavMobile';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Signin(): JSX.Element {
  const dispatchRecipients = useDispatchRecipients();
  const dispatchUser = useDispatchUser();
  const recipients = useRecipients();
  const router = useRouter();
  const { query } = router;
  const { useremail } = query;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [message, setMessage] = useState<null | string>(null); // TODO: Add message validation
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );

  useEffect(() => {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    setSearchParams(params);
  }, []);

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

      if (response.data.user) {
        dispatchUser({
          type: 'SET_USER',
          payload: response.data.user,
        });

        if (recipients.length > 0) {
          const payload: IRecipient = {
            name: recipients[0].name,
            surname: recipients[0].surname,
            country: recipients[0].country,
            countryCode: recipients[0].countryCode,
            mobileNumber: recipients[0].mobileNumber,
            email: recipients[0].email ?? '',
            electricityMeterNumber: recipients[0].electricityMeterNumber ?? '',
            senderId: response.data.user.id,
            active: recipients[0].active,
            id: recipients[0].id,
          };

          mixpanel.track('Create Recipient from pre-login');

          await fetch(
            `${process.env.NEXT_PUBLIC_API_RECIPIENTS_URL}/register`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            }
          ).catch((error) => {
            console.log('error', error);
          });
        }

        const url = `${process.env.NEXT_PUBLIC_API_RECIPIENTS_URL}/recipients?userId=${response.data.user.id}`;
        try {
          const response2 = await axios.get(url);
          // console.log('start adding recipients');
          dispatchRecipients({
            type: 'ADD_RECIPIENTS',
            payload: response2.data['recipients'],
          });
        } catch (error) {
          console.log('error', error);
        }
      }

      mixpanel.identify(response.data.user.email);

      // if (searchParams?.has('return_url')) {
      //   router.push(searchParams.get('return_url') ?? '/cart');
      // } else {
      router.push('/?recipientCountryCode=ZA');
      // }
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
                  style={{ width: '250px', backgroundColor: '#ffffff' }}
                />
              </div>

              <div className={styles.formElement}>
                <label htmlFor='password'>Password</label>
                <TextField
                  autoComplete='off'
                  hiddenLabel
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  defaultValue=''
                  variant='outlined'
                  name='password'
                  required
                  style={{ width: '250px', backgroundColor: '#ffffff' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
                    New on Lipaworld? <Link href='/register'>Join Now</Link>.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
